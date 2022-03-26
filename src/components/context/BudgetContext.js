import React, { useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudgets() {
   return useContext(BudgetContext);
}

const getLastId = (array) => {
   if (array.length == 0) return 0;

   const lastId = array[array.length - 1].id;

   return lastId + 1;
};

export const BudgetProvider = ({ children }) => {
   const [budgets, setBudgets] = useLocalStorage("budgets", []);
   const [expenses, setExpenses] = useLocalStorage("expenses", []);

   function addBudget({ userId, name, amount }) {
      setBudgets((prevBudget) => {
         if (prevBudget.find((budget) => budget.name === name)) {
            return prevBudget;
         }
         return [
            ...prevBudget,
            { userId, id: getLastId(budgets), name, amount },
         ];
      });
   }

   function addExpense({ budgetId, expenseName, amount }) {
      setExpenses((prevExpense) => {
         if (prevExpense.find((expense) => expense.name === expenseName)) {
            return prevExpense;
         }
         return [
            ...prevExpense,
            { budgetId, id: getLastId(expenses), expenseName, amount },
         ];
      });
   }

   function getBudgetExpenses(budgetId) {
      return expenses.filter((expense) => expense.budgetId === budgetId);
   }

   function deleteBudget({ id }) {
      console.log("id", id);

      setBudgets((prevBudget) => {
         return prevBudget.filter((budget) => {
            if (budget.id !== id) return budget;
         });
      });
   }

   function deleteExpense(id) {
      setExpenses((prevExpense) => {
         return prevExpense.filter((expense) => {
            if (expense.id !== id) return expense;
         });
      });
   }

   return (
      <BudgetContext.Provider
         value={{
            budgets,
            addBudget,
            deleteBudget,
            addExpense,
            expenses,
            deleteExpense,
            getBudgetExpenses,
         }}
      >
         {children}
      </BudgetContext.Provider>
   );
};
