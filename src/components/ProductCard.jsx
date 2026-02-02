import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const ProductCard = ({ product, onEdit, isAdmin }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const images = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/400'];

    const nextImg = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev + 1) % images.length);
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.4 }}
            style={{
                background: '#fff',
                borderRadius: 'var(--border-radius-lg)',
                padding: '32px', // Larger padding
                boxShadow: 'var(--shadow)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
            {/* Category Tag */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: '30px',
                width: 'fit-content',
                marginBottom: '20px',
                fontSize: '14px',
                fontWeight: '800',
                color: 'var(--primary-color)',
                border: '1px solid rgba(211, 84, 0, 0.2)'
            }}>
                <Tag size={14} />
                {product.category}
            </div>

            {/* Image Slider */}
            <div style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                marginBottom: '24px',
                background: '#fcfcfc',
                position: 'relative',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
            }}>
                <img
                    src={images[currentImg]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImg}
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.95)', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImg}
                            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.95)', borderRadius: '50%', padding: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        >
                            <ChevronRight size={24} />
                        </button>
                        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
                            {images.map((_, idx) => (
                                <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === currentImg ? 'var(--primary-color)' : 'rgba(0,0,0,0.15)' }} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div style={{ padding: '0 4px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)', lineHeight: '1.2' }}>{product.name}</h3>
                <p style={{
                    fontSize: '18px',
                    color: 'var(--text-secondary)',
                    marginBottom: '28px',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontWeight: '500'
                }}>
                    {product.description || 'Wyjątkowy produkt stworzony z myślą o najwyższej jakości i naturalnym smaku.'}
                </p>

                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-primary)' }}>{product.price} zł</span>
                    <button
                        className="btn-primary"
                        style={{
                            borderRadius: '16px',
                            padding: '12px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '17px',
                            fontWeight: '800'
                        }}
                    >
                        <Plus size={22} /> Kup Teraz
                    </button>
                </div>
            </div>

            {/* Admin/Edit Options - Only visible for admin */}
            {isAdmin && (
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                    style={{
                        position: 'absolute',
                        top: '32px',
                        right: '32px',
                        background: 'var(--bg-primary)',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        fontSize: '14px',
                        fontWeight: '800',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        border: '1.5px solid var(--primary-color)',
                        color: 'var(--primary-color)',
                        zIndex: 2
                    }}
                >
                    Edytuj
                </button>
            )}
        </motion.div>
    );
};

export default ProductCard;
