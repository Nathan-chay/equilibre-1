import { useEffect, useReducer, type PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { expensesReducer } from "../state/expensesReducer";
import { initialExpenses, initialGroups } from "../data";
import { loadExpenses, saveExpenses } from "../state/expensesStorage";
import { ExpensesContext } from "./ExpensesContext";

export const ExpensesProvider = ({children}: PropsWithChildren) => {
  const [expenses, dispatch] = useReducer(expensesReducer, initialExpenses, loadExpenses)
  const [groups, setGroups] = useLocalStorage(
    "equilibre.v1.groups",
    initialGroups,
  );

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses])
    
  const addMember = (groupId: string, name: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, members: [...g.members, name] } : g,
      ),
    );
  };

  return(
    <ExpensesContext value={{addGroup: ()=>{}, addMember, dispatch, expenses, groups}}>
      {children}
    </ExpensesContext>
  )
};