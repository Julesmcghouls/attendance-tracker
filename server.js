// Import the express module and the path module
const express = require("express"); // Express is a web application framework for Node.js
const path = require("path"); // Path is a built-in Node.js module for working with file and directory paths

// Create an instance of the express application
const app = express(); // app is our Express application

// Set the port for our application. If an environment variable PORT is set, use that, otherwise use 3001
const PORT = process.env.PORT || 3001; // PORT is the port number on which our application will run

// Middleware function to serve static files from the public directory
app.use(express.static(path.join(__dirname, "public"))); // __dirname is a Node.js global variable that represents the directory name of the current module

// Middleware function to parse incoming JSON data
app.use(express.json()); // express.json() is a built-in middleware function in Express that parses incoming JSON data

// Array to store student data
let students = []; // students is an array to store student data

// Endpoint to get all students
app.get("/api/students", (req, res) => { // GET request to "/api/students" endpoint
    // Respond with the student data as JSON
    res.json(students); // Send the student data as JSON response
});

// Endpoint to add a new student
app.post("/api/students", (req, res) => { // POST request to "/api/students" endpoint
    // Create a new student object from the request body
    const newStudent = req.body; // req.body is a built-in Express object that contains parsed data from the request body
    // Add the new student to the students array
    students.push(newStudent); // Add the new student to the students array
    // Respond with the new student data as JSON
    res.json(newStudent); // Send the new student data as JSON response
});

// Endpoint to update absence for a student
app.put("/api/students/:id", (req, res) => { // PUT request to "/api/students/:id" endpoint
    // Get the name of the student from the request parameters
    const studentName = req.params.name; // req.params is a built-in Express object that contains parsed data from the request parameters
    // Find the student with the given name in the students array
    const student = students.find((student) => student.name === studentName); // students.find() is a built-in JavaScript Array method that finds the first element in the array that satisfies the provided testing function
    // If the student is found, increment the absence count and respond with the updated student data as JSON
    if (student) {
        student.absences++;
        res.json(student);
    } else { // If the student is not found, respond with a 404 status code and an error message
        res.status(404).send("Student not found");
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log a message to the console indicating that the server is running on the specified port
});
