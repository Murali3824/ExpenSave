import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { 
  Plus, X, Pencil, Trash2, Search, Calendar, Filter,
  ArrowUp, ArrowDown, AlertCircle, Loader2
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const ExpenseManager = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const initialFormState = {
    amount: "",
    category: "",
    reference: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(initialFormState);
  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Other",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, searchQuery, selectedCategory, startDate, endDate, sortOrder]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/transaction/get-transaction`);
      const expensesData = response.data.data || response.data;
      setExpenses(Array.isArray(expensesData) ? expensesData : []);
    } catch (err) {
      setError("Failed to load expenses");
      console.error("Error fetching expenses:", err);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isEditing
        ? `${backendUrl}/api/transaction/edit-transaction/${editingId}`
        : `${backendUrl}/api/transaction/add-transaction`;
      const method = isEditing ? "put" : "post";
      const response = await axios[method](endpoint, formData);
      if (response.data.success) {
        await fetchExpenses();
        resetForm();
      }
      setError("");
    } catch (err) {
      setError(`Failed to ${isEditing ? "update" : "add"} expense: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      reference: expense.reference || "",
      description: expense.description,
      date: expense.date,
    });
    setEditingId(expense._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await axios.delete(`${backendUrl}/api/transaction/delete-transaction/${id}`);
        if (response.data.success) {
          toast.success("transaction removed")
          await fetchExpenses();
        }
      } catch (err) {
        setError("Failed to delete expense: " + err.message);
      }
    }
  };

  const filterExpenses = () => {
    let filtered = [...expenses];

    if (searchQuery) {
      filtered = filtered.filter(
        (expense) =>
          expense.amount.toString().includes(searchQuery) ||
          expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (expense.reference && expense.reference.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((expense) => expense.category === selectedCategory);
    }

    if (startDate) {
      filtered = filtered.filter((expense) => new Date(expense.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((expense) => new Date(expense.date) <= new Date(endDate));
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredExpenses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Navbar/>
      <div className="max-w-6xl 2xl:max-w-screen-xl mx-auto px-4 md:px-20 2xl:px-5 py-8 pt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Expense
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expenses..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
          {error && (
            <div className="flex items-center gap-2 mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No expenses found
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600"
                >
                  Sort by Date
                  {sortOrder === 'desc' ? (
                    <ArrowDown className="w-4 h-4" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </button>
              </div>

              {filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="group flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-white">
                        ₹{Number(expense.amount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                        {expense.category}
                      </span>
                    </div>
                    <p className="text-slate-300 w-48 truncate mb-1">{expense.description}</p>
                    {expense.reference && (
                      <p className="text-white font-medium w-20 text-sm">Ref: {expense.reference}</p>
                    )}
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(expense.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Expense Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-lg mx-4">
            <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">
                  {isEditing ? "Edit Expense" : "Add New Expense"}
                </h2>
                <button
                  type="button"
                  onClick={resetForm}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Reference
                    </label>
                    <input
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isEditing ? "Updating..." : "Saving..."}</span>
                    </>
                  ) : (
                    <span>{isEditing ? "Update Expense" : "Save Expense"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-slate-800 rounded-lg shadow-lg px-8 p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Total Expenses</div>
          <div className="text-2xl font-bold text-white">
            ₹{filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
          <div className="text-slate-400 text-sm mt-1">
            {filteredExpenses.length} transactions
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;