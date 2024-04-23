import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const AccountStatements = () => {
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const transactionsResponse = await axios.get('http://localhost:8080/api/transactions');
      const accountsResponse = await axios.get('http://localhost:8080/api/accounts');
      const categoryOperationsResponse = await axios.get('http://localhost:8080/api/categoryOperations');
      
      const transactionsData = transactionsResponse.data;
      const accountsData = accountsResponse.data.reduce((acc, curr) => {
        acc[curr.id] = curr.balance;
        return acc;
      }, {});
      const categoryOperationsData = categoryOperationsResponse.data.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      }, {});

      const formattedStatements = transactionsData.map(transaction => ({
        date: transaction.effective_date,
        reference: transaction.id,
        reason: categoryOperationsData[transaction.id_category_operation],
        credit: transaction.type === 'Deposit' ? transaction.amount : 0,
        debit: transaction.type === 'retrait' ? transaction.amount : 0,
        balance: accountsData[transaction.id_accounts]
      }));
      formattedStatements.sort((a, b) => new Date(b.date) - new Date(a.date));

      setStatements(formattedStatements);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="card">
      <Typography variant="h5" className="card-header">
        Relevés de compte
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date d'opération</TableCell>
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
