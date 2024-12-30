import express from 'express';
import userAuth from '../middleware/userAuth.js'
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from '../controlllers/transactionController.js';

const transactionRouters = express.Router();

transactionRouters.post('/add-transaction',userAuth, addTransaction);
transactionRouters.get('/get-transaction',userAuth, getTransactions);
transactionRouters.delete('/delete-transaction/:id',userAuth, deleteTransaction); 
transactionRouters.put('/edit-transaction/:id',userAuth, editTransaction);


export default transactionRouters;