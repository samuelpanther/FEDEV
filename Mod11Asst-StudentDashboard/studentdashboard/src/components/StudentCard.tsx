import React from "react";

interface Props {
name: string;
grade: number;
isActive: boolean;
studentClass: string; 
}
// Pure Component
const StudentCard: React.FC<Props> = React.memo(
    ({ name, grade, isActive, studentClass }) => {

const getResult = (grade: number) => {
    return grade >= 75 ? "Passed" : "❌ Failed";
};

return (
<div style={{ 
    border: "1px solid #5559ff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
    margin: "10px", 
    padding: "10px", 
    borderRadius: "8px" }}>


  <h3>{name}</h3>
  <p>Grade: {grade}</p>
  <p>Course Status: {isActive ? "Active" : "Inactive" }</p>
  <p>Class: {studentClass}</p>  
  <p>{getResult(grade)}</p>
</div>

);
});

export default StudentCard;