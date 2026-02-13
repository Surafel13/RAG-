import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
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
                    <h2 className="text-3xl font-bold mb-2">Join AIChatBot</h2>
                    <p className="text-text-secondary text-sm">Create an account to start using the AI widget</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

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
                        className="w-full bg-primary hover:bg-primary-hover py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6 text-text-secondary text-sm">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
