import { useEffect, useState } from "react";
import { useExpenses } from "../context/ExpensesContext";
import { useCurrency } from "../context/CurrencyContext";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { NewMemberForm } from "../components/NewMemberForm";
import { CurrencySelect } from "../components/CurrencySelect";
import type { Expense } from "../types";
import { useParams } from "react-router";

export const GroupPage = () => {
  const { groupId } = useParams();
  const { groups, expenses, dispatch, addMember } = useExpenses();
  const { formatAmount } = useCurrency();

  const [searchValue, setSearchValue] = useState("");
  // const [groupId, setGroupId] = useState(groups[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);

  const group = groups.find((g) => g.id === groupId);

  useEffect(() => {
    if (group) window.document.title = `${group.name} - Equilibre`;
  }, [group]);

  if (!group) {
    return <>Groupe non trouvé</>;
  }

  const members = group.members;
  const groupExpenses = expenses.filter((e) => e.groupId === group.id);
  const editing = groupExpenses.find((e) => e.id === editingId);

  const saveExpense = (expense: Expense) => {
    dispatch({ type: "saved", expense });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "deleted", id });
  };

  // const handleGroupChange = (newGroupId: string) => {
  //   setGroupId(newGroupId);
  //   setEditingId(null);
  // };

  const handleToggle = (id: string) => {
    dispatch({ type: "toggled", id });
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
      {/* <select
        name="groupId"
        value={group.id}
        onChange={(e) => handleGroupChange(e.target.value)}
      >
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select> */}
      <CurrencySelect />
      <NewMemberForm groupId={group.id} members={members} onSave={addMember} />
      <ExpenseForm
        members={members}
        onSave={saveExpense}
        groupId={group.id}
        initial={editing}
        key={`${group.id}-${editing?.id ?? "new"}`}
      />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
