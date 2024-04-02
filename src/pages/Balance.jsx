// components/Balance.js
import React from 'react';
import { Typography, Grid } from '@mui/material';

const Balance = () => {
  // Simulation de données de solde
  const balanceData = {
    principal: 5000,
    loans: 1000,
    interest: 50,
  };

  return (
    <div className="card">
      <Typography variant="h5" className="card-header">
        Consultation de solde
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">
            Solde principal: {balanceData.principal} Ar
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">
            Prêts: {balanceData.loans} Ar
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">
            Intérêts des prêts: {balanceData.interest} Ar
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Balance;
