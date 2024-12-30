import React, { useContext } from 'react';
import { PlusCircle, BarChart3, ArrowRight, User } from 'lucide-react';
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
        <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className=" max-w-2xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                {/* Welcome Banner */}
                <div className=" flex flex-col md:flex-row items-center justify-between mb-12 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/30">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="p-3 bg-indigo-500/10 rounded-xl">
                            <User className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-slate-200 text-lg font-medium">
                                Welcome, {userData ? userData.name.toUpperCase() : 'Guest'}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {userData ? 'Manage your expenses efficiently' : 'Sign in to track your expenses'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleNavigate}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors"
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        Smart Financial Management
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
                        Take control of your finances with our intelligent expense tracking system.
                        Monitor spending patterns, set budgets, and achieve your financial goals.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <button
                            onClick={handleAddExpense}
                            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Record Expense</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button onClick={() => navigate('/learn-more')}
 className="w-full sm:w-auto px-8 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-all">
                            Learn More
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Active Users", value: "10K+", color: "from-indigo-500" },
                            { label: "Success Rate", value: "99%", color: "from-purple-500" },
                            { label: "Daily Transactions", value: "50K+", color: "from-pink-500" },
                            { label: "Customer Rating", value: "4.9/5", color: "from-rose-500" }
                        ].map((stat, index) => (
                            <div key={index} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
                                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} to-transparent bg-clip-text text-transparent mb-1`}>
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;