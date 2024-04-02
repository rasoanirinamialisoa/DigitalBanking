// components/AccountStatements.js
import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const AccountStatements = () => {
  // Simulation des données de relevés de compte
  const [statements, setStatements] = useState([
    { date: '2024-03-01', reference: 'REF001', reason: 'Dépôt', credit: 500000, debit: 0, balance: 500000 },
    { date: '2024-03-05', reference: 'REF002', reason: 'Retrait', credit: 0, debit: 200000, balance: 300000 },
    // Ajouter d'autres relevés de compte si nécessaire
  ]);

  return (
    <div className="card">
      <Typography variant="h5" className="card-header">
        Relevés de compte
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Référence</TableCell>
            <TableCell>Motif</TableCell>
            <TableCell>Crédit MGA</TableCell>
            <TableCell>Débit MGA</TableCell>
            <TableCell>Solde</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statements.map((statement, index) => (
            <TableRow key={index}>
              <TableCell>{statement.date}</TableCell>
              <TableCell>{statement.reference}</TableCell>
              <TableCell>{statement.reason}</TableCell>
              <TableCell>{statement.credit}</TableCell>
              <TableCell>{statement.debit}</TableCell>
              <TableCell>{statement.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountStatements;
