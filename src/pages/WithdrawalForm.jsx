
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid, FormControl, InputLabel, MenuItem, Select, TextField, Button, Box,
    Snackbar, Alert
} from '@mui/material';

function WithdrawalForm() {
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedAccountTypes, setSelectedAccountTypes] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [withdrawalDateEffet, setWithdrawalDateEffet] = useState('');
    const [withdrawalDateRegistration, setWithdrawalDateRegistration] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [categoryOperations, setCategoryOperations] = useState([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        lastName: '',
        birthDate: '',
        salary: '',
        accountNumber: '',
    });

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {
            const accountsResponse = await axios.get('http://localhost:8080/api/accounts');
            const accountTypesResponse = await axios.get('http://localhost:8080/api/account-types/names');
            const categoryOperationsResponse = await axios.get('http://localhost:8080/api/categoryOperations');
            setAccounts(accountsResponse.data);
            setAccountTypes(accountTypesResponse.data);
            setCategoryOperations(categoryOperationsResponse.data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };


    const handleAccountClick = (account) => {
        setSelectedAccountTypes(account.account_number);
        setShowRegistrationForm(true);
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();
        console.log('Registration submitted:', registrationData);
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

    const resetForm = () => {
        setSelectedAccountId('');
        setSelectedAccountTypes('');
        setSelectedCategoryId('');
        setWithdrawalAmount('');
        setWithdrawalDateEffet('');
        setWithdrawalDateRegistration('');
    };
    
    const handleWithdrawal = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/accounts/withdraw/${selectedAccountTypes}`, {
            balance: parseFloat(withdrawalAmount),
            effective_date: withdrawalDateEffet,
            registration_date: withdrawalDateRegistration,
            id_accounts: selectedAccountId,
            id_category_operation: selectedCategoryId
        })
            .then(response => {
                console.log('Withdrawal successful');
                setSnackbarMessage('Le retrait a été effectué avec succès.');
                setSnackbarOpen(true);
                createTransaction(selectedCategoryId, selectedAccountId);
                resetForm(); // Réinitialisation du formulaire après le succès
            })
            .catch(error => {
                console.error('Error withdrawing funds:', error);
                setSnackbarMessage('Erreur lors du retrait.');
                setSnackbarOpen(true);
            });
    };
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const createTransaction = (categoryId, accountId) => {
        axios.post('http://localhost:8080/api/transactions', {
            type: 'retrait',
            effective_date: withdrawalDateEffet,
            registration_date: withdrawalDateRegistration,
            amount: parseFloat(withdrawalAmount),
            id_accounts: accountId,
            id_category_operation: categoryId
        })
            .then(response => {
                console.log('Transaction created successfully');
                console.log("response create", response.data);
            })
            .catch(error => {
                console.error('Error creating transaction:', error);
            });
    };

    return (
        <div maxWidth="sm" style={{ padding: '50px' }}>
            <form onSubmit={handleWithdrawal} className="withdrawal-form">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Compte</InputLabel>
                            <Select
                                value={selectedAccountId}
                                onChange={(e) => setSelectedAccountId(e.target.value)}
                                required
                            >
                                {accounts.map((account) => (
                                    <MenuItem key={account.id} value={account.id}>{account.account_number}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type de compte</InputLabel>
                            <Select
                                value={selectedAccountTypes}
                                onChange={(e) => setSelectedAccountTypes(e.target.value)}
                                required
                            >
                                {accountTypes.map((accountType, index) => (
                                    <MenuItem key={index} value={accountType}>{accountType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Catégorie</InputLabel>
                            <Select
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                                required>
                                {categoryOperations.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Montant de retrait"
                            type="number"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date de prise d'effet"
                            type="datetime-local"
                            value={withdrawalDateEffet}
                            onChange={(e) => setWithdrawalDateEffet(e.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date de transaction"
                            type="datetime-local"
                            value={withdrawalDateRegistration}
                            onChange={(e) => setWithdrawalDateRegistration(e.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Button type="submit" variant="contained" color="primary" style={{ width: '20%' }}>
                                Retrait
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default WithdrawalForm;
