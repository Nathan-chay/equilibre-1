import { useEffect, useReducer, useState } from "react";
import { initialExpenses, initialGroups } from "./data";
import { ExpenseForm } from "./components/ExpenseForm";
import type { Expense } from "./types";
import { ExpenseList } from "./components/ExpenseList";
import { NewMemberForm } from "./components/NewMemberForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { expensesReducer } from "./state/expensesReducer";
import { loadExpenses, saveExpenses } from "./state/expensesStorage";
import { CurrencySelect } from "./components/CurrencySelect";
import { useCurrency } from "./context/CurrencyContext";

export const App = () => {
  const [expenses, dispatch] = useReducer(expensesReducer, initialExpenses, loadExpenses)
  const [groups, setGroups] = useLocalStorage(
    "equilibre.v1.groups",
    initialGroups,
  );
  const [searchValue, setSearchValue] = useState("");
  const [groupId, setGroupId] = useState(initialGroups[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { formatAmount } = useCurrency()

  const group = groups.find((g) => g.id === groupId) ?? groups[0];

  const members = group?.members ?? [];
  const groupExpenses = expenses.filter((e) => e.groupId === groupId);
  const editing = groupExpenses.find((e) => e.id === editingId);

  useEffect(() => {
    window.document.title = `${group.name} - Equilibre`;
  }, [group.name]);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses])

  const saveExpense = (expense: Expense) => {
    dispatch({ type: 'saved', expense }) 
    setEditingId(null);
  };

  const addMember = (groupId: string, name: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, members: [...g.members, name] } : g,
      ),
    );
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleted', id }) 
  };

  const handleGroupChange = (groupId: string) => {
    setGroupId(groupId);
    setEditingId(null);
  };

  const handleToggle = (id: string) => {
    dispatch({ type: 'toggled', id }) 
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const visible = groupExpenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const totalNotPaid = groupExpenses.reduce(
    (sum, expense) => (expense.settled ? sum : sum + expense.amountCents),
    0,
  );

  return (
    <main className="app">
      <select
        name="groupId"
        value={groupId}
        onChange={(e) => handleGroupChange(e.target.value)}
      >
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <CurrencySelect  />
      <NewMemberForm groupId={groupId} members={members} onSave={addMember} />
      <ExpenseForm
        members={members}
        onSave={saveExpense}
        groupId={groupId}
        initial={editing}
        key={`${groupId}-${editing?.id ?? "new"}`}
      />
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Rechercher..."
      />
      <ExpenseList
        expenses={visible}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
      <p className="summary">
        <span>Reste à régler</span>
        <strong>{formatAmount(totalNotPaid)}</strong>
      </p>
    </main>
  );
};
