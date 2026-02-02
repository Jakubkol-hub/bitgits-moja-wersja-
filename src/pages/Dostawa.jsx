import React from 'react';
import { motion } from 'framer-motion';

const Dostawa = () => {
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
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Dostawa</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Metody dostawy</h2>
                <p>Współpracujemy z zaufanymi dostawcami, aby Twoje zamówienie dotarło bezpiecznie i na czas:</p>
                <ul>
                    <li><strong>Paczkomaty InPost</strong> - 14,99 zł</li>
                    <li><strong>Kurier DPD</strong> - 18,50 zł</li>
                    <li><strong>Odbiór osobisty</strong> - 0,00 zł (po wcześniejszym umówieniu)</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Czas realizacji</h2>
                <p>
                    Większość zamówień wysyłamy w ciągu 24-48 godzin od momentu zaksięgowania wpłaty. Czas dostawy przez przewoźnika
                    to zazwyczaj 1-2 dni robocze.
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Darmowa dostawa</h2>
                <p>
                    Przy zamówieniach powyżej 200 zł oferujemy darmową dostawę Paczkomatem InPost na terenie całej Polski!
                </p>
            </section>
        </motion.div>
    );
};

export default Dostawa;
