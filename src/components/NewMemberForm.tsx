import { useState, type SubmitEvent } from "react";

type NewMemberFormProps = {
  onSave: (groupId: string, name: string) => void;
  groupId: string;
  members: string[];
};

export const NewMemberForm = ({
  onSave,
  groupId,
  members,
}: NewMemberFormProps) => {
  const [newMemberName, setNewMemberName] = useState("");
  const parsedMemberName = newMemberName.trim();
  const isValid =
    !members.find((n) => n.toLowerCase() === parsedMemberName.toLowerCase()) &&
    parsedMemberName.length > 0;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    onSave(groupId, parsedMemberName);
    setNewMemberName("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nom du nouveau membre"
        value={newMemberName}
        onChange={(e) => setNewMemberName(e.target.value)}
      />
      <button type="submit" disabled={!isValid}>
        Ajouter
      </button>
    </form>
  );
};
