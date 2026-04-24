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


// --------------------
// Helper Function
// --------------------
function formatDate(date: Date): string {
 return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

//styling 

const containerStyle: React.CSSProperties = {
  padding: "16px",
  fontFamily: "Helvetica",
  color: "#e8e8e8",
  backgroundColor: "#1F1F30",
  minHeight: "100vh"
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "6px",
};

const formStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "12px",
  marginTop: "16px",
};

const inputStyle: React.CSSProperties = {
  marginBottom: "8px",
  padding: "6px",
  width: "200px",
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 10px",
};

// --------------------
// IssueRow
// --------------------

class IssueRow extends React.Component<{
 issue: Issue;
 deleteIssue: (id: number) => void;
}> {
 render() {
 const { issue } = this.props;

return (
  <tr>
    <td style={cellStyle}>{issue.id}</td>
      <td style={cellStyle}>{issue.status}</td>
      <td style={cellStyle}>{issue.owner}</td>
      <td style={cellStyle}>{formatDate(issue.created)}</td>
      <td style={cellStyle}>{issue.effort}</td>
      <td  style={cellStyle}>
      {issue.completionDate ? formatDate(issue.completionDate) : ""}
      </td>
      <td style={cellStyle}>{issue.title}</td>
      <td style={cellStyle}>{issue.priority}</td>

      {/* Actions Column */}
        <td style={cellStyle}>
          <button onClick={() => this.props.deleteIssue(issue.id)}>
          Delete
          </button>
        </td>
      </tr>
    );
  }
}

// --------------------
// IssueTable
// --------------------
class IssueTable extends React.Component<{
  issues: Issue[];
  deleteIssue: (id: number) => void;
}> {
  render() {
   const issueRows = this.props.issues.map((issue) => (
    <IssueRow
     key={issue.id}
     issue={issue}
     deleteIssue={this.props.deleteIssue}
    />
));

return (
  <table style={tableStyle}>
    <thead>
    <tr>
      <th style={cellStyle}>Id</th>
      <th style={cellStyle}>Status</th>
      <th style={cellStyle}>Owner</th>
      <th style={cellStyle}>Created</th>
      <th style={cellStyle}>Effort</th>
      <th style={cellStyle}>Completion Date</th>
      <th style={cellStyle}>Title</th>
      <th style={cellStyle}>Priority</th>
      <th style={cellStyle}>Actions</th>
    </tr>
    </thead>
    <tbody>{issueRows}</tbody>
  </table>
  );
 }
}

// --------------------
// IssueFilter
// --------------------
class IssueFilter extends React.Component {
 render() {
  return <div></div>;
 }
}

// --------------------
// IssueAdd
// -------------------- 
type IssueAddProps = {
  addIssue: (issue: Issue) => void;
};

type IssueAddState = {
  owner: string;
  title: string;
  effort: string;
  completionDate: string;
  priority: string;
};

class IssueAdd extends React.Component<IssueAddProps, IssueAddState> {
 constructor(props: IssueAddProps) 
 {
   super(props);
   this.state = {
   owner: "",
   title: "",
   effort: "",
   completionDate: "",
   priority: "Low",
   
 };
}

handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 const { name, value } = e.target;
 this.setState({ [name]: value } as Pick<
  IssueAddState,
  keyof IssueAddState
 >);
};

//task 6 doing the validate stuff let's hope
validate = (): boolean => {
  const { owner, title, effort } = this.state;

  if (!owner || owner.length < 3) {
    alert("Owner must be at least 3 characters long");
    return false;
  }

  if (!title || title.length < 5) {
    alert("Title must be at least 5 characters long");
    return false;
  }

  const effortNumber = Number(effort);

  if (!effort || isNaN(effortNumber) || effortNumber <= 0) {
    alert("Effort must be a positive number over 0");
    return false;
  }

  return true;
};

//Task 3: Part 2: code line immediately blow {e.preventDefault();
handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  //task 6 bit below
  if (!this.validate()) {
    return;
  }
  
const newIssue: Issue = {
  id: 0,
  status: "Open",
  owner: this.state.owner,
  created: new Date(),
  effort: Number(this.state.effort),
  completionDate: this.state.completionDate
   ? new Date(this.state.completionDate)
   : undefined,
  title: this.state.title,
  priority: this.state.priority,
};

 this.props.addIssue(newIssue);

 //the RESET for the form goes right here
 this.setState({
  owner: "", 
  title: "",
  effort: "",
  completionDate: "", 
  priority: "Low",
 });
};

render() { // Task 3: Part 1 and 3 code below
return (
  <form style={formStyle} onSubmit={this.handleSubmit}>
    <input 
    style={inputStyle}
    name="owner" 
    placeholder="Owner" 
    value={this.state.owner}
    onChange={this.handleChange}
    />

    <input 
    style={inputStyle}
    name="title" 
    placeholder="Title" 
    value={this.state.title}
    onChange={this.handleChange}
    />

    <input 
    style={inputStyle}
    name="effort"
    placeholder="Effort"
    value={this.state.effort}
    onChange={this.handleChange}
    />

    <input 
    style={inputStyle}
    name="completionDate" 
    type="date" 
    value={this.state.completionDate}
    onChange={this.handleChange}
    />
    
   
    <select 
    style={inputStyle}                           //adding in priority dropdown 
    name="priority"
    value={this.state.priority}
    onChange={(e) =>
    this.setState({ priority: e.target.value as string })
     }
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    
    <button 
    style={buttonStyle} 
    type="submit">Add Issue
    </button>
  </form>
  );
 }
}


// --------------------
// IssueList
// --------------------
type IssueListState = {
issues: Issue[];
};

class IssueList extends React.Component<{}, IssueListState> {
 constructor(props: {}) {
  super(props);
  this.state = {
   issues: [
     {
      id: 1,
      status: "Open",
      owner: "John",
      created: new Date("2016-08-15"),
      effort: 5,
      completionDate: undefined,
      title: "Error in console when clicking Add",
      priority: "High",
     },
     {
      id: 2,
      status: "Assigned",
      owner: "Emma",
      created: new Date("2016-08-16"),
      effort: 14,
      completionDate: new Date("2016-08-30"),
      title: "Missing bottom border on panel",
      priority: "Low",
     },
    ],
  };
}

addIssue = (issue: Issue) => {

// Task 1: Code is here below

this.setState((prevState) => {
  const maxId = Math.max(...prevState.issues.map(i => i.id));
  const newId = maxId +1;

  const updatedIssue = { ...issue, id: newId};

  return {
    issues: [...prevState.issues, updatedIssue],
  };
});

// Task 4: place Code here
console.log("ADD ISSUE - state AFTER setState call (still old stuff):", this.state.issues);

};
deleteIssue = (id: number) => {

// Task 2: code is below
this.setState((prevState) => ({
  issues: prevState.issues.filter(
    (issue) => issue.id !== id
  ),
}));


// Task 4: place Code here
console.log("DELETE ISSUE - state AFTER setState call (still old stuff):", this.state.issues);
};


render() {
 return (
  <div style={containerStyle}>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr/>
    <p>Total Issues: {this.state.issues.length}</p>

    <IssueTable
    issues={this.state.issues}
    deleteIssue={this.deleteIssue}
  />

  <hr/>

    <IssueAdd addIssue={this.addIssue} />
  </div>
  );
 }
}
export default IssueList;