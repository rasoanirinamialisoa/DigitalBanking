import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const COLORS = ['#00C49F', '#FFBB28', '#A0CED9', '#FF8042'];


  useEffect(() => {
    fetchTransactions();
  }, []);
const fetchTransactions = async () => {
  try {
    const transactionsResponse = await axios.get('http://localhost:8080/api/transactions');
    const categoriesResponse = await axios.get('http://localhost:8080/api/categoryOperations');
    const transactionsData = transactionsResponse.data;
    const categoriesData = categoriesResponse.data;
    console.log("ici cate", categoriesData);

    setTransactions(transactionsData);
    setCategoriesData(categoriesData);
    transactionsData.forEach(transaction => {
      const categoryName = getCategoryName(transaction.id_category_operation);
      console.log(`Category name for transaction ${transaction.id}`);
    });

    categoriesData.forEach(category => {
      console.log(`Category name for category ${category.id}: et nom ${category.name}`);
    })

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



  const groupTransactionsByCategory = (transactions) => {
    const groupedTransactions = {};
    transactions.forEach(transaction => {
      if (!groupedTransactions[transaction.id_category_operation]) {
        groupedTransactions[transaction.id_category_operation] = [];
      }
      groupedTransactions[transaction.id_category_operation].push(transaction);
    });
    return groupedTransactions;
  };

  const getCategoryName = (categoryId) => {
    if (categoriesData.length === 0 || !categoryId) {
      return '';
    }
    const category = categoriesData.find(category => category.id === categoryId);
    return category ? category.name : '';
  };

  const summarizeCategories = () => {
    const groupedTransactions = groupTransactionsByCategory(transactions);
    const summarizedCategories = [];
    Object.keys(groupedTransactions).forEach(categoryId => {
      const transactions = groupedTransactions[categoryId];
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      const categoryName = getCategoryName(categoryId);
      console.log("categoryName:", categoryName);
      summarizedCategories.push({ name: categoryName, value: totalAmount });
    });
    console.log("summarizedCategories:", summarizedCategories);
    return summarizedCategories;
  };




  const sumTransactions = () => {
    const groupedTransactions = groupTransactionsByCategory(transactions);
    const summarizedCategories = [];
    for (const categoryId in groupedTransactions) {
      const transactions = groupedTransactions[categoryId];
      let totalDeposits = 0;
      let totalWithdrawals = 0;
      transactions.forEach(transaction => {
        if (transaction.type === 'Deposit') {
          totalDeposits += transaction.amount;
        } else if (transaction.type === 'retrait') {
          totalWithdrawals += transaction.amount;
        }
      });
      const categoryName = getCategoryName(categoryId);
      summarizedCategories.push({ name: categoryName, dépenses: totalWithdrawals, rentrées: totalDeposits });
    }
    return summarizedCategories;
  };

  return (
    <Grid container spacing={1} style={{ backgroundColor: '#f5f5f5', marginTop: "2px" }}>
      <Grid item xs={12}>
        <Card raised style={{ backgroundColor: '#fff', padding: '2px' }}>
          <CardContent>
            <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 'auto' }}>
              Dashboard
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container xs={6} spacing={2}>
        <Grid item xs={12}>
          <Card raised style={{ backgroundColor: '#fff', padding: '2px' }}>
            <CardContent>
              <Typography variant="h6">Somme des montants par catégorie</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={summarizeCategories()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#e0e0e0"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const entry = categoriesData[index];
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                    return (
                      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                        {`${entry.name}: ${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {summarizeCategories().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item container xs={6} spacing={2}>
        <Grid item xs={12}>
          <Card raised style={{ backgroundColor: '#fff', padding: '15px' }}>
            <CardContent>
              <Typography variant="h6">Dépenses et rentrées d'argent par mois</Typography>
              <BarChart width={500} height={300} data={sumTransactions()}>
                <XAxis dataKey="name" tick={{ stroke: '#ccc' }} />
                <YAxis tick={{ stroke: '#ccc' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="dépenses" name="Dépenses" fill={COLORS[0]} />
                <Bar dataKey="rentrées" name="Rentrées" fill={COLORS[1]} />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
