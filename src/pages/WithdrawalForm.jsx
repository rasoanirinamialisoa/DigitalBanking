// components/WithdrawalForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const WithdrawalForm = () => {
  const [formData, setFormData] = useState({
    account: '',
    amount: '',
    date: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données du formulaire au backend
    console.log(formData);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Retrait d'argent et compte à découvert
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Choisir un compte</InputLabel>
              <Select
                name="account"
                value={formData.account}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Compte 1</MenuItem>
                <MenuItem value="2">Compte 2</MenuItem>
                {/* Ajouter d'autres comptes si nécessaire */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="amount"
              label="Montant à retirer"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="date"
              label="Date du retrait"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Retirer
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default WithdrawalForm;
