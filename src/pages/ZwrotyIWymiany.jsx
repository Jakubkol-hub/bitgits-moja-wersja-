import React from 'react';
import { motion } from 'framer-motion';

const ZwrotyIWymiany = () => {
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
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Zwroty i Wymiany</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>14 dni na zwrot</h2>
                <p>
                    Masz prawo do odstąpienia od umowy zakupu w ciągu 14 dni od otrzymania przesyłki, bez podawania przyczyny.
                    Towar nie może nosić śladów użytkowania i musi być w oryginalnym opakowaniu.
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Jak dokonać zwrotu?</h2>
                <ol>
                    <li>Pobierz i wypełnij formularz zwrotu (dostępny po kontakcie mailowym).</li>
                    <li>Zapakuj bezpiecznie produkt wraz z formularzem.</li>
                    <li>Wyślij paczkę na adres: Inspiracja Group Joanna Domes, ul. Józefa Rymera 272, 44-310 Radlin.</li>
                </ol>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Wymiany</h2>
                <p>
                    Jeśli chcesz wymienić produkt na inny, prosimy o kontakt pod adresem: <a href="mailto:sklep@bitgits.pl">sklep@bitgits.pl</a>.
                    Najszybszą metodą wymiany jest zwrot obecnego produktu i złożenie nowego zamówienia.
                </p>
            </section>
        </motion.div>
    );
};

export default ZwrotyIWymiany;
