import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Deposit.css';

function DepositForm() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [categoryOperations, setCategoryOperations] = useState([]);
    const [selectedCategoryOperation, setSelectedCategoryOperation] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    useEffect(() => {
        fetchCategoryOperations();
        fetchAccounts();
    }, []);

    const fetchCategoryOperations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categoryOperations');
            console.log('Catégories d\'opérations récupérées:', response.data);
            setCategoryOperations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des opérations de catégorie :', error);
        }
    };

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/accounts');
            console.log('Comptes récupérés:', response.data);
            setAccounts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des comptes :', error);
        }
    };

    const findCategoryOperationIdByName = (name) => {
        const operation = categoryOperations.find(operation => operation.name === name);
        return operation ? operation.id : null;
    };

    const findAccountIdByAccountNumber = (accountNumber) => {
        const account = accounts.find(account => account.account_number === accountNumber);
        return account ? account.id : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Récupérer l'ID de la catégorie d'opération en fonction du motif sélectionné
            const categoryOperationId = findCategoryOperationIdByName(selectedCategoryOperation);
            console.log('ID de la catégorie d\'opération sélectionnée:', categoryOperationId);

            // Récupérer l'ID du compte en fonction du numéro de compte sélectionné
            const accountId = findAccountIdByAccountNumber(selectedAccount);
            console.log('ID du compte sélectionné:', accountId);

            // Afficher les dates obtenues
            console.log('Date de prise d\'effet:', effectiveDate);
            console.log('Date d\'enregistrement:', registrationDate);

            // Envoyer les données du formulaire à l'API pour effectuer l'approvisionnement
            const response = await axios.post('http://localhost:8080/api/transactions', {
                type: 'Deposit',
                amount,
                id_accounts: accountId,
                id_category_operation: categoryOperationId,
                effective_date: effectiveDate,
                registration_date: registrationDate
            });
            // Afficher un message de succès ou effectuer d'autres actions nécessaires
            console.log('Approvisionnement effectué avec succès:', response.data);
        } catch (error) {
            // Gérer les erreurs en cas d'échec de l'approvisionnement
            console.error('Erreur lors de l\'approvisionnement:', error);
        }
    };


    return (
        <div className="deposit-container">
            <div className="deposit-form">
                <h2>Approvisionnement de solde</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Montant :</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </div>
                    <div>
                        <label>Compte :</label>
                        <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} required>
                            <option value="">Sélectionner un compte</option>
                            {accounts.map(account => (
                                <option key={account.id} value={account.account_number}>{account.account_number}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Motif :</label>
                        <select value={selectedCategoryOperation} onChange={(e) => setSelectedCategoryOperation(e.target.value)} required>
                            <option value="">Sélectionner un motif</option>
                            {categoryOperations.map(operation => (
                                <option key={operation.id} value={operation.name}>{operation.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Date de prise d'effet :</label>
                        <input type="datetime-local" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Date d'enregistrement :</label>
                        <input type="datetime-local" value={registrationDate} onChange={(e) => setRegistrationDate(e.target.value)} required />
                    </div>
                    <button type="submit">Approvisionner</button>
                </form>
            </div>
        </div>
    );
}

export default DepositForm;
