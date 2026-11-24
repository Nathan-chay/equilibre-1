import { useEffect } from "react";
import { Link } from "react-router";

export const NotFoundPage = () => {
  useEffect(() => {
    window.document.title = "Page introuvable - Equilibre";
  }, []);

  return (
    <main className="app not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">Cette page n'existe pas.</p>
      <Link to="/" className="not-found__link">
        Retour à l'accueil
      </Link>
    </main>
  );
};
