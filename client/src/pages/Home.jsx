import { motion } from 'framer-motion';
import { Bot, Shield, Zap, Sparkles, MessageCircle, FileSearch, ArrowRight } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';

const Home = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-primary-light text-sm mb-8"
                    >
                        <Sparkles size={16} className="text-yellow-400" />
                        <span>AI-Powered Knowledge Retrieval</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                    >
                        Your Website's Intelligence <br /> <span className="text-primary">Supercharged</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-text-secondary max-w-3xl mx-auto mb-10"
                    >
                        Empower your users with an AI assistant that actually knows your business.
                        Upload documents, index your site, and let RAG technology provide instant, accurate answers.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button className="bg-primary hover:bg-primary-hover px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2">
                            Start Building <ArrowRight size={20} />
                        </button>
                        <button className="glass-morphism px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                            Watch Demo
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="services" className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-text-secondary">Everything you need to deploy a high-performance AI agent.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileSearch className="text-blue-400" />}
                            title="Advanced RAG"
                            description="Retrieval-Augmented Generation ensures your AI only answers based on provided documents, reducing hallucinations."
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-400" />}
                            title="Instant Indexing"
                            description="Upload PDFs or text files and see them indexed for AI search in seconds with high-dimensional embeddings."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-400" />}
                            title="Secure & Private"
                            description="Role-based access control and secure JWT authentication keep your knowledge base and user data safe."
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6">Built for Modern Businesses</h2>
                        <p className="text-text-secondary text-lg mb-6">
                            Stop making your customers search through endless FAQ pages. Our AI chatbot provides natural language answers
                            instantly, saving support time and improving user satisfaction.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                                <span>99% Reduction in Support Tickets</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                                <span>24/7 Instant Response Time</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                                <span>Easy Integration with One Line of Code</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="glass-morphism p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Bot size={200} className="mx-auto text-primary opacity-50" />
                            <div className="mt-8 p-4 bg-dark-bg/50 rounded-xl border border-white/10 italic text-center">
                                "I can help you find anything in the technical documentation."
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chatbot Widget is handled by App.jsx */}
            <ChatWidget />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="p-8 glass-morphism rounded-3xl border border-white/5 hover:border-primary/30 transition-all"
    >
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
);

export default Home;
