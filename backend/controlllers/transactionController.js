import TransactionModel from '../models/transactionModel.js';

// Add a new transaction
export const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, reference, description, date } = req.body;
        
        if (!amount || !category || !description || !date) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        const newTransaction = new TransactionModel({
            userId,
            amount,
            category,
            reference,
            description,
            date
        });

        await newTransaction.save();
        
        res.status(201).json({
            success: true,
            message: "Transaction Created",
            data: newTransaction
        });
    } catch (err) {
        console.error('Add transaction error:', err);
        res.status(500).json({
            success: false,
            error: err.message || 'Server Error'
        });
    }
};

// Get all transactions
export const getTransactions = async (req, res) => {
    try {
        const { userId } = req.body;

        const transactions = await TransactionModel.find({ userId }).sort({ date: -1 });
        res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (err) {
        console.error('Get transactions error:', err);
        res.status(500).json({
            success: false,
            error: err.message || 'Server Error'
        });
    }
};

// Edit a transaction
export const editTransaction = async (req, res) => {
    try {
        const { amount, category, reference, description, date } = req.body;
        
        if (!amount || !category || !description || !date) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
            req.params.id,
            {
                amount,
                category,
                reference,
                description,
                date
            },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transaction updated successfully',
            data: updatedTransaction
        });
    } catch (err) {
        console.error('Edit transaction error:', err);
        res.status(500).json({
            success: false,
            error: err.message || 'Server Error'
        });
    }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await TransactionModel.findById(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        await TransactionModel.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    } catch (err) {
        console.error('Delete transaction error:', err);
        res.status(500).json({
            success: false,
            error: err.message || 'Server Error'
        });
    }
};