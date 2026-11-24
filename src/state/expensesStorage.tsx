import type { Expense } from "../types";

const KEY ='equilibre.v1.expenses'

export const loadExpenses = (initial: Expense[]): Expense[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw === null ? initial : JSON.parse(raw);
  } catch (error) {
    return initial;
  }
};

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(KEY, JSON.stringify(expenses));
};