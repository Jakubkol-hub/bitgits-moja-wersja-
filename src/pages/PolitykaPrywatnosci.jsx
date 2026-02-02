import React from 'react';
import { motion } from 'framer-motion';

const PolitykaPrywatnosci = () => {
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
            <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Polityka Prywatności</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>1. Informacje ogólne</h2>
                <p>
                    Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez Użytkowników
                    w związku z korzystaniem przez nich z usług sklepu bitgits.pl.
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>2. Administrator Danych</h2>
                <p>
                    Administratorem danych osobowych zawartych w serwisie jest Inspiracja Group Joanna Domes z siedzibą w Radlinie.
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>3. Cel zbierania danych</h2>
                <p>
                    Dane osobowe przetwarzane są w celu:
                </p>
                <ul>
                    <li>Realizacji zamówień i umów sprzedaży.</li>
                    <li>Obsługi reklamacji i zwrotów.</li>
                    <li>Marketingu bezpośredniego własnych produktów (za zgodą Użytkownika).</li>
                    <li>Przesyłania newslettera (za zgodą Użytkownika).</li>
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>4. Prawa Użytkownika</h2>
                <p>
                    Każda osoba, której dane dotyczą, ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia
                    przetwarzania, a także prawo do wniesienia sprzeciwu wobec przetwarzania.
                </p>
            </section>
        </motion.div>
    );
};

export default PolitykaPrywatnosci;
