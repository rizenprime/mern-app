import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const API = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/students`;
function App() {
 const [students, setStudents] = useState([]);
 const [name, setName] = useState("");
 const [course, setCourse] = useState("");
 const [age, setAge] = useState("");
 const [editingId, setEditingId] = useState(null);
 const [error, setError] = useState("");
 const fetchStudents = async () => {
   try {
     const res = await axios.get(API);
     setStudents(res.data);
     setError("");
   } catch (err) {
     setError("Cannot reach the server. Is node server.js running?");
   }
 };
 useEffect(() => {
   fetchStudents();
 }, []);
 const resetForm = () => {
   setName("");
   setCourse("");
   setAge("");
   setEditingId(null);
 };
 const handleSubmit = async () => {
   if (!name || !course || !age) {
     setError("Please fill in Name, Course, and Age.");
     return;
   }
   const data = { name, course, age: Number(age) };
   try {
     if (editingId) {
       await axios.put(`${API}/${editingId}`, data);
     } else {
       await axios.post(API, data);
     }
     resetForm();
     fetchStudents();
   } catch (err) {
     setError("Save failed. Check the server terminal for the error.");
   }
 };
 const handleEdit = (student) => {
   setEditingId(student._id);
   setName(student.name);
   setCourse(student.course);
   setAge(student.age);
   window.scrollTo({ top: 0, behavior: "smooth" });
 };
 const handleDelete = async (id) => {
   try {
     await axios.delete(`${API}/${id}`);
     fetchStudents();
   } catch (err) {
     setError("Delete failed.");
   }
 };
 return (
<div className="container">
<h1>Student Management System</h1>
<div className="card form">
<h2>{editingId ? "Edit Student" : "Add Student"}</h2>
<input
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
<input
         placeholder="Course"
         value={course}
         onChange={(e) => setCourse(e.target.value)}
       />
<input
         placeholder="Age"
         type="number"
         value={age}
         onChange={(e) => setAge(e.target.value)}
       />
<div className="row">
<button className="btn primary" onClick={handleSubmit}>
           {editingId ? "Update Student" : "Add Student"}
</button>
         {editingId && (
<button className="btn gray" onClick={resetForm}>
             Cancel
</button>
         )}
</div>
       {error && <p className="error">{error}</p>}
</div>
<h2 className="list-title">Students ({students.length})</h2>
     {students.length === 0 && <p className="empty">No students yet.</p>}
     {students.map((student) => (
<div className="card student" key={student._id}>
<div className="info">
<div className="s-name">{student.name}</div>
<div className="s-course">{student.course}</div>
<div className="s-age">{student.age}</div>
</div>
<div className="row">
<button className="btn edit" onClick={() => handleEdit(student)}>
             Edit
</button>
<button
             className="btn delete"
             onClick={() => handleDelete(student._id)}
>
             Delete
</button>
</div>
</div>
     ))}
</div>
 );
}
export default App;