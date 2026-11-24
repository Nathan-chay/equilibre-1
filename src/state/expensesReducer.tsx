import type { Expense } from "../types";

export type ExpensesAction = 
  | {type: "saved", expense: Expense}
  | {type: "deleted", id: string}
  | {type: "toggled", id: string};

  export const expensesReducer = (expenses: Expense[], action: ExpensesAction) : Expense[] => {
    switch (action.type) {
      case "saved": {
        const exists = expenses.some(e => e.id === action.expense.id)
        if(exists) {
          return expenses.map(e => e.id === action.expense.id ? action.expense : e)
        }
        return [...expenses, action.expense]
      }

      case "deleted": {
        return expenses.filter((e) => e.id !== action.id);
      }

      case "toggled": {
        return expenses.map((e) => 
          e.id === action.id ? {...e, settled: !e.settled} : e,
        );
      }
    }
  }