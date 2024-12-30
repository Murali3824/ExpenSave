import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reference: {  
        type: String
    },
    description: {  
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
});

const transactionModel = mongoose.model('Transaction', transactionSchema);

export default transactionModel;