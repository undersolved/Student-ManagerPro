let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
	const phoneInput = document.getElementById("phone");

	if (phoneInput) {
		phoneInput.addEventListener("input", () => {
			phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
		});
	}

	if (document.getElementById("studentForm")) {
		document
			.getElementById("studentForm")
			.addEventListener("submit", saveStudent);

		document
			.getElementById("searchInput")
			.addEventListener("input", searchStudents);

		document.getElementById("cancelEdit").addEventListener("click", resetForm);

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

	document.getElementById("formTitle").textContent = "Add Student";

	document.getElementById("cancelEdit").style.display = "none";

	document.getElementById("saveButton").textContent = "Save Student";
}

function validateForm(data) {
	// Keep only digits before validation
	data.phone = data.phone.replace(/\D/g, "");

	// Correct regex
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

	const saveButton = document.getElementById("saveButton");

	saveButton.disabled = true;
	saveButton.textContent = editingId ? "Updating..." : "Saving...";

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
		saveButton.disabled = false;
		saveButton.textContent = editingId ? "Update Student" : "Save Student";
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

		loadStudents();

		loadDashboardStats();
	} catch (err) {
		showToast(err.message, "error");
	}

	saveButton.disabled = false;

	saveButton.textContent = editingId ? "Update Student" : "Save Student";
}

async function loadStudents() {
	try {
		const students = await apiRequest("/students/");

		renderStudents(students);
	} catch (err) {
		showToast(err.message, "error");
	}
}

function renderStudents(students) {
	const table = document.getElementById("studentTable");

	if (students.length === 0) {
		table.innerHTML = `
<tr>
<td colspan="7" class="empty">No students found.</td>
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

<td>${student.student_class}-${student.section}</td>

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

	document.getElementById("formTitle").textContent = "Edit Student";

	document.getElementById("cancelEdit").style.display = "block";

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
	const confirmDelete = confirm(
		"Are you sure you want to delete this student?",
	);

	if (!confirmDelete) return;

	await apiRequest(`/students/${id}`, {
		method: "DELETE",
	});

	showToast("Student deleted");

	loadStudents();

	loadDashboardStats();
}

async function searchStudents() {
	const query = document.getElementById("searchInput").value.toLowerCase();

	const students = await apiRequest("/students/");

	const filtered = students.filter(
		(student) =>
			student.name.toLowerCase().includes(query) ||
			student.roll_number.toString().includes(query),
	);

	if (filtered.length === 0) {
		document.getElementById("studentTable").innerHTML =
			'<tr><td colspan="7" class="empty">No matching students.</td></tr>';

		return;
	}

	renderStudents(filtered);
}

async function loadDashboardStats() {
	try {
		const students = await apiRequest("/students/");

		document.getElementById("totalStudents").textContent = students.length;

		const message = document.getElementById("dashboardMessage");

		if (students.length === 0) {
			document.getElementById("avgAttendance").textContent = "0%";
			document.getElementById("paidStudents").textContent = "0";
			document.getElementById("pendingStudents").textContent = "0";

			if (message)
				message.textContent =
					"Add your first student to start managing records.";

			return;
		}

		const avg =
			students.reduce((a, b) => a + b.attendance, 0) / students.length;

		const paid = students.filter((s) => s.fee_status === "Paid").length;

		const pending = students.filter((s) => s.fee_status === "Pending").length;

		document.getElementById("avgAttendance").textContent = `${avg.toFixed(1)}%`;

		document.getElementById("paidStudents").textContent = paid;

		document.getElementById("pendingStudents").textContent = pending;

		if (message) message.textContent = "Your student records are up to date.";
	} catch (err) {
		console.error(err);
	}
}
