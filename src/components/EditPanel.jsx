import React, { useState, useEffect } from 'react';
import { X, Save, LogIn, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    'Słodycze - Owoce w czekoladzie',
    'Słodycze - Orzechy w czekoladzie',
    'Słodycze - Inne czekoladowe',
    'Słodycze - Czekolada do picia',
    'Owoce - Owoce liofilizowane',
    'Owoce - Owoce suszone',
    'Herbaty - Herbaty owocowe',
    'Herbaty - Herbaty zielone',
    'Herbaty - Herbaty czarne',
    'Herbaty - Herbaty ziołowe',
    'Herbaty - Herbaty kwitnące',
    'Herbaty - Herbaty inne',
    'Orzechy i Przekąski - Orzechy, ziarna, pestki',
    'Orzechy i Przekąski - Przekąski smakowe',
    'Kwiaty Jadalne - Kwiaty suszone',
    'Kwiaty Jadalne - Mieszanki kwiatowe',
    'Na Prezent - Zestawy upominkowe',
    'Na Prezent - Akcesoria',
    'Na Prezent - Pakowanie na prezent',
    'Inne - Opakowania'
];

const EditPanel = ({ isOpen, onClose, product, onUpdate, onDelete }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        images: [],
        category: CATEGORIES[0]
    });

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                images: product.images || []
            });
        }
    }, [product]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginForm.username === 'g' && loginForm.password === 'g') {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Nieprawidłowy login lub hasło.');
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 3) {
            alert('Możesz dodać maksymalnie 3 zdjęcia.');
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...formData, id: product.id });
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Czy na pewno chcesz usunąć ten produkt?')) {
            onDelete(product.id);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1200, backdropFilter: 'blur(8px)' }}
            />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: '500px',
                    background: '#FEFDFC',
                    zIndex: 1201,
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
                    padding: '40px',
                    overflowY: 'auto',
                    borderLeft: '4px solid var(--primary-color)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2c3e50' }}>
                        {!isLoggedIn ? 'Autoryzacja Edycji' : 'Edytuj Produkt'}
                    </h2>
                    <button onClick={onClose} style={{ padding: '8px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={32} /></button>
                </div>

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
                        <p style={{ color: '#666', fontSize: '16px' }}>Wymagane uprawnienia administratora do edycji tego produktu.</p>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Login</label>
                            <input
                                type="text"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                required
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '18px' }}
                                placeholder="Wpisz login"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Hasło</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                required
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '18px' }}
                                placeholder="•••••"
                            />
                        </div>
                        {loginError && <p style={{ color: '#e74c3c', fontWeight: '600', fontSize: '16px' }}>{loginError}</p>}
                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '18px', fontSize: '18px' }}>
                            <LogIn size={20} /> Zaloguj i Edytuj
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Zdjęcia Produktu (max 3)</label>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                {formData.images.map((img, idx) => (
                                    <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #eee' }}>
                                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => removePhoto(idx)}
                                            style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(231, 76, 60, 0.8)', color: '#fff', padding: '2px', border: 'none', cursor: 'pointer' }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {formData.images.length < 3 && (
                                    <label style={{
                                        width: '80px', height: '80px', borderRadius: '8px', border: '2px dashed #ccc',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        background: '#fff'
                                    }}>
                                        <X size={24} color="#999" style={{ transform: 'rotate(45deg)' }} />
                                        <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Kategoria</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '16px', background: '#fff' }}
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Nazwa Produktu</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '16px' }}
                                placeholder="np. Cynamonowy Migdał"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Cena (zł)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '16px' }}
                                placeholder="29.99"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#34495e' }}>Opis Produktu</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #ddd', minHeight: '120px', fontSize: '16px' }}
                                placeholder="Krótki, zachęcający opis..."
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '16px' }}>
                                    <Save size={24} />
                                    <span style={{ fontSize: '18px' }}>Zapisz Zmiany</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    style={{ padding: '16px', borderRadius: '12px', border: '2px solid #ddd', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Anuluj
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleDelete}
                                style={{
                                    padding: '16px', borderRadius: '12px', border: '2px solid #e74c3c',
                                    color: '#e74c3c', background: 'transparent', fontWeight: '800',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={24} /> Usuń Produkt
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </>
    );
};

export default EditPanel;
