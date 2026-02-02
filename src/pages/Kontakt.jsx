import React from 'react';
import { motion } from 'framer-motion';

const Kontakt = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                padding: '160px 20px 80px',
                maxWidth: '1000px',
                margin: '0 auto',
                lineHeight: '1.8',
                color: '#333'
            }}
        >
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Kontakt z nami</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Dane kontaktowe</h2>
                    <p style={{ marginBottom: '10px' }}><strong>Bitgits</strong></p>
                    <p style={{ marginBottom: '10px' }}>Inspiracja Group Joanna Domes</p>
                    <p style={{ marginBottom: '10px' }}>ul. Józefa Rymera 272</p>
                    <p style={{ marginBottom: '20px' }}>44-310 Radlin</p>

                    <p style={{ marginBottom: '10px' }}>Telefon: <a href="tel:+48570075825" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>+48 570 075 825</a></p>
                    <p style={{ marginBottom: '10px' }}>E-mail: <a href="mailto:sklep@bitgits.pl" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>sklep@bitgits.pl</a></p>
                </div>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Wyślij wiadomość</h2>
                    <input type="text" placeholder="Imię i nazwisko" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <input type="email" placeholder="E-mail" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    <textarea placeholder="Twoja wiadomość" rows="5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                    <button
                        type="submit"
                        style={{
                            padding: '15px',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'opacity 0.3s'
                        }}
                        onClick={(e) => e.preventDefault()}
                    >
                        Wyślij formularz
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Kontakt;
