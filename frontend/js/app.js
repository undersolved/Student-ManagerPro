// Keep everything exactly the same except replace ONLY the renderStudents function below.

function renderStudents(students) {
	const table = document.getElementById("studentTable");

	if (students.length === 0) {
		table.innerHTML = `
<tr>
<td colspan="11" class="empty">
No students found.
</td>
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
