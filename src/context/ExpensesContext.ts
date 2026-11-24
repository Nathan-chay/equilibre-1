import { createContext, useContext, type Dispatch } from "react"
import type { Expense, Group } from "../types"
import type { ExpensesAction } from "../state/expensesReducer"

type ExpensesContextValue = {
  groups: Group[];
  expenses: Expense[];
  dispatch: Dispatch<ExpensesAction>;
  addGroup: (group: Group) => void;
  addMember: (groupId: string, name: string) => void;
};

export const ExpensesContext = createContext<ExpensesContextValue | null>(null);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if(context === null) 
    throw new Error("useExpenses doit être utilisé dans un ExpensesProvider");
  return context;
};