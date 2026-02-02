import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = ({ onOpenAdmin, onOpenUser, onOpenSearch, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pillStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: '100px',
    padding: '0 32px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1.5px solid rgba(211, 84, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: scrolled ? '10px' : '20px'
  };

  const iconButtonStyle = {
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 20px',
      pointerEvents: 'none'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: scrolled ? 'flex-start' : 'center',
        width: '100%',
        maxWidth: '1400px',
        pointerEvents: 'auto'
      }}>

        {/* Logo Pill */}
        <motion.div
          layout
          style={pillStyle}
        >
          <Link to="/" style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1.5px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            BITGITS<span style={{ color: 'var(--primary-color)' }}>.PL</span>
          </Link>
        </motion.div>

        {/* Desktop Menu Pill */}
        <motion.div
          layout
          className="desktop-menu"
          style={{
            ...pillStyle,
            gap: '32px',
            flex: scrolled ? 0 : 1,
            justifyContent: 'center',
            margin: '20px 24px 0 24px'
          }}
        >
          <Link to="/o-nas" className="nav-link">O Nas</Link>
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Link to="/oferta" className="nav-link">Oferta</Link>
          </div>
          <Link to="/prezenty" className="nav-link">Prezenty</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <button onClick={onOpenAdmin} className="admin-btn">Panel Admina</button>
        </motion.div>



        {/* Action Icons Pill */}
        <motion.div
          layout
          style={{ ...pillStyle, gap: '16px' }}
        >
          <motion.div onClick={onOpenSearch} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={iconButtonStyle}><Search size={22} /></motion.div>
          <motion.div onClick={onOpenUser} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={iconButtonStyle}><User size={22} /></motion.div>
          <motion.div onClick={onOpenCart} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} style={{ ...iconButtonStyle, position: 'relative' }}>
            <ShoppingCart size={22} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              background: 'var(--primary-color)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: '900',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(211, 84, 0, 0.4)'
            }}>0</span>
          </motion.div>

          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none' }}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </motion.div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100px',
              left: '20px',
              right: '20px',
              background: '#fff',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              border: '1px solid #eee',
              zIndex: 999
            }}
          >
            <Link to="/o-nas" className="nav-link" onClick={() => setMobileMenuOpen(false)}>O Nas</Link>
            <Link to="/oferta" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Oferta</Link>
            <Link to="/prezenty" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Prezenty</Link>
            <Link to="/blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <button onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }} className="admin-btn" style={{ width: 'fit-content' }}>Panel Admina</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          color: var(--text-primary);
          font-weight: 800;
          font-size: 16px;
          transition: color 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--primary-color);
        }
        .admin-btn {
          font-weight: 800;
          color: #fff;
          background: var(--primary-color);
          padding: 8px 18px;
          border-radius: 50px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 15px rgba(211, 84, 0, 0.25);
        }
        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(211, 84, 0, 0.35);
        }
        .mega-title {
          color: var(--text-primary);
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .mega-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
          padding: 0;
        }
        .mega-list a {
          color: #666;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          font-weight: 600;
        }
        .mega-list a:hover {
          color: var(--primary-color);
          padding-left: 5px;
        }
        @media (max-width: 1100px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; cursor: pointer; }
        }
      `}</style>
    </nav >
  );
};

export default Navbar;
