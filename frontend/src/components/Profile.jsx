import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Navbar from './Navbar';

const Profile = () => {

    const {backendUrl} = useContext(AppContext);
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/auth/profile');
                setUser(response.data.user);
                console.log(response.data);
                (response.data.user);
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 ">
            <Navbar/>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-8 sm:px-8 bg-gradient-to-r from-indigo-500 to-purple-500">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-indigo-500" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                                <p className="text-indigo-100">Account Profile</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8 sm:px-8">
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email Address</p>
                                    <p className="text-white font-medium">{user.email}</p>
                                </div>
                            </div>

                            {/* Account Status */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Account Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${user.isAccountVerified ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                        <p className="text-white font-medium">
                                            {user.isAccountVerified ? 'Verified Account' : 'Pending Verification'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account ID */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Account ID</p>
                                    <p className="text-white font-medium font-mono">{user._id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        {/* <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button 
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium 
                                         hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                         focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                            >
                                Edit Profile
                            </button>
                            <button 
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium 
                                         hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 
                                         focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                            >
                                Change Password
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;