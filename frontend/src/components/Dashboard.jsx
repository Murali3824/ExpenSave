import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HandCoins, TrendingUp, Calendar, Filter } from 'lucide-react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Dashboard = () => {
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeFilter, setTimeFilter] = useState('all');
    const [viewType, setViewType] = useState('category');
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/api/transaction/get-transaction`);
            const transactionsData = response.data.data || response.data;
            setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
        } catch (err) {
            setError("Failed to load transactions");
            console.error("Error fetching transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    const filterTransactionsByTime = (transactions) => {
        const now = new Date();
        const lastWeekDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last week
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Last month
        const startOfYear = new Date(now.getFullYear(), 0, 1); // Start of the year
        const lastTwoWeeks = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000); // Last 2 weeks
        const lastThreeWeeks = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000); // Last 3 weeks
        const lastTwoMonths = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate()); // Last 2 months
        const lastThreeMonths = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()); // Last 3 months
        const lastSixMonths = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()); // Last 6 months

        switch (timeFilter) {
            case 'today':
                return transactions.filter(t => new Date(t.date).toDateString() === now.toDateString());
            case 'week':
                return transactions.filter(t => new Date(t.date) >= lastWeekDate);
            case 'month':
                return transactions.filter(t => new Date(t.date) >= lastMonthDate);
            case 'year':
                return transactions.filter(t => new Date(t.date) >= startOfYear);
            case '2weeks':
                return transactions.filter(t => new Date(t.date) >= lastTwoWeeks);
            case '3weeks':
                return transactions.filter(t => new Date(t.date) >= lastThreeWeeks);
            case '2months':
                return transactions.filter(t => new Date(t.date) >= lastTwoMonths);
            case '3months':
                return transactions.filter(t => new Date(t.date) >= lastThreeMonths);
            case '6months':
                return transactions.filter(t => new Date(t.date) >= lastSixMonths);
            default:
                return transactions;
        }
    };

    const processExpensesByCategory = (transactions) => {
        const categoryTotals = {};
        transactions.forEach(transaction => {
            if (categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] += transaction.amount;
            } else {
                categoryTotals[transaction.category] = transaction.amount;
            }
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
            count: transactions.filter(t => t.category === name).length
        }));
    };

    const processExpensesByDay = (transactions) => {
        const dayTotals = {};
        transactions.forEach(transaction => {
            const day = new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'long' });
            if (dayTotals[day]) {
                dayTotals[day] += transaction.amount;
            } else {
                dayTotals[day] = transaction.amount;
            }
        });
        return Object.entries(dayTotals).map(([name, value]) => ({ name, value }));
    };

    const getFilteredTransactions = () => filterTransactionsByTime(transactions);

    const getCategoryBoxes = () => {
        const filteredTransactions = getFilteredTransactions();
        const categoryData = processExpensesByCategory(filteredTransactions);
        const totalAmount = categoryData.reduce((sum, cat) => sum + cat.value, 0);

        return categoryData.map((category, index) => ({
            ...category,
            percentage: ((category.value / totalAmount) * 100).toFixed(1),
            color: COLORS[index % COLORS.length]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-200">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const filteredTransactions = getFilteredTransactions();
    const categoryBoxes = getCategoryBoxes();
    const totalSpent = categoryBoxes.reduce((sum, cat) => sum + cat.value, 0);
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
            <Navbar />
            <div className="max-w-6xl 2xl:max-w-screen-xl mx-auto px-4 pb-20 md:px-20 2xl:px-5 py-8">
                {/* Filters Section */}
                <div className="flex gap-4 mt-24 mb-8">
                    <div className="relative flex-1 max-w-xs">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg
                                     text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                     appearance-none cursor-pointer"
                        >
                            <option value="all" className="bg-slate-800">All Time</option>
                            <option value="today" className="bg-slate-800">Today</option>
                            <option value="week" className="bg-slate-800">Last Week</option>
                            <option value="2weeks" className="bg-slate-800">Last 2 Weeks</option>
                            <option value="month" className="bg-slate-800">Last Month</option>
                            <option value="3months" className="bg-slate-800">Last 3 Months</option>
                            <option value="6months" className="bg-slate-800">Last 6 Months</option>
                            <option value="year" className="bg-slate-800">This Year</option>
                        </select>
                    </div>

                    <div className="relative flex-1 max-w-xs">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg
                                     text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                     appearance-none cursor-pointer"
                        >
                            <option value="category" className="bg-slate-800">Category View</option>
                            <option value="day" className="bg-slate-800">Daily View</option>
                        </select>
                    </div>
                </div>

                {/* Total Spending Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 mb-8 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-lg">
                            <HandCoins className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-indigo-100">Total Spending</h2>
                            <p className="text-2xl font-bold text-white">₹{totalSpent.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                
                {/* Category Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {categoryBoxes.map((category, index) => (
                        <div
                            key={category.name}
                            className="bg-white/5 p-4  sm:p-6 rounded-xl backdrop-blur-sm border border-white/10"
                            style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                <h3 className="font-medium text-white">{category.name}</h3>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-2xl font-bold text-white">₹{category.value.toFixed(2)}</p>
                                    <p className="text-sm text-slate-400">{category.count} transactions</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium" style={{ color: category.color }}>
                                        {category.percentage}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">
                        {viewType === 'category' ? 'Spending by Category' : 'Daily Spending Distribution'}
                    </h2>
                    <ResponsiveContainer width="100%" height={450}>
                        <PieChart>
                            <Pie
                                data={viewType === 'category' ?
                                    processExpensesByCategory(filteredTransactions) :
                                    processExpensesByDay(filteredTransactions)
                                }
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={isSmallScreen ? 100 : 150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {processExpensesByCategory(filteredTransactions).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#e2e8f0',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: '#e2e8f0'
                                }}
                            />
                            <Legend 
                                formatter={(value) => <span className="text-slate-200">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
