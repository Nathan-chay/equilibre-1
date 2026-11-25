import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { useExpenses } from "../context/ExpensesContext";

export const AddGroupForm = () => {
  const navigate = useNavigate();
  const { addGroup } = useExpenses();
  const [name, setName] = useState("");
  const [member, setMember] = useState("");

  const parsedName = name.trim();
  const parsedMember = member.trim();
  const isValid = parsedName.length > 0 && parsedMember.length > 0;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const id = crypto.randomUUID();
    addGroup({ id, name: parsedName, members: [parsedMember] });
    navigate(`/groupes/${id}`);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom du groupe"
      />
      <input
        value={member}
        onChange={(e) => setMember(e.target.value)}
        placeholder="Votre prénom"
      />
      <button type="submit" disabled={!isValid}>
        Créer le groupe
      </button>
    </form>
  );
};
