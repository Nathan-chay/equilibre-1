import { useExpenses } from "../context/ExpensesContext";

export const HomePage = () => {
  const {groups, expenses} = useExpenses();
  return (
    <section className="app">
      <h2 className="page-title">Mes groupes</h2>
      <ul className="group-list">
        {groups.map((g)=>{
          const count = expenses.filter((e)=> e.groupId === g.id).length;
          return(
            <li key={g.id} className="group-card">
              {g.name} : {count} dépense(s)
            </li>
          );
        })}
      </ul>
    </section>
  );
};