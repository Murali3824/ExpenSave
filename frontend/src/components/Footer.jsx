import React from 'react';
import { Github, Twitter, Linkedin, Mail,HandCoins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4  py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2 md:ml-16">
                    <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-1 sm:gap-3">
                        <div className="bg-indigo-500/20 p-2 rounded-full animate-pulse">
                            <HandCoins className="text-indigo-400 w-9 h-9 sm:w-10 sm:h-10" />
                        </div>
                        <span className="text-white text-3xl font-semibold tracking-wider">
                            ExpenSave
                        </span>
                    </div>
                        <p className="text-slate-400  mt-5 mb-6">Track, analyze, and optimize your expenses with our powerful financial management platform.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800">
                    <p className="text-slate-400 text-sm text-center">
                        © {year} ExpenSave. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;