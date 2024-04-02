import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/HeadPage';
import { formStyle, labelStyle, inputStyle, checkboxStyle, submitButtonStyle, accountsContainerStyle, accountStyle, modalContainerStyle, modalStyle } from '../assets/withdrawalForm';
import ShowRegistrationForm from './ShowRegistration'; 
function Account({ account, onClick }) {
    return (
        <div style={accountStyle} onClick={() => onClick(account)}>
            <h3>{account}</h3>
        </div>
    );
}

function WithdrawalForm() {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedAccountTypes, setSelectedAccountTypes] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [accountTypes, setAccountTypes] = useState([]);
    const [categoryOperations, setCategoryOperations] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        lastName: '',
        birthDate: '',
        salary: '',
        accountNumber: '',
    });

    useEffect(() => {
        // Charger la liste des compte depuis l'API

        // Charger la liste des comptes depuis l'API
        axios.get('http://localhost:8080/api/accounts')
            .then(response => {
                setAccounts(response.data);
                console.log("Accounts:", response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });

        // Charger la liste des types de compte depuis l'API
        axios.get('http://localhost:8080/api/account-types/names')
            .then(response => {
                setAccountTypes(response.data);
                console.log("response", response.data);
            })
            .catch(error => {
                console.error('Error fetching account types:', error);
            });


        // Charger la liste des opérations de catégorie depuis l'API
        axios.get('http://localhost:8080/api/categoryOperations')
            .then(response => {
                setCategoryOperations(response.data);
                console.log("categoryOperations", response.data);
            })
            .catch(error => {
                console.error('Error fetching category operations:', error);
            });
    }, []);

    const handleAccountClick = (account) => {
        setSelectedAccountTypes(account.account_number);
        setShowRegistrationForm(true);
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();
        // Logique de soumission du formulaire d'inscription
        console.log('Registration submitted:', registrationData);
        // Réinitialiser les données d'inscription après la soumission
        setRegistrationData({
            name: '',
            lastName: '',
            birthDate: '',
            salary: '',
            accountNumber: '',
        });
        setShowRegistrationForm(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegistrationData({
            ...registrationData,
            [name]: value,
        });
    };

    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [withdrawalDateTime, setWithdrawalDateTime] = useState('');
    const [overdraftEnabled, setOverdraftEnabled] = useState(false);
    const [interestRate7Days, setInterestRate7Days] = useState();
    const [interestRateAfter7Days, setInterestRateAfter7Days] = useState();

    const handleWithdrawal = (event) => {
        event.preventDefault();
    
        // Récupérer l'identifiant de la catégorie d'opération sélectionnée par l'utilisateur
        const categoryId = selectedCategoryId;
    
        // Récupérer l'identifiant du compte sélectionné par l'utilisateur
        const accountId = selectedAccountId;
    
        console.log("Selected Category ID:", categoryId); // Ajout du console.log pour l'ID de la catégorie
        console.log("Selected Account ID:", accountId); // Ajout du console.log pour l'ID du compte
    
        // Envoi de la requête de retrait à l'API avec la date de la transaction
        axios.post(`http://localhost:8080/api/accounts/withdraw/${selectedAccountTypes}`, {
            balance: parseFloat(withdrawalAmount),
            transactionDateTime: withdrawalDateTime, // Envoyer la date de la transaction dans le corps de la requête
            id_accounts: accountId,
            id_category_operation: categoryId
        })
            .then(response => {
                console.log('Withdrawal successful');
                // Création de la transaction en utilisant l'identifiant du compte
                createTransaction(categoryId, accountId);
                // Mettre à jour l'état du compte ou effectuer d'autres opérations nécessaires
            })
            .catch(error => {
                console.error('Error withdrawing funds:', error);
                // Afficher un message d'erreur à l'utilisateur
            });
    };
    
    
    const createTransaction = (categoryId, accountId) => {
        // Envoi de la requête de création de transaction à l'API
        axios.post('http://localhost:8080/api/transactions', {
            type: 'retrait',
            date: withdrawalDateTime, // Utilisez la date et l'heure du retrait
            amount: parseFloat(withdrawalAmount),
            id_accounts: accountId, // Utilisez l'identifiant du compte approprié
            id_category_operation: categoryId // Utilisez l'identifiant de la catégorie appropriée
            // Ajoutez d'autres attributs de transaction si nécessaire
        })
            .then(response => {
                console.log('Transaction created successfully');
                console.log("response crete", response.data);
                // Mettre à jour l'état de l'application ou effectuer d'autres opérations nécessaires
            })
            .catch(error => {
                console.error('Error creating transaction:', error);
                // Afficher un message d'erreur à l'utilisateur
            });
    };
    

    return (
        <>
            <Header />
            <form onSubmit={handleWithdrawal} style={formStyle}>
                <label htmlFor="account" style={labelStyle}>
                    Select Account:
                </label>
                <select
                    id="account"
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    required
                    style={inputStyle}
                >
                    {accounts.map((account, index) => (
                        <option key={index} value={account.id}>{account.account_number}</option>
                    ))}
                </select>
                <label htmlFor="account_type" style={labelStyle}>
                    Select Types Account:
                </label>
                <select
                    id="accountType"
                    value={selectedAccountTypes}
                    onChange={(e) => setSelectedAccountTypes(e.target.value)}
                    required
                    style={inputStyle}
                >
                    {accountTypes.map((account, index) => (
                        <option key={index} value={account}>{account}</option>
                    ))}
                </select>

                <label htmlFor="category" style={labelStyle}>
                    Select Category:
                </label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required
                    style={inputStyle}
                >
                    {categoryOperations.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <label htmlFor="balance" style={labelStyle}>
                    Withdrawal Balance:
                </label>
                <input
                    type="number"
                    id="balance"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    required
                    style={inputStyle}
                />

                <label htmlFor="datetime" style={labelStyle}>
                    Date and Time of Withdrawal:
                </label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={withdrawalDateTime}
                    onChange={(e) => setWithdrawalDateTime(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="checkbox"
                    id="overdraft"
                    checked={overdraftEnabled}
                    onChange={(e) => setOverdraftEnabled(e.target.checked)}
                    style={checkboxStyle}
                />
                <label htmlFor="overdraft" style={{ ...labelStyle, marginLeft: '10px' }}>
                    Enable Overdraft
                </label>

                <div>
                    <label htmlFor="interest7days" style={labelStyle}>
                        Interest Rate for First 7 Days:
                    </label>
                    <input
                        type="number"
                        id="interest7days"
                        value={interestRate7Days}
                        onChange={(e) => setInterestRate7Days(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label htmlFor="interestAfter7days" style={labelStyle}>
                        Interest Rate After 7 Days:
                    </label>
                    <input
                        type="number"
                        id="interestAfter7days"
                        value={interestRateAfter7Days}
                        onChange={(e) => setInterestRateAfter7Days(e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <button type="submit" style={submitButtonStyle}>
                    Withdraw
                </button>
            </form>

            <div style={accountsContainerStyle}>
                {accountTypes.map((account, index) => (
                    <Account key={index} account={account} onClick={handleAccountClick} />
                ))}
            </div>

            {showRegistrationForm && <ShowRegistrationForm registrationData={registrationData} handleInputChange={handleInputChange} handleRegistrationSubmit={handleRegistrationSubmit} />}
            
        </>
    );
}

export default WithdrawalForm;
