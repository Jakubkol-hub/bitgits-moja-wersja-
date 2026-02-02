import React, { useState } from 'react';
import { X, LogIn, User, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserPanel = ({ isOpen, onClose, onLogin, user }) => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login for user
        onLogin({ name: loginForm.email.split('@')[0], email: loginForm.email });
        onClose();
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
                    position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '450px',
                    background: '#fff', zIndex: 1101, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                    padding: '40px', overflowY: 'auto'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>
                        {user ? `Witaj, ${user.name}` : (isRegistering ? 'Załóż Konto' : 'Zaloguj się')}
                    </h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={30} /></button>
                </div>

                {!user ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>E-mail</label>
                            <input
                                type="email"
                                required
                                style={inputStyle}
                                placeholder="twoj@email.pl"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Hasło</label>
                            <input type="password" required style={inputStyle} placeholder="••••••••" />
                        </div>
                        <button type="submit" style={submitButtonStyle}>
                            {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
                            {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}
                            <span
                                onClick={() => setIsRegistering(!isRegistering)}
                                style={{ color: 'var(--primary-color)', fontWeight: '700', cursor: 'pointer', marginLeft: '5px' }}
                            >
                                {isRegistering ? 'Zaloguj się' : 'Stwórz je teraz'}
                            </span>
                        </p>
                    </form>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <button style={menuButtonStyle}><User size={20} /> Twoje Dane</button>
                        <button style={menuButtonStyle}><ShoppingBag size={20} /> Zamówienia</button>
                        <button style={menuButtonStyle}><Settings size={20} /> Ustawienia</button>
                        <button
                            onClick={() => onLogin(null)}
                            style={{ ...menuButtonStyle, color: '#e74c3c', marginTop: '20px' }}
                        >
                            <LogOut size={20} /> Wyloguj się
                        </button>
                    </div>
                )}
            </motion.div>
        </>
    );
};

const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: '#333' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #f0f0f0', outline: 'none', fontSize: '16px' };
const submitButtonStyle = {
    width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
    background: 'var(--primary-color)', color: '#fff', fontSize: '16px', fontWeight: '800',
    cursor: 'pointer', marginTop: '10px'
};
const menuButtonStyle = {
    width: '100%', padding: '15px 20px', borderRadius: '12px', border: '1px solid #f0f0f0',
    background: '#fff', textAlign: 'left', fontSize: '16px', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: 'all 0.2s'
};

export default UserPanel;
