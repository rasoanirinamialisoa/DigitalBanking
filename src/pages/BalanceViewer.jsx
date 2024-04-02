import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/BalanceViewer.css';

function BalanceViewer() {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); // State pour la date sélectionnée, initialisé à la date d'aujourd'hui

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/accounts');
            setAccounts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des comptes :', error);
        }
    };

    const handleAccountSelect = (accountId) => {
        setSelectedAccountId(accountId);
        const account = accounts.find(account => account.id === accountId);
        setSelectedAccount(account);
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        setSelectedDate(selectedDate);
    };

    return (
        <div className="balance-container" style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
            <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', marginBottom: '20px' }}>Solde</h1>
            <div className="account-dropdown" style={{ marginBottom: '20px' }}>
                <label htmlFor="account-select" style={{ fontFamily: 'Arial, sans-serif', marginRight: '10px' }}>Choisir un compte :</label>
                <select id="account-select" value={selectedAccountId} onChange={(e) => handleAccountSelect(parseInt(e.target.value))} style={{ fontFamily: 'Arial, sans-serif', padding: '5px', borderRadius: '5px' }}>
                    <option value="">Sélectionner un compte</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.account_number}</option>
                    ))}
                </select>
            </div>
            <div className="date-picker" style={{ marginBottom: '20px' }}>
                <label htmlFor="date-select" style={{ fontFamily: 'Arial, sans-serif', marginRight: '10px' }}>Choisir une date :</label>
                <input type="date" id="date-select" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} style={{ fontFamily: 'Arial, sans-serif', padding: '5px', borderRadius: '5px' }} />
            </div>
            {selectedAccount && (
                <div className="balance-card" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Account Number: {selectedAccount.account_number}</h2>
                    <h2>Solde Principal: {selectedAccount.balance}</h2>
                    <h2>Prêts: {selectedAccount.loans}</h2>
                    <h2>Intérêts des Prêts: {selectedAccount.loanInterests}</h2>
                    <h2>Limite de découvert : {selectedAccount.overdraft_credit_percentage}</h2>
                    <h2>Taux d'intérêt après 7 jours : {selectedAccount.interest_rate_7_days}</h2>
                </div>
            )}
        </div>
    );
}

export default BalanceViewer;
