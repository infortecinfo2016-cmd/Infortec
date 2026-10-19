import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppShell } from "./demo/AppShell";
import { BoletosFornecedoresPage } from "./features/boletos-fornecedores/BoletosFornecedoresPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppShell trail={["Financeiro", "Boletos de fornecedores"]}>
      <BoletosFornecedoresPage />
    </AppShell>
  </StrictMode>,
);
