import { useExpenses } from "../context/ExpensesContext";
import { useCurrency } from "../context/CurrencyContext";
import { Link } from "react-router";
import { AddGroupForm } from "../components/AddGroupForm";

export const HomePage = () => {
  const { groups, expenses } = useExpenses();
  const { formatAmount } = useCurrency();

  return (
    <section className="app">
      <div className="home-head">
        <h2 className="page-title">Mes groupes</h2>
        <p className="home-subtitle">
          Choisissez un groupe pour suivre les dépenses et savoir qui doit quoi.
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="empty-state">Aucun groupe pour le moment.</p>
      ) : (
        <ul className="group-list">
          {groups.map((g) => {
            const groupExpenses = expenses.filter((e) => e.groupId === g.id);
            const pending = groupExpenses.filter((e) => !e.settled);
            const pendingCents = pending.reduce((sum, e) => sum + e.amountCents, 0);

            return (
              <li key={g.id}>
                <Link to={`/groupes/${g.id}`} className="group-card">
                  <span className="group-card__avatar" aria-hidden="true">
                    {g.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="group-card__body">
                    <span className="group-card__name">{g.name}</span>
                    <span className="group-card__meta">
                      {g.members.length} membre{g.members.length > 1 ? "s" : ""} ·{" "}
                      {groupExpenses.length} dépense{groupExpenses.length > 1 ? "s" : ""}
                    </span>
                  </span>
                  <span className="group-card__side">
                    <span className="group-card__amount">{formatAmount(pendingCents)}</span>
                    <span className="group-card__badge" data-clear={pending.length === 0}>
                      {pending.length === 0 ? "Tout est réglé" : `${pending.length} à régler`}
                    </span>
                  </span>
                  <span className="group-card__chevron" aria-hidden="true">
                    ›
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <AddGroupForm />
    </section>
  );
};
