// components/ProtectedRoute.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedin } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/login');
        }
    }, [isLoggedin, navigate]);

    // Show loading state while checking auth
    if (!isLoggedin) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-200">Checking authorization...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;