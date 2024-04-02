import React, { useState } from "react";
import AccountForm from "./pages/AccountForm";
import WithdrawalForm from "./pages/WithdrawalForm";
import "./assets/styles/styles.css";
import Balance from "./pages/BalanceViewer";
import FundDeposit from "./pages/FundDeposit";
import Transfer from "./pages/Transfer";
import AccountStatements from "./pages/AccountStatements";
import Layout from "./components/Layout";
import RegistrationPage from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [accounts, setAccounts] = useState([]);

  const handleAccountSubmit = (formData) => {
    setAccounts([...accounts, formData]);
  };

  const handleWithdrawalSubmit = (formData) => {
    // La logique de retrait sera implémentée plus tard
    // Pour l'instant, nous affichons juste un message de succès
    console.log(formData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Routes pour les autres pages avec le Layout */}
        <Route path="/inscription" element={<RegistrationPage />} />

        <Route
          path="/WithdrawalForm"
          element={
            <Layout>
              <WithdrawalForm
                accounts={accounts}
                onSubmit={handleWithdrawalSubmit}
              />
            </Layout>
          }
        />
        <Route path="/Balance" element={<Layout><Balance /></Layout>} />
        <Route path="/FundDeposit" element={<Layout><FundDeposit /></Layout>} />
        <Route path="/Transfer" element={<Layout><Transfer /></Layout>} />
        <Route path="/AccountStatements" element={<Layout><AccountStatements /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
