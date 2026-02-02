import React from 'react';
import { motion } from 'framer-motion';

const MetodyPlatnosci = () => {
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
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Metody Płatności</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Dostępne sposoby zapłaty</h2>
                <p>Oferujemy wygodne i bezpieczne metody płatności:</p>
                <ul>
                    <li><strong>Płatność online (Przelewy24)</strong> - szybkie przelewy, BLIK, karty płatnicze.</li>
                    <li><strong>Przelew tradycyjny</strong> - dane do przelewu znajdziesz w stopce strony oraz w mailu potwierdzającym.</li>
                    <li><strong>Pobranie</strong> - płatność kurierowi przy odbiorze przesyłki.</li>
                </ul>
            </section>

            <div style={{
                marginTop: '40px',
                padding: '20px',
                background: '#f9f9f9',
                borderRadius: '12px',
                border: '1px solid #eee'
            }}>
                <h3 style={{ marginBottom: '10px' }}>Dane do przelewu tradycyjnego:</h3>
                <p>Bitgits</p>
                <p>Nr konta: 73 2490 0005 0000 4530 0054 1289</p>
                <p>Tytuł: Numer zamówienia [TWOJE_ID]</p>
            </div>
        </motion.div>
    );
};

export default MetodyPlatnosci;
