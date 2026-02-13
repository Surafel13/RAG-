import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Upload, FileText, Trash2, Loader2, Plus, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/documents`);
            setDocuments(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFile(null);
            setTitle('');
            fetchDocuments();
        } catch (err) {
            alert(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/documents/${id}`);
            fetchDocuments();
        } catch (err) {
            alert('Delete failed');
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-text-secondary">Manage the knowledge base for your AI assistant.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <div className="glass-morphism p-6 rounded-2xl sticky top-24 border border-white/10">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-primary" />
                            Upload Knowledge
                        </h2>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Document Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Employee Handbook"
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">File (PDF or Text)</label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${file ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/50'}`}>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept=".pdf,.txt"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block">
                                        <Upload className={`mx-auto mb-2 ${file ? 'text-primary' : 'text-text-secondary'}`} size={32} />
                                        <p className="text-sm">{file ? file.name : 'Click to select or drag & drop'}</p>
                                        <p className="text-xs text-text-secondary mt-1">PDF, TXT supported</p>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading || !file}
                                className="w-full bg-primary hover:bg-primary-hover py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                {uploading ? 'Processing AI Embeddings...' : 'Process Document'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Documents List */}
                <div className="lg:col-span-2">
                    <div className="glass-morphism rounded-2xl overflow-hidden border border-white/10">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-semibold">Knowledge Base</h2>
                        </div>

                        <div className="divide-y divide-white/5">
                            {loading ? (
                                <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></div>
                            ) : documents.length === 0 ? (
                                <div className="p-10 text-center text-text-secondary">No documents uploaded yet.</div>
                            ) : (
                                documents.map((doc) => (
                                    <div key={doc._id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{doc.title}</h3>
                                                <p className="text-xs text-text-secondary">Added on {new Date(doc.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-xs text-green-400">
                                                <CheckCircle2 size={14} />
                                                Indexed
                                            </span>
                                            <button
                                                onClick={() => handleDelete(doc._id)}
                                                className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
