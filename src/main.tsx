import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./christmas.css";
import { CurrencyProvider } from "./context/CurrencyProvider.tsx";
import { ExpensesProvider } from "./context/ExpensesProvider.tsx";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExpensesProvider>
      <CurrencyProvider>
        <RouterProvider router={router} />
      </CurrencyProvider>
    </ExpensesProvider>
  </StrictMode>,
);
