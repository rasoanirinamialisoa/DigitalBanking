import React, { useState } from "react";
import AccountForm from "./pages/AccountForm";
import WithdrawalForm from "./pages/WithdrawalForm";
import "./assets/styles/styles.css";
import FundDeposit from "./pages/FundDeposit";
import Transfer from "./pages/Transfer";
import AccountStatements from "./pages/AccountStatements";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CategorizationPage from "./pages/handleCategorize ";
import BalanceViewer from "./pages/BalanceViewer";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout><AccountForm /></Layout>}/>
        <Route path="/WithdrawalForm" element={<Layout><WithdrawalForm /> </Layout>}/>
        <Route path="/BalanceViewer" element={<Layout><BalanceViewer /></Layout>} />
        <Route path="/FundDeposit" element={<Layout><FundDeposit /></Layout>} />
        <Route path="/Transfer" element={<Layout><Transfer /></Layout>} />
        <Route path="/AccountStatements" element={<Layout><AccountStatements /></Layout>} />
        <Route path="/DashboardPage" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/CategorizationPage" element={<Layout><CategorizationPage /></Layout>} />
        <Route path="/AccountForm" element={<Layout><AccountForm /></Layout>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
