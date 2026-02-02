import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, onEdit, selectedCategory, isAdmin }) => {
    const filteredProducts = selectedCategory
        ? products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()))
        : products;

    const displayTitle = selectedCategory ? selectedCategory.split(' - ').pop() : 'Nasza Oferta';

    return (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '48px'
                }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{displayTitle}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Najważniejsza jest dla nas Twoja przyjemność.</p>
                    </div>
                </div>

                <div className="grid-container">
                    {filteredProducts.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
                            Brak produktów w tej kategorii.
                        </div>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} onEdit={onEdit} isAdmin={isAdmin} />
                        ))
                    )}
                </div>
            </div>

            <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
        }
        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }
      `}</style>
        </section>
    );
};

export default ProductGrid;
