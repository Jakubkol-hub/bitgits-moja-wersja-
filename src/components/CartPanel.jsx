import React from 'react';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPanel = ({ isOpen, onClose, cartItems = [], onRemove, total = 0 }) => {

    return (
        <AnimatePresence>
            {isOpen && (
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
                            display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '30px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ position: 'relative' }}>
                                    <ShoppingCart size={28} />
                                    <span style={{
                                        position: 'absolute', top: -8, right: -8, background: 'var(--primary-color)',
                                        color: '#fff', borderRadius: '50%', width: '20px', height: '20px',
                                        fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                    }}>
                                        {cartItems.length}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Twój Koszyk</h2>
                            </div>
                            <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }}><X size={28} /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
                            {cartItems.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                                    <ShoppingCart size={80} strokeWidth={1} style={{ marginBottom: '20px', opacity: 0.5 }} />
                                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#999' }}>Koszyk jest pusty</p>
                                    <button
                                        onClick={onClose}
                                        style={{
                                            marginTop: '30px', padding: '12px 32px', borderRadius: '100px',
                                            border: 'none', background: 'var(--primary-color)', color: '#fff',
                                            fontWeight: '700', cursor: 'pointer', fontSize: '16px'
                                        }}
                                    >
                                        Zacznij zakupy
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.cartId}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '16px', background: '#fff', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                                        >
                                            <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid #f0f0f0' }}>
                                                <img src={item.images?.[0] || 'https://via.placeholder.com/80'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', lineHeight: '1.2' }}>{item.name}</h4>
                                                    <p style={{ fontSize: '13px', color: '#999' }}>{item.category.split(' - ')[0]}</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-color)' }}>{item.price} zł</span>
                                                    <button
                                                        onClick={() => onRemove(item.cartId)}
                                                        style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div style={{ padding: '30px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#666' }}>Suma</span>
                                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a' }}>{total.toFixed(2)} zł</span>
                                </div>
                                <button style={{
                                    width: '100%', padding: '20px', borderRadius: '16px', border: 'none',
                                    background: 'var(--primary-color)', color: '#fff', fontSize: '18px',
                                    fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                                }}>
                                    Przejdź do kasy <ArrowRight size={24} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartPanel;
