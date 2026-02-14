import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Home, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-dark-border px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative z-50">
                    AIChatBot
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-primary z-50 p-2 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
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

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 glass-morphism border-b border-dark-border py-4 px-6 md:hidden flex flex-col gap-4 shadow-xl"
                        >
                            <Link
                                to="/"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-2 py-3 border-b border-white/5 hover:text-primary transition-colors"
                            >
                                <Home size={20} />
                                <span>Home</span>
                            </Link>

                            {user ? (
                                <>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 py-3 border-b border-white/5 hover:text-primary transition-colors"
                                        >
                                            <LayoutDashboard size={20} />
                                            <span>Admin Dashboard</span>
                                        </Link>
                                    )}
                                    <div className="py-3 border-b border-white/5">
                                        <div className="flex items-center gap-2 text-text-secondary mb-2">
                                            <User size={18} />
                                            <span>Signed in as {user.name}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMobileMenu();
                                        }}
                                        className="flex items-center gap-2 py-3 text-red-400 hover:text-red-300 transition-colors w-full text-left"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 mt-2">
                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="text-center py-2 hover:text-primary transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="bg-primary hover:bg-primary-hover text-center py-3 rounded-lg transition-colors font-medium"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
