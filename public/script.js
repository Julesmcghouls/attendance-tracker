// Get references to the form and list elements from the DOM
const studentForm = document.getElementById('studentForm'); // Get the form element
const studentList = document.getElementById('studentList'); // Get the list element

// Wait for the DOM to finish loading before fetching students
document.addEventListener('DOMContentLoaded', fetchStudents); // Add an event listener to the DOMContentLoaded event

// Listen for form submission
studentForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the form inputs
    const studentName = document.getElementById('studentName').value; // Get the value of the studentName input
    const studentGrade = document.getElementById('studentGrade').value; // Get the value of the studentGrade input

    // Create a new student object with the input values
    const student = { name: studentName, grade: studentGrade };

    // Send a POST request to the /api/students endpoint with the student data
    const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });

    // Parse the response as JSON and add the new student to the list
    const newStudent = await response.json();
    addStudentToList(newStudent);

    // Reset the form inputs
    studentForm.reset();
});

// Fetch students from the server and add them to the list
async function fetchStudents() {
    // Send a GET request to the /api/students endpoint
    const response = await fetch('/api/students');

    // Parse the response as JSON and get the students
    const students = await response.json();

    // Add each student to the list
    students.forEach(addStudentToList);
}

// Add a student to the list element
function addStudentToList(student) {
    // Create a new div element for the student
    const studentElement = document.createElement('div');
    studentElement.className = 'student';

    // Set the innerHTML of the student element to display the student's name, grade, and absence count
    studentElement.innerHTML = `
        <span>${student.name}, Grade ${student.grade}: <span class="absence-count">${student.absences}</span> absences</span>
        <button class="btn btn-danger btn-sm ms-3">Record Absence</button>
    `;

    // Get a reference to the record absence button
    const recordAbsenceButton = studentElement.querySelector('button');

    // Listen for the record absence button click event
    recordAbsenceButton.addEventListener('click', async () => {
        // Send a PUT request to the /api/students/:id/absence endpoint
        const response = await fetch(`/api/students/${student.name}/absence`, {
            method: 'PUT',
        });

        // Parse the response as JSON and update the student element
        const updatedStudent = await response.json();
        updateStudentElement(studentElement, updatedStudent);
    });

    // Add the student element to the list
    studentList.appendChild(studentElement);
}

// Update the student element with the updated student data
function updateStudentElement(element, student) {
    // Get a reference to the absence count element
    const absenceCount = element.querySelector('.absence-count');

    // Update the text content of the absence count element with the updated absence count
    absenceCount.textContent = student.absences;

    // Add or remove CSS classes to indicate the student's absence status
    if (student.absences >= 5) {
        element.classList.add('absent-5');
        element.classList.remove('absent-3');
    } else if (student.absences >= 3) {
        element.classList.add('absent-3');
        element.classList.remove('absent-5');
    } else {
        element.classList.remove('absent-3', 'absent-5');
    }
}
