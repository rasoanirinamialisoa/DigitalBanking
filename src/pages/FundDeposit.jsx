// components/FundDeposit.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const FundDeposit = () => {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    effectiveDate: '',
    registrationDate: '',
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
    <div className="card">
      <Typography variant="h5" className="card-header">
        Approvisionnement de solde
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="amount"
              label="Montant"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="reason"
              label="Motif du virement"
              fullWidth
              value={formData.reason}
              onChange={handleChange}
              required
              className="form-control"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="effectiveDate"
              label="Date de prise d'effet"
              type="date"
              fullWidth
              value={formData.effectiveDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              className="form-control"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="registrationDate"
              label="Date d'enregistrement"
              type="date"
              fullWidth
              value={formData.registrationDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              className="form-control"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="button">
              Approvisionner
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FundDeposit;
