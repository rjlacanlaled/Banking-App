import React, { useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetContext)
}

const getLastId = (array) => {
    if (array.length == 0) return 0
    
    const lastId = array[array.length - 1].id

    return lastId + 1
}

export const BudgetProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', [])

    function addBudget({name, amount}) {
        setBudgets(prevBudget => {
            if (prevBudget.find(budget => budget.name === name)){
                return prevBudget
            }
            return [...prevBudget, {id: getLastId(budgets), name, amount}]
        })
    }

    function deleteBudget({ id }) {
        console.log('id', id)

        setBudgets(prevBudget => {
          return prevBudget.filter(budget => {
            if (budget.id !== id) return budget
          })
        })
    }

    return (
        <BudgetContext.Provider value={{budgets, addBudget, deleteBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}