import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Home, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-dark-border px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    AIChatBot
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <LayoutDashboard size={20} />
                                    <span>Admin</span>
                                </Link>
                            )}
                            <div className="flex items-center gap-4 border-l border-dark-border pl-6">
                                <span className="flex items-center gap-2 text-text-secondary">
                                    <User size={18} />
                                    {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="p-2 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
                            <Link to="/register" className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg transition-colors">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
