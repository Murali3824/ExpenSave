import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedin, loading } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set mounted on initial load
        setMounted(true);

        // Handle authentication check and navigation
        if (!loading) {
            if (!isLoggedin) {
                navigate('/login', {
                    replace: true,
                    state: { from: location.pathname }
                });
            }
        }

        // Cleanup
        return () => setMounted(false);
    }, [isLoggedin, loading, navigate, location]);

    // Initial loading state
    if (loading || !mounted) {
        return (
            <div className="fixed inset-0 w-full min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-200">Loading...</p>
                </div>
            </div>
        );
    }

    // Render children only when authenticated and mounted
    return isLoggedin ? (
        <div className="min-h-screen bg-slate-900">
            {children}
        </div>
    ) : null;
};

export default ProtectedRoute;