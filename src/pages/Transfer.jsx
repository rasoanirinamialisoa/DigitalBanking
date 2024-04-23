import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

const Transfer = () => {
  const [formData, setFormData] = useState({
    account: '',
    amount: '',
    same_bank: false,
    other_bank: false,
    otherBankName: '',
    otherAccountNumber: '',
    effectiveDate: '',
    registrationDate: '',
    type: '',
  });

  const [types, setTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/categoryOperations')
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching transfer reasons:', error);
      });

    axios.get('http://localhost:8080/api/accounts')
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadioChange = (event) => {
    const isSameBank = event.target.value === 'same';
    console.log('isSameBank:', isSameBank);
    console.log('formData before update:', formData);
    setFormData({
      ...formData,
      same_bank: isSameBank,
      other_bank: !isSameBank,
     
    });
    console.log('formData after update:', formData);
    console.log('formdata otherBankName', formData.otherBankName);
    console.log('formdata otherAccountNUmber:', formData.otherAccountNumber);
  };
  
  
  console.log("mes formsdata", formData);
  console.log('formdata otherAccountNUmber:', formData.otherAccountNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const transferData = {
      account: formData.account,
      amount: formData.amount,
      same_bank: formData.same_bank,
      other_bank: formData.other_bank,
      other_bank_name: formData.other_bank ? formData.otherBankName : null,
      other_account_number: formData.other_bank ? formData.otherAccountNumber : null,
      effectiveDate: formData.effectiveDate,
      registrationDate: formData.registrationDate,
      type: formData.type,
    };
    axios.post('http://localhost:8080/api/transfers', transferData)
      .then(response => {
        console.log('Transfer successful:', response.data);
        setFormData({
          account: '',
          amount: '',
          same_bank: false,
          other_bank: false,
          otherBankName: '',
          otherAccountNumber: '',
          effectiveDate: '',
          registrationDate: '',
          type: '',
        });
        const transactionData = {
          type: 'Deposit',
          amount: formData.amount,
          id_accounts: formData.account,
          id_category_operation: formData.type,
          effective_date: formData.effectiveDate,
          registration_date: formData.registrationDate,
        };
        axios.post('http://localhost:8080/api/transactions', transactionData)
          .then(response => {
            console.log('Transaction created:', response.data);
          })
          .catch(error => {
            console.error('Error creating transaction:', error);
          });
      })
      .catch(error => {
        console.error('Error transferring funds:', error);
      });
  };
  return (
    <div className="card">
      <Typography variant="h5" className="card-header">
        Nouveau Transfert Bancaire
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel>Numero de votre compte</InputLabel>
              <Select
                name="account"
                value={formData.account}
                onChange={handleChange}
                required
              >
                {accounts.map(account => (
                  <MenuItem key={account.id} value={account.id}>{account.account_number}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="amount"
              label="Montant"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel>Motif du virement</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {types.map(type => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              row
              aria-label="bankChoice"
              name="bankChoice"
              value={formData.same_bank ? 'same' : 'other'}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="same" control={<Radio />} label="Même banque" />
              <FormControlLabel value="other" control={<Radio />} label="Autre banque" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="otherAccountNumber"
              label="Numéro de compte de l'autre banque"
              fullWidth
              value={formData.otherAccountNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          {formData.other_bank && (
            <Grid item xs={12}>
              <TextField
                name="otherBankName"
                label="Nom de l'autre banque"
                fullWidth
                value={formData.otherBankName}
                onChange={handleChange}
              />
            </Grid>
          )}
          
          <Grid item xs={12}>
            <TextField
              name="effectiveDate"
              label="Date de prise d'effet"
              type="datetime-local"
              fullWidth
              value={formData.effectiveDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="registrationDate"
              label="Date d'enregistrement"
              type="datetime-local"
              fullWidth
              value={formData.registrationDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Soumettre
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Transfer;
