import React, { useState, useEffect } from 'react';
import {
    X, Plus, Trash2, Save, LogIn, Image as ImageIcon,
    CheckCircle2, LayoutDashboard, ShoppingBag, Box,
    Clock, Truck, Printer, Search, ArrowRight
} from 'lucide-react';
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

const AdminPanel = (props) => {
    const {
        isOpen, onClose, products, onAdd, onUpdate, onDelete,
        primaryColor, onUpdateColor, orders, onUpdateOrder,
        isLoggedIn, onLogin // Added props
    } = props;

    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Removed local state
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        images: [],
        category: CATEGORIES[0]
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
                images: editingProduct.images || []
            });
            setActiveTab('products'); // Switch to products if editing
        } else {
            setFormData({ name: '', price: '', description: '', images: [], category: CATEGORIES[0] });
        }
    }, [editingProduct]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginForm.username === 'g' && loginForm.password === 'g') {
            onLogin(true); // Use prop
            setLoginError('');
        } else {
            setLoginError('Nieprawidłowy login lub hasło.');
        }
    };

    const handleLogout = () => {
        onLogin(false); // Use prop
        setLoginForm({ username: '', password: '' });
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
        if (editingProduct) {
            onUpdate({ ...formData, id: editingProduct.id });
            setEditingProduct(null);
            setSuccessMessage('Produkt został zaktualizowany!');
        } else {
            onAdd({ ...formData, id: Date.now() });
            setSuccessMessage('Produkt został dodany do oferty!');
        }
        setFormData({ name: '', price: '', description: '', images: [], category: CATEGORIES[0] });
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleGenerateLabel = (order) => {
        const updated = { ...order, orderStatus: 'Shipped', trackingNumber: 'PL' + Math.floor(Math.random() * 1000000000) };
        onUpdateOrder(updated);
        setSuccessMessage('Etykieta została wygenerowana!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const DashboardView = () => {
        const newOrdersCount = orders.filter(o => o.orderStatus === 'New').length;
        const readyToShipCount = orders.filter(o => o.orderStatus === 'New' && o.paymentStatus === 'Paid').length;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={statCardStyle}>
                        <div style={{ color: 'var(--primary-color)' }}><ShoppingBag size={32} /></div>
                        <div>
                            <div style={statValueStyle}>{newOrdersCount}</div>
                            <div style={statLabelStyle}>Nowe zamówienia</div>
                        </div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={{ color: '#27ae60' }}><Truck size={32} /></div>
                        <div>
                            <div style={statValueStyle}>{readyToShipCount}</div>
                            <div style={statLabelStyle}>Do wysyłki (Opłacone)</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Szybkie akcje</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => setActiveTab('orders')} style={actionButtonStyle}>Przeglądaj zamówienia</button>
                        <button onClick={() => setActiveTab('products')} style={actionButtonStyle}>Dodaj produkt</button>
                    </div>
                </div>
            </div>
        );
    };

    const OrdersListView = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Lista zamówień</h3>
            </div>
            {orders.map(order => (
                <div key={order.id} style={orderRowStyle} onClick={() => setSelectedOrder(order)}>
                    <div>
                        <div style={{ fontWeight: '700', color: '#2c3e50' }}>{order.id}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{order.date}</div>
                    </div>
                    <div style={{ fontWeight: '600' }}>{order.customer.name}</div>
                    <div style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: order.paymentStatus === 'Paid' ? '#eafaf1' : '#fef5e7',
                        color: order.paymentStatus === 'Paid' ? '#27ae60' : '#f39c12'
                    }}>
                        {order.paymentStatus === 'Paid' ? 'Opłacone' : 'Oczekuje'}
                    </div>
                    <div style={{ color: '#7f8c8d', fontSize: '14px' }}>{order.shippingMethod}</div>
                    <div style={{
                        color: order.orderStatus === 'Shipped' ? '#27ae60' : '#3498db',
                        fontWeight: '700',
                        fontSize: '14px'
                    }}>
                        {order.orderStatus === 'Shipped' ? 'Wysłane' : 'Nowe'}
                    </div>
                    <div><ArrowRight size={18} color="#ccc" /></div>
                </div>
            ))}
        </div>
    );

    const OrderDetailsView = ({ order }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
            <button onClick={() => setSelectedOrder(null)} style={{ color: 'var(--primary-color)', fontWeight: '700', cursor: 'pointer', border: 'none', background: 'none' }}>
                ← Powrót do listy
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={detailsBoxStyle}>
                    <h4 style={detailsHeaderStyle}>Klient</h4>
                    <p><strong>{order.customer.name}</strong></p>
                    <p>{order.customer.email}</p>
                    <p>{order.customer.phone}</p>
                </div>
                <div style={detailsBoxStyle}>
                    <h4 style={detailsHeaderStyle}>Dostawa</h4>
                    <p><strong>{order.shippingMethod}</strong></p>
                    <p style={{ fontSize: '13px' }}>{order.shippingAddress}</p>
                </div>
            </div>

            <div style={detailsBoxStyle}>
                <h4 style={detailsHeaderStyle}>Produkty</h4>
                {order.products.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <span>{p.name} x{p.quantity}</span>
                        <span>{(p.price * p.quantity).toFixed(2)} zł</span>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontWeight: '800', fontSize: '18px' }}>
                    <span>Suma:</span>
                    <span>{order.total.toFixed(2)} zł</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                {order.paymentStatus === 'Paid' && order.orderStatus === 'New' && (
                    <button
                        onClick={() => handleGenerateLabel(order)}
                        style={{ ...actionButtonStyle, background: 'var(--primary-color)', color: '#fff', flex: 1 }}
                    >
                        <Box size={20} /> Generuj etykietę
                    </button>
                )}
                {order.orderStatus === 'Shipped' && (
                    <button
                        style={{ ...actionButtonStyle, background: '#27ae60', color: '#fff', flex: 1 }}
                        onClick={() => alert('Drukowanie etykiety: ' + order.trackingNumber)}
                    >
                        <Printer size={20} /> Drukuj etykietę
                    </button>
                )}
            </div>
            {order.trackingNumber && (
                <p style={{ textAlign: 'center', color: '#27ae60', fontWeight: '700' }}>
                    Nr śledzenia: {order.trackingNumber}
                </p>
            )}
        </motion.div>
    );

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(8px)' }}
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
                    maxWidth: '600px',
                    background: '#FEFDFC',
                    zIndex: 101,
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
                    padding: '40px',
                    overflowY: 'auto',
                    borderLeft: '4px solid var(--primary-color)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2c3e50' }}>Panel Admina</h2>
                        {isLoggedIn && (
                            <button onClick={handleLogout} style={logoutButtonStyle}>Wyloguj</button>
                        )}
                    </div>
                    <button onClick={onClose} style={{ padding: '8px' }}><X size={32} /></button>
                </div>

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
                        <div>
                            <label style={labelStyle}>Login</label>
                            <input
                                type="text"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                required
                                style={inputStyle}
                                placeholder="Wpisz login"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Hasło</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                required
                                style={inputStyle}
                                placeholder="•••••"
                            />
                        </div>
                        {loginError && <p style={{ color: '#e74c3c', fontWeight: '600', fontSize: '16px' }}>{loginError}</p>}
                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '18px', fontSize: '18px' }}>
                            <LogIn size={20} /> Zaloguj się
                        </button>
                    </form>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '10px', padding: '4px', background: '#f0f0f0', borderRadius: '12px' }}>
                            <button
                                onClick={() => { setActiveTab('dashboard'); setSelectedOrder(null); }}
                                style={tabButtonStyle(activeTab === 'dashboard', primaryColor)}
                            >
                                <LayoutDashboard size={18} /> Dashboard
                            </button>
                            <button
                                onClick={() => { setActiveTab('orders'); setSelectedOrder(null); }}
                                style={tabButtonStyle(activeTab === 'orders' || selectedOrder, primaryColor)}
                            >
                                <ShoppingBag size={18} /> Zamówienia
                            </button>
                            <button
                                onClick={() => { setActiveTab('products'); setSelectedOrder(null); }}
                                style={tabButtonStyle(activeTab === 'products', primaryColor)}
                            >
                                <Box size={18} /> Produkty
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={alertSuccessStyle}
                                >
                                    <CheckCircle2 size={24} /> {successMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Views */}
                        {activeTab === 'dashboard' && <DashboardView />}

                        {(activeTab === 'orders' || selectedOrder) && (
                            selectedOrder ? <OrderDetailsView order={selectedOrder} /> : <OrdersListView />
                        )}

                        {activeTab === 'products' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{editingProduct ? 'Edytuj Produkt' : 'Dodaj Produkt'}</h3>

                                    <div>
                                        <label style={labelStyle}>Zdjęcia (max 3)</label>
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                            {formData.images.map((img, idx) => (
                                                <div key={idx} style={photoPreviewStyle}>
                                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <button type="button" onClick={() => removePhoto(idx)} style={photoDeleteBtnStyle}><X size={12} /></button>
                                                </div>
                                            ))}
                                            {formData.images.length < 3 && (
                                                <label style={photoAddBtnStyle}>
                                                    <Plus size={24} color="#999" />
                                                    <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={labelStyle}>Kategoria</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                style={inputStyle}
                                            >
                                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Cena (zł)</label>
                                            <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={inputStyle} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Nazwa</label>
                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={inputStyle} />
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Opis</label>
                                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                            {editingProduct ? <Save size={20} /> : <Plus size={20} />}
                                            {editingProduct ? 'Zapisz' : 'Dodaj'}
                                        </button>
                                        {editingProduct && (
                                            <button type="button" onClick={() => setEditingProduct(null)} style={cancelButtonStyle}>Anuluj</button>
                                        )}
                                    </div>
                                </form>

                                <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Produkty w ofercie</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {products.map(p => (
                                            <div key={p.id} style={productRowStyle}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <img src={p.images?.[0] || 'https://via.placeholder.com/40'} style={{ width: '40px', height: '40px', borderRadius: '6px' }} />
                                                    <div>
                                                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{p.name}</div>
                                                        <div style={{ fontSize: '12px', color: '#999' }}>{p.category}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => setEditingProduct(p)} style={editBtnStyle}>Edytuj</button>
                                                    <button onClick={() => onDelete(p.id)} style={{ color: '#e74c3c' }}><Trash2 size={20} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings */}
                        <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Ustawienia strony</h3>
                            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '13px', color: '#7f8c8d', display: 'block', marginBottom: '8px' }}>Kolor przewodni</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <input type="color" value={primaryColor} onChange={(e) => onUpdateColor(e.target.value)} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }} />
                                        <span style={{ fontWeight: '700' }}>{primaryColor?.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

// Styles
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: '600', color: '#34495e' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #eee', fontSize: '16px', outline: 'none' };
const statCardStyle = { background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '16px' };
const statValueStyle = { fontSize: '24px', fontWeight: '800', color: '#2c3e50' };
const statLabelStyle = { fontSize: '13px', color: '#7f8c8d', fontWeight: '600' };
const actionButtonStyle = { padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#f0f0f0', color: '#2c3e50', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };
const cancelButtonStyle = { padding: '12px 20px', borderRadius: '10px', border: '2px solid #eee', fontWeight: '600', color: '#666' };
const logoutButtonStyle = { padding: '6px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', background: '#f8f9fa', border: '1px solid #ddd', color: '#666' };
const tabButtonStyle = (active, color) => ({
    flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
    background: active ? color : 'transparent',
    color: active ? '#fff' : '#666',
    fontWeight: '700', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: '8px',
    transition: 'all 0.2s'
});
const orderRowStyle = {
    display: 'grid', gridTemplateColumns: '80px 1fr 100px 120px 80px 40px',
    alignItems: 'center', padding: '16px', background: '#fff',
    borderRadius: '12px', border: '1px solid #eee', gap: '12px',
    cursor: 'pointer', transition: 'all 0.2s'
};
const productRowStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', background: '#fff', borderRadius: '12px',
    border: '1px solid #eee'
};
const editBtnStyle = { padding: '6px 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px', fontWeight: '600' };
const detailsBoxStyle = { background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' };
const detailsHeaderStyle = { fontSize: '14px', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' };
const alertSuccessStyle = { padding: '16px', background: '#D4EFDF', color: '#1E8449', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' };
const photoPreviewStyle = { position: 'relative', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee' };
const photoDeleteBtnStyle = { position: 'absolute', top: 0, right: 0, background: 'rgba(231, 76, 60, 0.8)', color: '#fff', border: 'none', padding: '2px', cursor: 'pointer' };
const photoAddBtnStyle = { width: '60px', height: '60px', borderRadius: '6px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' };

export default AdminPanel;
