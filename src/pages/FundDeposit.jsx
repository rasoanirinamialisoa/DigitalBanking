import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Snackbar, Box, Alert } from '@mui/material';
import '../assets/Deposit.css';

function DepositForm() {
	const [amount, setAmount] = useState('');
	const [effectiveDate, setEffectiveDate] = useState('');
	const [registrationDate, setRegistrationDate] = useState('');
	const [categoryOperations, setCategoryOperations] = useState([]);
	const [selectedCategoryOperation, setSelectedCategoryOperation] = useState('');
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState('');
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('info');

	useEffect(() => {
		fetchCategoryOperations();
		fetchAccounts();
	}, []);

	const fetchCategoryOperations = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/categoryOperations');
			setCategoryOperations(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des opérations de catégorie :', error);
		}
	};

	const fetchAccounts = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/accounts');
			setAccounts(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des comptes :', error);
		}
	};

	const resetForm = () => {

		setAmount('');
		setEffectiveDate('');
		setRegistrationDate('');
		setSelectedCategoryOperation('');
		setSelectedAccount('');
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const categoryOperationId = categoryOperations.find(operation => operation.name === selectedCategoryOperation)?.id;
			const accountId = accounts.find(account => account.account_number === selectedAccount)?.id;

			const response = await axios.post('http://localhost:8080/api/transactions', {
				type: 'Deposit',
				amount,
				id_accounts: accountId,
				id_category_operation: categoryOperationId,
				effective_date: effectiveDate,
				registration_date: registrationDate
			});
			setSnackbarMessage('Dépôt réussi!');
			setSnackbarSeverity('success');
			setSnackbarOpen(true);
			resetForm();
		} catch (error) {
			setSnackbarMessage('Le dépôt a échoué!');
			setSnackbarSeverity('error');
			setSnackbarOpen(true);
			console.error('Erreur lors de l\'approvisionnement:', error);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<div maxWidth="sm" style={{ padding: '50px' }}>
			<Typography variant="h4" gutterBottom>
				Approvisionnement de solde
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Montant"
							type="number"
							value={amount}
							onChange={e => setAmount(e.target.value)}
							fullWidth
							required
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<InputLabel>Compte</InputLabel>
							<Select
								value={selectedAccount}
								onChange={e => setSelectedAccount(e.target.value)}
								required
							>
								<MenuItem value="">
									<em>Sélectionner un compte</em>
								</MenuItem>
								{accounts.map(account => (
									<MenuItem key={account.id} value={account.account_number}>
										{account.account_number}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<InputLabel>Motif</InputLabel>
							<Select
								value={selectedCategoryOperation}
								onChange={e => setSelectedCategoryOperation(e.target.value)}
								required
							>
								<MenuItem value="">
									<em>Sélectionner un motif</em>
								</MenuItem>
								{categoryOperations.map(operation => (
									<MenuItem key={operation.id} value={operation.name}>
										{operation.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Date de prise d'effet"
							type="datetime-local"
							value={effectiveDate}
							onChange={e => setEffectiveDate(e.target.value)}
							fullWidth
							required
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Date d'enregistrement"
							type="datetime-local"
							value={registrationDate}
							onChange={e => setRegistrationDate(e.target.value)}
							fullWidth
							required
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="center">
							<Button type="submit" variant="contained" color="primary" style={{ width: '20%' }}>
								Approvisionner
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default DepositForm;
