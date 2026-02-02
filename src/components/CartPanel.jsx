import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPanel = ({ isOpen, onClose, cartItems = [] }) => {
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
                    padding: '40px', display: 'flex', flexDirection: 'column'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Twój Koszyk</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={30} /></button>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                    <ShoppingCart size={80} strokeWidth={1} style={{ marginBottom: '20px' }} />
                    <p style={{ fontSize: '18px', fontWeight: '600' }}>Koszyk jest pusty</p>
                    <button
                        onClick={onClose}
                        style={{
                            marginTop: '30px', padding: '12px 24px', borderRadius: '100px',
                            border: 'none', background: 'var(--primary-color)', color: '#fff',
                            fontWeight: '700', cursor: 'pointer'
                        }}
                    >
                        Zacznij zakupy
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default CartPanel;
