import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-morphism p-8 rounded-2xl border border-white/10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-text-secondary text-sm">Sign in to access the AI Chatbot</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-text-secondary text-sm">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
