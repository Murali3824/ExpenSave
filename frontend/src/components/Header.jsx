import React, { useContext } from 'react';
import { ImagePlus, PieChart, UserCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import NavLink
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Header = () => {

    const { userData } = useContext(AppContext)

    const navigate = useNavigate();

    const handleAddExpense = () => {
        if (userData) {
            navigate("/add-expenses");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative pt-16 min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-gradient-to-b from-transparent via-transparent to-zinc-900/50" />

            <div className="relative flex flex-col items-center justify-center px-4 py-24">
                {/* Profile Section */}
                <div className="relative mb-8">
                    <div className="relative">
                        <img
                            src={assets.header_img}
                            alt="User Profile"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-zinc-700/50 transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-400 to-blue-500 p-2 rounded-full animate-pulse">
                            <ImagePlus className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full max-w-3xl space-y-6 text-center px-4">
                    {/* Greeting */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/30 backdrop-blur-sm">
                        <UserCircle className="text-indigo-400 w-6 h-6" />
                        <span className="text-zinc-200 font-medium">
                            Welcome back, {userData ? userData.name : "User"}
                        </span>
                        <span className="text-2xl animate-wave">👋</span>
                    </div>
                    {/* Welcome Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-800/50 rounded-full border border-emerald-700/30 backdrop-blur-sm">
                        <PieChart className="text-emerald-400 w-5 h-5" />
                        <span className="text-emerald-100 font-medium">
                            Your Financial Dashboard
                        </span>
                    </div>
                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400">
                            Smart Money Management
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Track, analyze, and optimize your expenses with our intelligent expense
                        management system. Take control of your financial future today.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={handleAddExpense}
                            className="group relative px-8 py-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                        >
                            Add New Expense
                            <ChevronRight className="inline-block w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button className="px-8 py-3 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors duration-300">
                            Learn More
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
                        {[
                            { label: "Active Users", value: "10K+" },
                            { label: "Countries", value: "50+" },
                            { label: "Success Rate", value: "99%" }
                        ].map((stat, index) => (
                            <div key={index} className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/30 backdrop-blur-sm">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-zinc-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;