import React, { useContext } from 'react';
import { PlusCircle, BarChart3, ChevronRight, User, Clock, Wallet, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(userData ? '/dashboard' : '/login');
    };

    const handleAddExpense = () => {
        navigate(userData ? '/add-expenses' : '/login');
    };

    return (
        <div className=" max-w-5xl 2xl:max-w-6xl  mt-28 ">
            {/* Decorative gradient blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-10 blur-3xl pointer-events-none" />
            
            {/* Main content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Top Navigation Bar */}
                <div className="mt-5 2xl:mt-10 flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-lg rounded-2xl mb-16 border border-slate-700/30">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Welcome back</p>
                            <h3 className="text-lg font-medium text-white">
                                {userData ? userData.name : 'Guest User'}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={handleNavigate}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all"
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span className="">Dashboard</span>
                    </button>
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                            Track Expenses,
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Achieve Goals
                            </span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-8">
                            Your personal finance companion that helps you track expenses, 
                            analyze spending patterns, and make smarter financial decisions.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddExpense}
                                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all"
                            >
                                <PlusCircle className="w-5 h-5" />
                                <span>Record Expense</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => document.getElementById('learn-more').scrollIntoView({ behavior: 'smooth' })}
                                className="px-6 py-3 bg-slate-800/50 text-white rounded-xl hover:bg-slate-800 transition-all border border-slate-700"
                            >
                                Learn More
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
                            {[
                                { icon: Clock, label: "Time Saved", value: "300+hrs" },
                                { icon: Wallet, label: "Money Tracked", value: "₹10M+" },
                                { icon: PieChart, label: "Insights", value: "100K+" }
                            ].map((stat, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                                        <stat.icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">{stat.value}</p>
                                        <p className="text-sm text-slate-400">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                title: "Smart Tracking",
                                description: "Automatically categorize and track your daily expenses",
                                gradient: "from-blue-500/20 to-blue-600/20"
                            },
                            {
                                title: "Visual Reports",
                                description: "Get detailed insights with interactive charts and graphs",
                                gradient: "from-purple-500/20 to-purple-600/20"
                            },
                            {
                                title: "Budget Planning",
                                description: "Set and manage budgets with smart notifications",
                                gradient: "from-pink-500/20 to-pink-600/20"
                            },
                            {
                                title: "Secure Data",
                                description: "Your financial data is encrypted and secure",
                                gradient: "from-indigo-500/20 to-indigo-600/20"
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-slate-700/30 backdrop-blur-lg`}
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;