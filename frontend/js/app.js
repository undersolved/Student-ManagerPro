let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
	const phoneInput = document.getElementById("phone");

	if (phoneInput) {
		phoneInput.addEventListener("input", () => {
			phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
		});
	}

	const studentForm = document.getElementById("studentForm");

	if (studentForm) {
		studentForm.addEventListener("submit", saveStudent);

		document
			.getElementById("searchInput")
			.addEventListener("input", searchStudents);

		document.getElementById("cancelEdit").addEventListener("click", resetForm);

		document.getElementById("cancelEdit").style.display = "none";

		loadStudents();
	}

	if (document.getElementById("totalStudents")) {
		loadDashboardStats();
	}
});

function showToast(message, type = "success") {
	const toast = document.getElementById("toast");

	if (!toast) return;

	toast.textContent = message;
	toast.className = `toast ${type} show`;

	setTimeout(() => {
		toast.className = "toast";
	}, 2500);
}

function resetForm() {
	editingId = null;

	document.getElementById("studentForm").reset();

	document.getElementById("formTitle").textContent = "Student Details";

	document.getElementById("cancelEdit").style.display = "none";

	document.getElementById("saveButton").textContent = "Save Student";
}

function validateForm(data) {
	data.phone = data.phone.replace(/\D/g, "");

	if (!/^\d{10}$/.test(data.phone)) {
		showToast("Phone number must contain exactly 10 digits", "error");
		return false;
	}

	if (data.attendance < 0 || data.attendance > 100) {
		showToast("Attendance must be between 0 and 100", "error");
		return false;
	}

	return true;
}

async function saveStudent(e) {
	e.preventDefault();

	const btn = document.getElementById("saveButton");

	btn.disabled = true;
	btn.textContent = editingId ? "Updating..." : "Saving...";

	const data = {
		name: document.getElementById("name").value.trim(),
		roll_number: Number(document.getElementById("roll_number").value),
		student_class: document.getElementById("student_class").value.trim(),
		section: document.getElementById("section").value.trim(),
		age: Number(document.getElementById("age").value),
		email: document.getElementById("email").value.trim(),
		phone: document.getElementById("phone").value.trim(),
		attendance: Number(document.getElementById("attendance").value || 0),
		fee_status: document.getElementById("fee_status").value,
	};

	if (!validateForm(data)) {
		btn.disabled = false;
		btn.textContent = "Save Student";
		return;
	}

	try {
		if (editingId) {
			await apiRequest(`/students/${editingId}`, {
				method: "PUT",
				body: JSON.stringify(data),
			});

			showToast("Student updated");
		} else {
			await apiRequest("/students/", {
				method: "POST",
				body: JSON.stringify(data),
			});

			showToast("Student added");
		}

		resetForm();

		await loadStudents();

		// Safe: only updates dashboard if those elements exist
		await loadDashboardStats();
	} catch (err) {
		showToast(err.message, "error");
	} finally {
		btn.disabled = false;
		btn.textContent = "Save Student";
	}
}

async function loadStudents() {
	const students = await apiRequest("/students/");

	renderStudents(students);
}

function renderStudents(students) {
	const table = document.getElementById("studentTable");

	if (!table) return;

	if (students.length === 0) {
		table.innerHTML = `
<tr>
<td colspan="11" class="empty">No students found.</td>
</tr>`;

		return;
	}

	table.innerHTML = students
		.map(
			(student) => `

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.roll_number}</td>

<td>${student.student_class}</td>

<td>${student.section}</td>

<td>${student.age}</td>

<td>${student.email}</td>

<td>${student.phone}</td>

<td>${student.attendance}%</td>

<td>
<span class="${student.fee_status === "Paid" ? "badge-paid" : "badge-pending"}">
${student.fee_status}
</span>
</td>

<td>

<button class="action-btn edit"
onclick="editStudent(${student.id})">
Edit
</button>

<button class="action-btn delete"
onclick="deleteStudent(${student.id})">
Delete
</button>

</td>

</tr>

`,
		)
		.join("");
}

async function editStudent(id) {
	const student = await apiRequest(`/students/${id}`);

	editingId = id;

	document.getElementById("cancelEdit").style.display = "block";

	document.getElementById("formTitle").textContent = "Edit Student";

	document.getElementById("saveButton").textContent = "Update Student";

	document.getElementById("name").value = student.name;
	document.getElementById("roll_number").value = student.roll_number;
	document.getElementById("student_class").value = student.student_class;
	document.getElementById("section").value = student.section;
	document.getElementById("age").value = student.age;
	document.getElementById("email").value = student.email;
	document.getElementById("phone").value = student.phone;
	document.getElementById("attendance").value = student.attendance;
	document.getElementById("fee_status").value = student.fee_status;

	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

async function deleteStudent(id) {
	if (!confirm("Delete this student?")) return;

	await apiRequest(`/students/${id}`, {
		method: "DELETE",
	});

	showToast("Student deleted");

	await loadStudents();

	await loadDashboardStats();
}

async function searchStudents() {
	const query = document.getElementById("searchInput").value.toLowerCase();

	const students = await apiRequest("/students/");

	const filtered = students.filter(
		(student) =>
			student.name.toLowerCase().includes(query) ||
			student.roll_number.toString().includes(query),
	);

	renderStudents(filtered);
}

async function loadDashboardStats() {
	// Prevent errors on pages that don't have dashboard cards
	const totalStudents = document.getElementById("totalStudents");

	if (!totalStudents) return;

	const avgAttendance = document.getElementById("avgAttendance");
	const paidStudents = document.getElementById("paidStudents");
	const pendingStudents = document.getElementById("pendingStudents");
	const message = document.getElementById("dashboardMessage");

	const students = await apiRequest("/students/");

	totalStudents.textContent = students.length;

	if (students.length === 0) {
		avgAttendance.textContent = "0%";
		paidStudents.textContent = "0";
		pendingStudents.textContent = "0";

		if (message) {
			message.textContent = "Add your first student to start managing records.";
		}

		return;
	}

	const avg = students.reduce((a, b) => a + b.attendance, 0) / students.length;

	avgAttendance.textContent = `${avg.toFixed(1)}%`;

	paidStudents.textContent = students.filter(
		(s) => s.fee_status === "Paid",
	).length;

	pendingStudents.textContent = students.filter(
		(s) => s.fee_status === "Pending",
	).length;

	if (message) {
		message.textContent = "Your student records are up to date.";
	}
}
