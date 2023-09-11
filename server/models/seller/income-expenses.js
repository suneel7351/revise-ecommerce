import { Schema, model } from 'mongoose';

const incomeExpensesSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller', // Reference to your Seller model
    required: true,
  },
  income: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const IncomeExpenses = model('IncomeExpenses', incomeExpensesSchema);

export default IncomeExpenses;
