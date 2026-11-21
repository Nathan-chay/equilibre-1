import { useState } from "react";
import { initialExpenses, initialGroups } from "./data";
import { formatEUR } from "./lib/format";
import { ExpenseForm } from "./components/ExpenseForm";
import type { Expense, Group } from "./types";
import { ExpenseList } from "./components/ExpenseList";
import { NewMemberForm } from "./components/NewMemberForm";

export const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchValue, setSearchValue] = useState("");
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [groupId, setGroupId] = useState(initialGroups[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);

  const group = groups.find((g) => g.id === groupId);

  const members = group?.members ?? [];
  const groupExpenses = expenses.filter((e) => e.groupId === groupId);
  const editing = groupExpenses.find((e) => e.id === editingId);

  const saveExpense = (expense: Expense) => {
    setExpenses((prev) =>
      prev.some((e) => e.id === expense.id)
        ? prev.map((e) => (e.id === expense.id ? expense : e))
        : [...prev, expense],
    );
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
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleGroupChange = (groupId: string) => {
    setGroupId(groupId);
    setEditingId(null);
  };

  const handleToggle = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, settled: !e.settled } : e)),
    );
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
        <strong>{formatEUR(totalNotPaid)}</strong>
      </p>
    </main>
  );
};
