import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductPage = ({ products, onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeImage, setActiveImage] = useState(0);

    const product = products.find(p => p.id === parseInt(id) || p.id === id);

    useEffect(() => {
        if (product) {
            window.scrollTo(0, 0);
        }
    }, [id]);

    if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Ładowanie...</div>;

    const images = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/600'];

    return (
        <div style={{ padding: '120px 20px 60px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none',
                    fontSize: '16px', fontWeight: '600', color: '#666', cursor: 'pointer', marginBottom: '32px'
                }}
            >
                <ArrowLeft size={20} /> Powrót
            </button>

            <div className="product-page-grid" style={{ display: 'grid', gap: '60px' }}>
                {/* Image Gallery */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{
                            width: '100%', aspectRatio: '1/1', background: '#f8f8f8', borderRadius: '24px',
                            overflow: 'hidden', border: '1px solid #eee'
                        }}
                    >
                        <img
                            src={images[activeImage]}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>
                    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                style={{
                                    width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden',
                                    cursor: 'pointer', border: activeImage === idx ? '2px solid var(--primary-color)' : '2px solid transparent',
                                    flexShrink: 0
                                }}
                            >
                                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div style={{ marginBottom: '24px' }}>
                        <span style={{
                            background: 'var(--bg-secondary)', color: 'var(--primary-color)',
                            padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '700',
                            display: 'inline-block', marginBottom: '16px'
                        }}>
                            {product.category}
                        </span>
                        <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', color: '#1a1a1a' }}>
                            {product.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f39c12', fontSize: '16px', fontWeight: '600' }}>
                            <div style={{ display: 'flex' }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="#f39c12" />)}</div>
                            <span style={{ color: '#999', fontWeight: '400' }}>(24 opinie)</span>
                        </div>
                    </div>

                    <div style={{ fontSize: '36px', fontWeight: '900', color: '#1a1a1a', marginBottom: '32px' }}>
                        {product.price} zł
                    </div>

                    <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555', marginBottom: '40px' }}>
                        {product.description || 'Ten produkt został stworzony z najwyższą starannością, aby spełnić Twoje oczekiwania. Naturalne składniki i wyjątkowy smak to nasza gwarancja jakości.'}
                    </p>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                        <button
                            onClick={() => onAddToCart(product)}
                            style={{
                                flex: 1, padding: '20px', borderRadius: '16px', border: 'none',
                                background: 'var(--primary-color)', color: '#fff', fontSize: '18px',
                                fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                boxShadow: '0 10px 20px rgba(211, 84, 0, 0.2)'
                            }}
                        >
                            <ShoppingCart size={24} /> Dodaj do koszyka
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', background: '#f9f9f9', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: '#e8f8f5', padding: '10px', borderRadius: '10px', color: '#27ae60' }}><Truck size={24} /></div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Darmowa dostawa</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>Dla zamówień powyżej 150 zł</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: '#fef9e7', padding: '10px', borderRadius: '10px', color: '#f1c40f' }}><ShieldCheck size={24} /></div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Gwarancja jakości</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>100% naturalne składniki</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ background: '#ebf5fb', padding: '10px', borderRadius: '10px', color: '#3498db' }}><RefreshCw size={24} /></div>
                            <div>
                                <div style={{ fontWeight: '700' }}>30 dni na zwrot</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>Bez pytań</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
