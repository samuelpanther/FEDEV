import React from "react";
import StudentList from "./components/StudentList";
export interface Student {
id: number;
name: string;
grade: number;
isActive: boolean;
studentClass: string;
}
const studentsData: Student[] = [
{ id: 1, name: "Anna Bergren", grade: 90, isActive: true, studentClass: "Junior" },
{ id: 2, name: "John Lanshami", grade: 70, isActive: false, studentClass: "Sophomore" },
{ id: 3, name: "Maria Gonzales", grade: 85, isActive: true, studentClass: "Freshman" },
{ id: 4, name: "Sam Delaney", grade: 60, isActive: true, studentClass: "Junior" }, 
{ id: 5, name: "Carol Benson", grade: 95, isActive: true, studentClass: "Senior"},
{ id: 6, name: "José Sanders", grade: 84, isActive: false, studentClass: "Junior"},
{ id: 7, name: "Piotr Lewandowsky", grade: 72, isActive: true, studentClass: "Sophomore"},
{ id: 8, name: "Pritha Holden", grade: 90, isActive: true, studentClass: "Junior"},
{ id: 9, name: "DeShawn Elliott", grade: 98, isActive: true, studentClass: "Junior"}, 
{ id: 10, name: "Alysia Liu", grade: 78, isActive: true, studentClass: "Junior"}
];

function App() {
return (
<div style={{
  backgroundColor: "#ecedfd", 
  color: "#080a5e",
  minHeight: "100vh", 
  padding: "20px",
  fontFamily: "Helvetica, sans-serif"
}}>


<h1 style={{ marginBottom: "20px"}}>
    Welton Academy Student Dashboard
</h1>

<StudentList students={studentsData} />
</div>
);
}
export default App;   