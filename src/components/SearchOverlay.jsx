import React from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchOverlay = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)',
                        zIndex: 2000, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', padding: '20px',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '40px', right: '40px', border: 'none', background: 'none', cursor: 'pointer', color: '#333' }}
                    >
                        <X size={40} />
                    </button>

                    <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-color)', letterSpacing: '2px', marginBottom: '20px' }}>
                            Czego szukasz?
                        </h2>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Wpisz nazwę produktu..."
                                style={{
                                    width: '100%', padding: '20px 0', fontSize: '42px', fontWeight: '800',
                                    border: 'none', borderBottom: '4px solid #f0f0f0', outline: 'none',
                                    background: 'transparent', textAlign: 'center', color: '#1a1a1a'
                                }}
                            />
                            <div style={{ position: 'absolute', right: '0', bottom: '25px', color: '#ccc' }}>
                                <Search size={32} />
                            </div>
                        </div>
                        <p style={{ marginTop: '20px', color: '#999', fontSize: '16px' }}>
                            Naciśnij Enter, aby przefiltrować wyniki
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
