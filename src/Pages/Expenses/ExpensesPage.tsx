import { useEffect, useState } from "react";
import { CapitaliseFirstLetter } from "../../Utils/StringUtils";
import Table from "../../Components/Table/Table";
import "./ExpensesPage.css";

interface ExpenseResponse {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string;
  category: "training" | "travel" | "meals";
  status: string;
}

interface Expense {
  date: string;
  merchant: string;
  amount: string;
  category: string;
  description: string;
  status: string;
}

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://expenses-backend-mu.vercel.app/expenses", {
      headers: {
        "Content-Type": "application/json",
        Username: "elizabeth.garland",
      },
    })
      .then((res) => res.json())
      .then((data: ExpenseResponse[]) => {
        const formattedData = data.map((expense) => ({
          date: new Date(expense.date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
          }),
          merchant: CapitaliseFirstLetter(expense.merchant),
          amount: `£${expense.amount}`,
          category: CapitaliseFirstLetter(expense.category),
          description: CapitaliseFirstLetter(expense.description),
          status: CapitaliseFirstLetter(expense.status),
        }));
        setExpenses(formattedData);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <h1>Expenses</h1>
      <Table data={expenses}></Table>
    </>
  );
};

export default ExpensesPage;
