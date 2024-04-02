import React from 'react';
import axios from 'axios';
import { modalContainerStyle, modalStyle } from '../assets/withdrawalForm';

function ShowRegistrationForm({ registrationData, handleInputChange, handleRegistrationSubmit, selectedAccount }) {
    const createUserAndAccount = async () => {
        try {
            // Créer l'utilisateur
            console.log('Données saisies pour la création de l\'utilisateur :', registrationData);
            const userResponse = await axios.post('http://localhost:8080/api/users', {
                first_name: registrationData.name,
                last_name: registrationData.lastName,
                birth_date: registrationData.birthDate,
                monthly_salary: registrationData.salary,
                email: registrationData.email,
                password: registrationData.password,
            });
        
            const userId = userResponse.data.id;
            console.log('ID de l\'utilisateur créé :', userId);
        
            // Créer le compte associé à l'utilisateur
            const accountData = {
                account_number: registrationData.accountNumber,
                balance: registrationData.salary,
                user_id: userId,
                type_id: 1,
                allows_overdraft: false,
                overdraft_credit_percentage: 0.0,
                interest_rate_7_days: 0.0,
                interest_rate_after_7_days: 0.0,
            };
            console.log('Données saisies pour la création du compte :', accountData);
        
            const accountResponse = await axios.post('http://localhost:8080/api/accounts', accountData);
        
            // Vérifier la réponse de la création du compte
            if (accountResponse.status === 200) {
                console.log('Compte créé avec succès !');
                
                // Récupérer l'accountId
                const accountId = accountResponse.data.id;
                console.log('ID du compte créé :', accountId);
                
                // Mettre à jour l'utilisateur avec l'accountId
                await axios.put(`http://localhost:8080/api/users/updateAccountId/${accountId}`, {
                    id_accounts: accountId,
                });
                
                // Réinitialiser les données du formulaire après la soumission réussie
                handleRegistrationSubmit();
            } else {
                console.error('Erreur lors de la création du compte:', accountResponse.data);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur et du compte:', error);
        }
    };
    
    
    

    return (
        <div style={modalContainerStyle}>
            <div style={{ ...modalStyle, flexDirection: 'column', alignItems: 'center' }}>
                <h2>Registration Form for Account {selectedAccount}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createUserAndAccount();
                }} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="name" style={{ marginBottom: '5px' }}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={registrationData.name}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="lastName" style={{ marginBottom: '5px' }}>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={registrationData.lastName}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="birthDate" style={{ marginBottom: '5px' }}>Birth Date:</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={registrationData.birthDate}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="salary" style={{ marginBottom: '5px' }}>Monthly Salary:</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            value={registrationData.salary}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="email" style={{ marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={registrationData.email}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="password" style={{ marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={registrationData.password}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor="accountNumber" style={{ marginBottom: '5px' }}>Account Number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            value={registrationData.accountNumber}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>

                    <button type="submit" style={{ width: '100%' }}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default ShowRegistrationForm;
