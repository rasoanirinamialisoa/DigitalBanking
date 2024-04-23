import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Select, FormControl, MenuItem, InputLabel, TextField, Paper, Box } from '@mui/material';

function BalanceViewer() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Solde
      </Typography>
      <FormControl variant="standard" style={{ marginBottom: '20px', width: '100%' }}>
        <InputLabel htmlFor="account-select">Choisir un compte :</InputLabel>
        <Select
          id="account-select"
          value={selectedAccountId}
          onChange={(e) => handleAccountSelect(parseInt(e.target.value))}
          label="Choisir un compte"
          fullWidth
        >
          <MenuItem value="">Sélectionner un compte</MenuItem>
          {accounts.map(account => (
            <MenuItem key={account.id} value={account.id}>{account.account_number}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" style={{ marginBottom: '20px', width: '100%' }}>
        <InputLabel htmlFor="date-select"></InputLabel>
        <TextField
          id="date-select"
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange}
          label="Choisir une date"
          fullWidth
        />
      </FormControl>
      {selectedAccount && (
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" style={{ marginBottom: '10px' }}>
            Account Number: {selectedAccount.account_number}
          </Typography>
          <Box>
            <Typography variant="body1">
              Solde Principal: {selectedAccount.balance}
            </Typography>
            <Typography variant="body1">
              Prêts: {selectedAccount.loans}
            </Typography>
            <Typography variant="body1">
              Intérêts des Prêts: {selectedAccount.loanInterests}
            </Typography>
            <Typography variant="body1">
              Limite de découvert : {selectedAccount.overdraft_credit_percentage}
            </Typography>
            <Typography variant="body1">
              Taux d'intérêt après 7 jours : {selectedAccount.interest_rate_7_days}
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default BalanceViewer;
