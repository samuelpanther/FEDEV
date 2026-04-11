import React, { useState } from "react";
import type { Student } from "../App";
import StudentCard from "./StudentCard";
import Header from "./Header";
import FilterPanel from "./FilterPanel";

interface Props {
students: Student[];
}
   //Component
const StudentList: React.FC<Props> = ({ students }) => {

    // STATES i.e. HOOKS that go within component at top
const [filter, setFilter] = useState("all");
const [search, setSearch] = useState("");
    
    //Filter 

const filteredStudents = students.filter((student) => {
      
    const matchesFilter =
        filter === "active"
        ? student.isActive
        : filter === "inactive"
        ? !student.isActive
        : filter === "passed"
        ? student.grade >= 75
        : filter === "failed"
        ? student.grade < 75
        : true;

    const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
}); 

//counting

const totalCount = filteredStudents.length;

const activeCount = filteredStudents.filter(
    (student) => student.isActive
    ).length;

const inactiveCount = filteredStudents.filter(
    (student) => !student.isActive
    ).length;
        
//this is where teh UI stuff starts  

return (
       
<div>
<Header />

{/*okay this is where the counting is*/}

    <div style={{ marginBottom: "10px" }}>
        <p>Total Students: {totalCount}</p>
        <p>Active: {activeCount}</p>
        <p>Inactive: {inactiveCount}</p>
    </div>



<FilterPanel
 setFilter={setFilter}
 search={search}
 setSearch={setSearch}
 />



{/*this is the whole list*/}

{filteredStudents.map((student) => (
<StudentCard 
    key={student.id} 
    name={student.name}
    grade={student.grade}
    isActive={student.isActive}
    studentClass={student.studentClass}
 />
))}
</div>
);
};
export default StudentList;
