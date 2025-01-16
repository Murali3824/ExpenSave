import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Wallet, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const LearnMore = () => {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext);

    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <div id="learn-more" className="mt-4 min-h-screen w-full  text-white">
            <div className="max-w-6xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="flex flex-col justify-center items-center text-center max-w-4xl mx-auto mt-10 mb-16">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        Master Your Finances with ExpenSave
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
                        Take control of your financial journey with powerful expense tracking, insightful analytics, and smart budgeting tools.
                    </p>
                    {!userData && (
                        <button
                            onClick={handleNavigate}
                            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all"
                        >
                            <span>Get Started Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            icon: <Wallet className="w-6 h-6" />,
                            title: "Expense Tracking",
                            description: "Log and categorize your expenses effortlessly. Track every transaction in real-time."
                        },
                        {
                            icon: <PieChart className="w-6 h-6" />,
                            title: "Visual Analytics",
                            description: "Understand your spending patterns with intuitive charts and detailed breakdowns."
                        },
                        {
                            icon: <TrendingUp className="w-6 h-6" />,
                            title: "Budget Planning",
                            description: "Set smart budgets and financial goals. Stay on track with regular progress updates."
                        },
                        {
                            icon: <Shield className="w-6 h-6" />,
                            title: "Secure Platform",
                            description: "Your financial data is protected with enterprise-grade security measures."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                            <div className="bg-indigo-500/20 w-12 h-12 flex items-center justify-center rounded-lg mb-4 text-indigo-400">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-slate-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                        <h2 className="text-2xl font-bold mb-6">Why Choose ExpenSave?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                <p className="text-slate-300">Comprehensive expense tracking with categorization</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                <p className="text-slate-300">Advanced analytics and visualization tools</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                <p className="text-slate-300">Smart budgeting recommendations based on spending patterns</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                                <p className="text-slate-300">Regular insights and financial reports</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                        <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">1. Create Your Account</h3>
                                <p className="text-slate-400">Sign up in seconds with just your email address</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">2. Add Your Expenses</h3>
                                <p className="text-slate-400">Start logging your transactions and categorizing them</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">3. Track Your Progress</h3>
                                <p className="text-slate-400">Monitor your spending patterns and adjust your budget</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnMore;