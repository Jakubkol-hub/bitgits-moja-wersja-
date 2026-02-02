import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Footer = () => {
    return (
        <footer style={{
            padding: '80px 0 40px',
            background: '#fff',
            borderTop: '2px solid #f9f9f9',
            color: '#1a1a1a',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>

                {/* Column 1: Informacje o Sklepie */}
                <div>
                    <h4 style={headerStyle}>Informacje o Sklepie</h4>
                    <div style={contentStyle}>
                        <p style={{ fontWeight: '700', marginBottom: '10px' }}>Bitgits</p>
                        <p>tel. 570 075 825</p>
                        <p><a href="mailto:sklep@bitgits.pl" style={linkStyle}>sklep@bitgits.pl</a></p>
                        <p style={{ marginTop: '15px', fontSize: '13px', lineHeight: '1.4' }}>
                            Nr konta: 73 2490 0005 0000 4530 0054 1289
                        </p>
                    </div>
                </div>

                {/* Column 2: Informacje */}
                <div>
                    <h4 style={headerStyle}>Informacje</h4>
                    <ul style={listStyle}>
                        <li><Link to="/o-nas" style={linkStyle}>O Nas</Link></li>
                        <li><Link to="/regulamin" style={linkStyle}>Regulamin</Link></li>
                        <li><Link to="/polityka-prywatnosci" style={linkStyle}>Polityka prywatności</Link></li>
                        <li><Link to="/kontakt" style={linkStyle}>Kontakt z nami</Link></li>
                    </ul>
                </div>

                {/* Column 3: Strefa klienta */}
                <div>
                    <h4 style={headerStyle}>Strefa klienta</h4>
                    <ul style={listStyle}>
                        <li><Link to="/moje-konto" style={linkStyle}>Twoje konto</Link></li>
                        <li><Link to="/metody-platnosci" style={linkStyle}>Metody płatności</Link></li>
                        <li><Link to="/dostawa" style={linkStyle}>Dostawa</Link></li>
                        <li><Link to="/zwroty-i-wymiany" style={linkStyle}>Zwroty i wymiany</Link></li>
                    </ul>
                </div>

                {/* Column 4: Płatności obsługuje */}
                <div>
                    <h4 style={headerStyle}>Płatności obsługuje</h4>
                    <div style={{ marginTop: '20px' }}>
                        {/* Simple Przelewy24 placeholder/text for now as seen in image */}
                        <div style={{
                            padding: '10px 20px',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            display: 'inline-block'
                        }}>
                            <span style={{ color: '#e31e24', fontWeight: '900', fontSize: '20px', fontStyle: 'italic' }}>Przelewy</span>
                            <span style={{ color: '#555', fontWeight: '400', fontSize: '20px', fontStyle: 'italic' }}>24</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '60px',
                paddingTop: '30px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                fontSize: '14px',
                color: '#999'
            }}>
                <img src={logo} alt="Bitgits Logo" style={{ height: '40px', marginBottom: '20px', filter: 'grayscale(1)', opacity: 0.5 }} />
                <p>© {new Date().getFullYear()} Bitgits - Wszystkie prawa zastrzeżone.</p>
            </div>
        </footer>
    );
};

const headerStyle = {
    fontSize: '18px',
    fontWeight: '800',
    marginBottom: '25px',
    color: '#000',
    textTransform: 'none'
};

const contentStyle = {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.6'
};

const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
};

const linkStyle = {
    color: '#666',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'color 0.2s ease'
};

export default Footer;
