import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { HandCoins, X, Plus, Pencil, Trash } from 'lucide-react';
import { useNavigate } from "react-router-dom";


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

  // States for Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    // Filter expenses based on selected filters and search query
    filterExpenses();
  }, [expenses, searchQuery, selectedCategory, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/transaction/get-transaction`
      );
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
    setFormData((prev) => ({
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
    setLoading(true); // Set loading to true before making the API call
    try {
      const endpoint = isEditing
        ? `${backendUrl}/api/transaction/edit-transaction/${editingId}`
        : `${backendUrl}/api/transaction/add-transaction`;
  
      const method = isEditing ? "put" : "post";
  
      const response = await axios[method](endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.success) {
        await fetchExpenses();
        resetForm();
      }
      setError("");
    } catch (err) {
      setError(
        `Failed to ${isEditing ? "update" : "add"} expense: ${err.message}`
      );
      console.error("Error:", err);
    } finally {
      setLoading(false); // Set loading back to false after the API call finishes
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
    try {
      const response = await axios.delete(
        `${backendUrl}/api/transaction/delete-transaction/${id}`
      );
      if (response.data.success) {
        await fetchExpenses();
      }
    } catch (err) {
      setError("Failed to delete expense: " + err.message);
      console.error("Error deleting expense:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const filterExpenses = () => {
    let filtered = expenses;

    if (searchQuery) {
      filtered = filtered.filter(
        (expense) =>
          expense.amount.toString().includes(searchQuery) ||
          expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expense.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (expense.reference &&
            expense.reference.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (expense) => expense.category === selectedCategory
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (expense) => new Date(expense.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (expense) => new Date(expense.date) <= new Date(endDate)
      );
    }

    setFilteredExpenses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="mx-auto px-4 md:px-14 lg:px-24 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-full animate-pulse">
              <HandCoins className="text-indigo-400 w-10 h-10" />
            </div>
            <span className="text-white text-3xl font-semibold tracking-wider">
              ExpenSave
            </span>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border rounded-full hover:shadow-2xl hover:border-transparent"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-400 group-hover:translate-x-0 ease">
                <Plus className="w-5 h-5" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                Add Expense
              </span>
              <span className="relative invisible">Add Expense</span>
            </button>
          )}
        </div>

        {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-md z-50">
              <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">
                  {isEditing ? "Edit Expense" : "Add New Expense"}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-400"
                    required
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring focus:ring-indigo-400"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    placeholder="Reference"
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-400"
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring focus:ring-indigo-400"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-400"
                    required
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    {isEditing ? "Update" : "Save"} Expense
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

        <div className="backdrop-blur-sm rounded-xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search expenses..."
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400"
            />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-400"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-400"
              />
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
                className="p-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          


          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading expenses...</div>
          ) : filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No expenses found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-white">
                        ₹ {Number(expense.amount).toFixed(2)}
                      </span>
                      <span className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-full">
                        {expense.category}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-300">
                      {expense.description}
                      {expense.reference && (
                        <span className="ml-2 text-gray-400">Ref: {expense.reference}</span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors duration-200"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
