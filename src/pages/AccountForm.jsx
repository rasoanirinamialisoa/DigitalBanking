// components/AccountForm.js
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

const AccountForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    monthlySalary: '',
    accountNumber: '',
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
        Création et modification des informations d'un compte
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="Prénom(s)"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Nom"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dateOfBirth"
              label="Date de naissance"
              type="date"
              fullWidth
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="monthlySalary"
              label="Salaire mensuel net"
              type="number"
              fullWidth
              value={formData.monthlySalary}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="accountNumber"
              label="Numéro de compte unique"
              fullWidth
              value={formData.accountNumber}
              onChange={handleChange}
              required
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

export default AccountForm;
