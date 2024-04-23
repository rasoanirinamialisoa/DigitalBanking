import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, TextField, Button, Select, MenuItem, Snackbar, InputLabel } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const CategorizationPage = () => {
  const [formData, setFormData] = useState({
    operationDescription: '',
    category: '',
    comment: '',
  });

  const [categories, setCategories] = useState([]);
  const [transactionDescriptions, setTransactionDescriptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get('http://localhost:8080/api/categoryOperations');
        setCategories(categoriesResponse.data);
        const transactionsResponse = await axios.get('http://localhost:8080/api/transactions');
        const transactionsData = transactionsResponse.data;
        const categoryOtherId = categoriesResponse.data.find(category => category.name === 'other')?.id;
        const filteredTransactions = transactionsData.filter(transaction => transaction.id_category_operation === categoryOtherId);
        const transactionDescriptions = filteredTransactions.map(transaction => ({
          id: transaction.id,
          description: transaction.description,
        }));
        setTransactionDescriptions(transactionDescriptions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Erreur lors du chargement des données.');
      }
    }

    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleCategorize = async () => {
    try {
      const { operationDescription, category, comment } = formData;
      console.log('Données du formulaire :', formData);
  
      const selectedTransaction = transactionDescriptions.find(transaction => transaction.description === operationDescription);
      console.log('Transaction sélectionnée :', selectedTransaction);
  
      const transactionId = selectedTransaction.id;
      console.log('ID de la transaction sélectionnée :', transactionId);
      await axios.put(`http://localhost:8080/api/transactions/update-description-message/${transactionId}`, {
        id_category_operation: category,
        description: operationDescription,
        message: comment
      });
      setFormData({
        operationDescription: '',
        category: '',
        comment: '',
      });
      setSnackbarOpen(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('Catégorisation réussie !');
    } catch (error) {
      console.error('Error categorizing operation:', error);
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erreur lors de la catégorisation.');
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div maxWidth="sm" style={{ padding: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Catégorisation des opérations bancaires
      </Typography>
      <Grid container spacing={2} style={{ backgroundColor: '#f5f5f5', marginTop: "1px" }}>
        <Grid item xs={12}>
          <Card raised style={{ backgroundColor: '#fff', padding: 'auto', height: '70px' }}>
            <CardContent>
              <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '10px' }}>
                Catégorisation des opérations bancaires
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Description</InputLabel>
          <Select
            fullWidth
            label="Description de l'opération"
            name="operationDescription"
            value={formData.operationDescription}
            onChange={handleChange}
          >
            {transactionDescriptions.map((transaction, index) => (
              <MenuItem key={index} value={transaction.description}>
                {transaction.description}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Categorie</InputLabel>
          <Select
            fullWidth
            label="Catégorie"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Commentaire"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleCategorize}>
            Catégoriser
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CategorizationPage;
