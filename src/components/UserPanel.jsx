import React, { useState, useEffect } from 'react';
import { X, LogIn, User, ShoppingBag, Settings, LogOut, Mail, Lock, Key, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserPanel = ({ isOpen, onClose, onLogin, user }) => {
    const [view, setView] = useState('login'); // login, register, forgot, reset
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        if (isOpen) {
            setView('login');
            setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            setError('');
            setSuccess('');
        }
    }, [isOpen]);

    // Helpers for simulated DB
    const getUsers = () => JSON.parse(localStorage.getItem('bitgits_users') || '[]');
    const saveUser = (newUser) => {
        const users = getUsers();
        users.push(newUser);
        localStorage.setItem('bitgits_users', JSON.stringify(users));
    };
    const updateUserPassword = (email, newPass) => {
        const users = getUsers();
        const updated = users.map(u => u.email === email ? { ...u, password: newPass } : u);
        localStorage.setItem('bitgits_users', JSON.stringify(updated));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne.');
            return;
        }

        const users = getUsers();
        if (users.find(u => u.email === formData.email)) {
            setError('Ten adres e-mail jest już zajęty.');
            return;
        }

        saveUser({ email: formData.email, password: formData.password, name: formData.name });
        setSuccess('Konto zostało utworzone! Możesz się teraz zalogować.');
        setView('login');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const users = getUsers();
        const found = users.find(u => u.email === formData.email);

        if (!found || found.password !== formData.password) {
            setError('Nieprawidłowy e-mail lub hasło.');
            return;
        }

        onLogin({ email: found.email, name: found.name, type: 'email' });
        onClose();
    };

    const handleGoogleLogin = () => {
        // Simulated Google Login
        onLogin({ email: 'google-user@gmail.com', name: 'Użytkownik Google', type: 'google' });
        onClose();
    };

    const handleForgotInit = (e) => {
        e.preventDefault();
        const users = getUsers();
        if (!users.find(u => u.email === formData.email)) {
            setError('Nie znaleziono konta o podanym adresie e-mail.');
            return;
        }
        // Simulate sending code
        setSuccess(`Kod resetujący został wysłany na ${formData.email} (Kod: 1234)`);
        setView('reset');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (inputCode !== '1234') {
            setError('Nieprawidłowy kod weryfikacyjny.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
            return;
        }

        updateUserPassword(formData.email, formData.password);
        setView('login');
        setSuccess('Hasło zostało zmienione. Zaloguj się nowym hasłem.');
        setFormData({ ...formData, password: '' });
    };

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, backdropFilter: 'blur(8px)' }}
            />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                    position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '480px',
                    background: '#fff', zIndex: 1101, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                    padding: '40px', overflowY: 'auto'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a' }}>
                        {user ? `Witaj, ${user.name}` :
                            view === 'register' ? 'Załóż Konto' :
                                view === 'forgot' ? 'Zapomniałeś hasła?' :
                                    view === 'reset' ? 'Nowe Hasło' : 'Zaloguj się'}
                    </h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}><X size={30} /></button>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#d1fae5', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', gap: '8px' }}
                    >
                        <CheckCircle2 size={18} /> {success}
                    </motion.div>
                )}

                {!user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Login View */}
                        {view === 'login' && (
                            <form onSubmit={handleLogin} style={formStyle}>
                                <div>
                                    <label style={labelStyle}>Adres e-mail</label>
                                    <input type="email" required style={inputStyle} placeholder="jan@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <label style={labelStyle}>Hasło</label>
                                        <span onClick={() => { setView('forgot'); setError(''); }} style={linkStyle}>Zapomniałeś?</span>
                                    </div>
                                    <input type="password" required style={inputStyle} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                                {error && <p style={errorStyle}>{error}</p>}
                                <button type="submit" style={primaryBtnStyle}>Zaloguj się</button>

                                <div style={dividerStyle}><span>lub zaloguj przez</span></div>
                                <button type="button" onClick={handleGoogleLogin} style={googleBtnStyle}>
                                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    Google
                                </button>

                                <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '10px' }}>
                                    Nie masz konta? <strong onClick={() => { setView('register'); setError(''); }} style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>Zarejestruj się</strong>
                                </p>
                            </form>
                        )}

                        {/* Register View */}
                        {view === 'register' && (
                            <form onSubmit={handleRegister} style={formStyle}>
                                <div>
                                    <label style={labelStyle}>Pełna nazwa</label>
                                    <input type="text" required style={inputStyle} placeholder="Jan Kowalski" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>E-mail</label>
                                    <input type="email" required style={inputStyle} placeholder="jan@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Hasło</label>
                                    <input type="password" required style={inputStyle} placeholder="Min. 6 znaków" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Potwierdź hasło</label>
                                    <input type="password" required style={inputStyle} placeholder="Powtórz hasło" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
                                </div>
                                {error && <p style={errorStyle}>{error}</p>}
                                <button type="submit" style={primaryBtnStyle}>Stwórz Konto</button>
                                <button type="button" onClick={() => { setView('login'); setError(''); }} style={ghostBtnStyle}>Mam już konto</button>
                            </form>
                        )}

                        {/* Forgot Password View */}
                        {view === 'forgot' && (
                            <form onSubmit={handleForgotInit} style={formStyle}>
                                <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '10px' }}>
                                    Podaj adres e-mail powiązany z Twoim kontem, a wyślemy Ci kod do zresetowania hasła.
                                </p>
                                <div>
                                    <label style={labelStyle}>E-mail</label>
                                    <input type="email" required style={inputStyle} placeholder="jan@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                {error && <p style={errorStyle}>{error}</p>}
                                <button type="submit" style={primaryBtnStyle}>Wyślij kod</button>
                                <button type="button" onClick={() => { setView('login'); setError(''); }} style={ghostBtnStyle}>Anuluj</button>
                            </form>
                        )}

                        {/* Reset Password View */}
                        {view === 'reset' && (
                            <form onSubmit={handleResetPassword} style={formStyle}>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                                    Wprowadź kod weryfikacyjny wysłany na Twój e-mail (Kod testowy: <strong>1234</strong>).
                                </p>
                                <div>
                                    <label style={labelStyle}>Kod Weryfikacyjny</label>
                                    <input type="text" required style={{ ...inputStyle, letterSpacing: '2px', textAlign: 'center' }} placeholder="0000" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Nowe Hasło</label>
                                    <input type="password" required style={inputStyle} placeholder="Min. 6 znaków" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                                {error && <p style={errorStyle}>{error}</p>}
                                <button type="submit" style={primaryBtnStyle}>Zmień Hasło</button>
                            </form>
                        )}

                    </div>
                ) : (
                    // Logged In View
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8f9fa', p: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--primary-color)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '18px' }}>{user.name}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>{user.email}</div>
                                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>Typ konta: {user.type === 'google' ? 'Google' : 'Standard'}</div>
                            </div>
                        </div>

                        <button style={menuButtonStyle}><ShoppingBag size={20} /> Zamówienia</button>
                        <button style={menuButtonStyle}><User size={20} /> Dane Konta</button>
                        <button style={menuButtonStyle}><Settings size={20} /> Ustawienia</button>

                        <div style={{ borderTop: '1px solid #eee', margin: '10px 0' }} />

                        <button
                            onClick={() => onLogin(null)}
                            style={{ ...menuButtonStyle, color: '#e74c3c', border: '1px solid #fee2e2', background: '#fff1f2' }}
                        >
                            <LogOut size={20} /> Wyloguj się
                        </button>
                    </div>
                )}
            </motion.div>
        </>
    );
};

// Styles
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: '#333' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '10px', border: '2px solid #e5e5e5', outline: 'none', fontSize: '16px', transition: 'border 0.2s' };
const primaryBtnStyle = { width: '100%', padding: '16px', borderRadius: '10px', border: 'none', background: 'var(--primary-color)', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(211, 84, 0, 0.2)' };
const ghostBtnStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#666', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };
const googleBtnStyle = { width: '100%', padding: '14px', borderRadius: '10px', border: '2px solid #e5e5e5', background: '#fff', color: '#333', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' };
const menuButtonStyle = { width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #f0f0f0', background: '#fff', textAlign: 'left', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#333' };
const dividerStyle = { display: 'flex', alignItems: 'center', color: '#999', fontSize: '12px', gap: '10px', margin: '5px 0' };
const linkStyle = { fontSize: '13px', color: 'var(--primary-color)', fontWeight: '600', cursor: 'pointer' };
const errorStyle = { color: '#e74c3c', fontSize: '14px', background: '#fdeded', padding: '10px', borderRadius: '8px', textAlign: 'center' };

export default UserPanel;
