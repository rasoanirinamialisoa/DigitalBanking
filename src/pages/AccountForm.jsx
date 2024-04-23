import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
  IconButton,
  SnackbarContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AccountForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    monthlySalary: '',
    accountNumber: '',
    email: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Données du formulaire soumises :', formData);

      const userResponse = await axios.post('http://localhost:8080/api/users', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        birth_date: formData.dateOfBirth,
        monthly_salary: formData.monthlySalary,
        email: formData.email,
        password: formData.password,
      });

      const userId = userResponse.data.id;
      console.log('ID de l\'utilisateur créé :', userId);

      const accountData = {
        account_number: formData.accountNumber,
        balance: formData.monthlySalary,
        user_id: userId,
        type_id: 1,
        allows_overdraft: false,
        overdraft_credit_percentage: 0.0,
        interest_rate_7_days: 0.0,
        interest_rate_after_7_days: 0.0,
      };

      console.log('Données saisies pour la création du compte :', accountData);

      const accountResponse = await axios.post('http://localhost:8080/api/accounts', accountData);

      if (accountResponse.status === 200) {
        console.log('Compte créé avec succès !');

        const accountId = accountResponse.data.id;
        console.log('ID du compte créé :', accountId);
        console.log('ID de l\'utilisateur passée en lien :', userId);

        await axios.put(`http://localhost:8080/api/users/${userId}/account`, {
          id_accounts: accountId,
        });

        console.log('ID de compte ajouté à l\'utilisateur avec succès !');

        // Affichage de l'alerte Snackbar
        setSnackbarOpen(true);
        setSnackbarMessage('Compte créé avec succès !');
        setSnackbarSeverity('success');

        // Réinitialiser les données du formulaire après la soumission réussie
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          monthlySalary: '',
          accountNumber: '',
          email: '',
          password: '',
        });
      } else {
        console.error('Erreur lors de la création du compte:', accountResponse.data);
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur et du compte:', error);
      alert('Erreur lors de la création de l\'utilisateur et du compte.');
    }
  };

  return (
    <div maxWidth="sm" style={{ padding: '50px' }}>
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
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Mot de passe"
              fullWidth
              value={formData.password}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarContent
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }}
        />
      </Snackbar>
    </div>
  );
};

export default AccountForm;