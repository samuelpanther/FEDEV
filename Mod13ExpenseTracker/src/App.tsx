import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);


type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  created_at?: string;
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [searchTerm, setSearchTerm] = useState("");

  // pie color fix i hope
  const colors = (opacity = 1) => [
  `rgba(59, 130, 246, ${opacity})`,   // blue
  `rgba(16, 185, 129, ${opacity})`,   // green
  `rgba(245, 158, 11, ${opacity})`,   // amber
  `rgba(239, 68, 68, ${opacity})`,    // red
  `rgba(139, 92, 246, ${opacity})`,   // purple
  `rgba(14, 165, 233, ${opacity})`,   // sky
  `rgba(236, 72, 153, ${opacity})`,   // pink
  `rgba(34, 197, 94, ${opacity})`,    // lime
];


// Fetch expenses from Supabase
 const fetchExpenses = async () => {
  const { data, error } = await supabase.from("expenses").select("*");

if (error) {
  console.log("Error fetching data:", error);
} else {
  setExpenses(data || []);
 }
};

useEffect(() => {
  fetchExpenses();
}, []);

//total expenses calculation 

const totalExpenses = expenses.reduce((sum, exp) => {
  return sum + Number(exp.amount);
}, 0);

//grouping expense categories and chart
const categoryTotals = expenses.reduce((acc: any, exp) => {
  const category = exp.category;

  if (!acc[category]) {
    acc[category] = 0;
  }

  acc[category] += Number(exp.amount);

  return acc;
}, {});


const chartData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      data: Object.values(categoryTotals),
      backgroundColor: colors(0.9),
    },
  ],
};

//grouping by month
const monthlyTotals = expenses.reduce((acc: any, exp) => {
  const date = exp.created_at ? new Date(exp.created_at) : new Date();
  const month = date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  if (!acc[month]) {
    acc[month] = 0;
  }

  acc[month] += Number(exp.amount);

  return acc;
}, {});

//bulding that line chart thing 
const lineChartData = {
  labels: Object.keys(monthlyTotals),
  datasets: [
    {
      label: "Monthly Spending",
      data: Object.values(monthlyTotals),
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54,162,235,0.2)",
      pointRadius: 5,        //  makes line mark dots bigger
    pointHoverRadius: 8,   //  even bigger on hover
    pointBackgroundColor: "#ffffff",
    pointBorderColor: "#36A2EB",
    pointBorderWidth: 2,
    },
  ],
};

// Add Expense
const addExpense = async () => {
  if (!title || !amount) return;

  const { error } = await supabase.from("expenses").insert([
    {
      title,
      amount: Number(amount),
      category,
    },
  ]);

if (error) {
  console.log("Error adding expense:", error);
} else {
  setTitle("");
  setAmount("");
  setCategory("Food");
  fetchExpenses();
}
};

//Delete expenses 

const deleteExpense = async (id: number) => {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Error deleting expense:", error);
  } else {
    fetchExpenses();
  }
};

//search filter

const filteredExpenses = expenses.filter((exp) =>
  exp.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className="container">
    <h2>Expense Tracker</h2>
    <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>

   
     {/* FORM ROW  FORM STARTS HERE SAM */}
    <div className="formRow">

    {/* Title */}
    <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />

    {/* Amount */}
    <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
   />

    {/* Category Dropdown */}
   <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
   >
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Other">Other</option>
   </select>

  {/* Button */}
  <button onClick={addExpense}>Add Expense</button>
</div>

{/*search input*/}
<input
  type="text"
  placeholder="Search by title..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

{/* EXPENSE LIST */}
  <ul>
   {filteredExpenses.map((exp) => (
     <li key={exp.id} className="expenseRow">
  <span className="col title">{exp.title}</span>
  <span className="col amount">${exp.amount}</span>
  <span className="col category">{exp.category}</span>

  <button
    className="deleteBtn"
    onClick={() => deleteExpense(exp.id)}
  >
    Delete
  </button>
</li>

   ))}
   </ul>
  

  {/* CHARTS SECTION */}
<div className="chartSection">

  {/* Pie Chart */}
  <div className="pieWrapper">
    <Pie data={chartData} 
    options={{
    plugins: {
      legend: {
        position: "right", 
        labels: {
          position: "right",
          color: "#ffffff",  
          font: {
            size: 14,  
          },
          padding: 20,      
        },
      },
    },
  }}
/>
  </div>

  {/* Line Chart */}
  <div className="lineWrapper">
    <Line
      data={lineChartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#e1e5f2",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#e1e5f2" },
            grid: { color: "#1f7a8c" },
          },
          y: {
            ticks: { color: "#e1e5f2" },
            grid: { color: "#1f7a8c" },
          },
        },
      }}
    />
  </div>

</div>

</div>
);
  
}


export default App;