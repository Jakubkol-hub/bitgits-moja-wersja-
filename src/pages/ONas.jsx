import React from 'react';
import { motion } from 'framer-motion';

const ONas = () => {
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
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>O Nas</h1>

            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Witaj w świecie Bitgits! Jesteśmy pasjonatami smaku i jakości. Naszą misją jest dostarczanie wyjątkowych
                przekąsek i herbat, które umilą każdą chwilę.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                <div style={{ padding: '30px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Nasza Pasja</h3>
                    <p>Selekcjonujemy tylko najlepsze składniki, od liofilizowanych owoców po wysokogatunkowe herbaty.</p>
                </div>
                <div style={{ padding: '30px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Tradycja i Nowoczesność</h3>
                    <p>Łączymy sprawdzone receptury z nowoczesnymi metodami produkcji, takimi jak liofilizacja.</p>
                </div>
            </div>

            <section style={{ marginTop: '60px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Skąd nazwa?</h2>
                <p>
                    Bitgits to więcej niż nazwa – to obietnica "bitów" i "gitsów" – czyli małych fragmentów doskonałości (bits)
                    i gwarancji, że wszystko będzie "git" (gits)!
                </p>
            </section>
        </motion.div>
    );
};

export default ONas;
