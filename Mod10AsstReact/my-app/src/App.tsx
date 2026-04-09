import React from "react";


// Define Issue type

type Issue = {
id: number;
status: string;
owner: string;
created: Date;
effort: number;
completionDate?: Date;
title: string;
priority: string;
};



// IssueRow Props

type IssueRowProps = {
issue: Issue;
};


// IssueRow Component

class IssueRow extends React.Component<IssueRowProps> {
render() {
const { issue } = this.props;

const borderedStyle: React.CSSProperties = {
border: "1px solid silver",
padding: 6,
};

return (
  <tr>
    <td style={borderedStyle}>{issue.id}</td>

    <td style={borderedStyle}>{issue.status}</td>

    <td style={borderedStyle}>{issue.owner}</td>

    <td style={borderedStyle}>{issue.created.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}</td>

    <td style={borderedStyle}>{issue.effort}</td>

    <td style={borderedStyle}>{issue.completionDate? issue.completionDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }): ""}
    </td>

    <td style={borderedStyle}>{issue.title}</td>

    <td style={{...borderedStyle, color: issue.priority=== "High"
        ? "red" : undefined}}>{issue.priority}</td>
</tr>
    );
  }
}


// IssueTable Props


type IssueTableProps = {
issues: Issue[];
};


// IssueTable Component

class IssueTable extends React.Component<IssueTableProps> {
render() {
const issueRows = this.props.issues.map((issue) => (
<IssueRow key={issue.id} issue={issue} />
));


const borderedStyle: React.CSSProperties = {
border: "1px solid silver",
padding: 6,
};


return (
<table style={{ borderCollapse: "collapse", width: "100%" }}>
<thead>
  <tr>
    <th style={borderedStyle}>Id</th>
    <th style={borderedStyle}>Status</th>
    <th style={borderedStyle}>Owner</th>
    <th style={borderedStyle}>Created</th>
    <th style={borderedStyle}>Effort</th>
    <th style={borderedStyle}>Completion Date</th>
    <th style={borderedStyle}>Title</th>
    <th style={borderedStyle}>Priority</th>
  </tr>
</thead>
<tbody>{issueRows}</tbody>
</table>
);
 }
}


// IssueFilter Component (no props)

class IssueFilter extends React.Component {
render() {
return <div></div>;
}
}


// IssueAdd Component (no props)

class IssueAdd extends React.Component {
render() {
return <div>This is a placeholder for an Issue Add entry form.</div>;
}
}


// Sample Data

const issues: Issue[] = [
{
  id: 1,
  status: "Open",
  owner: "Ravan",
  created: new Date("2016-08-15"),
  effort: 5,
  completionDate: new Date("2016-08-31"),
  title: "Error in console when clicking Add",
  priority: "Medium",
},

{
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  created: new Date("2016-08-16"),
  effort: 14,
  completionDate: new Date("2016-08-30"),
  title: "Missing bottom border on panel",
  priority: "Low",
},

{
  id: 3, 
  status: "Unassigned",
  owner: "Sam",
  created: new Date("2016-08-16") ,
  effort: 1000, 
  completionDate: new Date("2016-08-17"),
  title: "Missing the ability to think",
  priority: "High",
},

{
  id: 4, 
  status: "Unassigned",
  owner: "Bogdan",
  created: new Date("2016-08-17"),
  effort: 13, 
  completionDate: new Date("2016-09-02"),
  title: "Need help in helping Sam's brain to stop glitching",
  priority: "High",
},

];


export default function App() {
  return (
    <div>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <p> Total Issues: {issues.length}</p>
      <h1>Issue List</h1>
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd />
    </div>
  );
}