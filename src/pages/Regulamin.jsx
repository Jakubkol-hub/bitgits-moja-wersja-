import React from 'react';
import { motion } from 'framer-motion';

const Regulamin = () => {
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
      <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--primary-color)' }}>Regulamin</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>§ 1 Definicje</h2>
        <ol>
          <li><strong>Regulamin</strong> - niniejszy regulamin.</li>
          <li><strong>Sklep Internetowy</strong> - sklep sprzedaży internetowej prowadzony przez Sprzedawcę, pod adresem bitgits.pl.</li>
          <li><strong>Sprzedawca, Właściciel i Administrator</strong> - Inspiracja Group Joanna Domes, z siedzibą w Radlinie 44-310, ul. Józefa Rymera 272, NIP: 6471673948, REGON: 243111435.</li>
          <li><strong>Klient (kupujący)</strong> - każdy podmiot kupujący w sklepie.</li>
          <li><strong>Konsument</strong> - osoba fizyczna dokonująca czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.</li>
          <li><strong>Dni robocze</strong> - dni od poniedziałku do piątku, z wyłączeniem dni ustawowo wolnych od pracy.</li>
          <li><strong>Towar</strong> - produkt oferowany przez Sprzedawcę za pośrednictwem sklepu internetowego.</li>
          <li><strong>Umowa sprzedaży</strong> - umowa zawarta na odległość między Klientem a Sprzedawcą.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>§ 2 Zasady ogólne</h2>
        <p>
          Sklep Internetowy Bitgits prowadzi sprzedaż towarów za pośrednictwem internetu poprzez stronę internetową bitgits.pl. 
          Klient może składać zamówienia w Sklepie Internetowym 24 godziny na dobę, 7 dni w tygodniu.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>§ 3 Realizacja zamówień</h2>
        <p>
          Zamówienia są realizowane w terminie wskazanym przy opisie każdego towaru. W przypadku braku towaru w magazynie, Klient zostanie 
          niezwłocznie poinformowany o przewidywanym terminie dostawy lub możliwości rezygnacji z zamówienia.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>§ 4 Reklamacje i zwroty</h2>
        <p>
          Klient ma prawo do odstąpienia od umowy bez podania przyczyny w terminie 14 dni od daty otrzymania towaru. 
          Reklamacje dotyczące wad towaru należy zgłaszać na adres e-mail: sklep@bitgits.pl.
        </p>
      </section>
    </motion.div>
  );
};

export default Regulamin;
