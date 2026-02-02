import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="section-padding" style={{
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-primary)',
            marginTop: '60px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 3-Image Background Layout */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                zIndex: 0,
                opacity: 0.85
            }}>
                <div style={{ background: 'url(/hero_1.png) center/cover no-repeat', borderRight: '1px solid rgba(0,0,0,0.05)' }} />
                <div style={{ background: 'url(/hero_2.png) center/cover no-repeat', borderRight: '1px solid rgba(0,0,0,0.05)' }} />
                <div style={{ background: 'url(/hero_3.png) center/cover no-repeat' }} />
            </div>

            {/* Content Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(254, 254, 250, 0.4)', // Soft overlay to keep text readable
                backdropFilter: 'blur(2px)',
                zIndex: 1
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span style={{
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '18px',
                        fontWeight: '900',
                        color: 'var(--primary-color)',
                        display: 'block',
                        marginBottom: '20px',
                        textShadow: '0 2px 4px rgba(255,255,255,0.8)'
                    }}>
                        Naturalne Smakołyki Premium
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 10vw, 5.5rem)',
                        fontWeight: '900',
                        lineHeight: '1.05',
                        marginBottom: '32px',
                        color: 'var(--text-primary)',
                        letterSpacing: '-1.5px',
                        textShadow: '0 2px 10px rgba(255,255,255,0.9)'
                    }}>
                        Odkryj smak <br /> <span style={{ color: 'var(--primary-color)' }}>prawdziwej natury</span>
                    </h1>
                    <p style={{
                        fontSize: '24px',
                        color: 'var(--text-primary)',
                        maxWidth: '750px',
                        margin: '0 auto 48px',
                        lineHeight: '1.6',
                        fontWeight: '700',
                        textShadow: '0 1px 5px rgba(255,255,255,0.8)'
                    }}>
                        Ręcznie robione słodycze, liofilizowane owoce i jadalne kwiaty. Wyjątkowa jakość, którą poczujesz w każdym kęsie.
                    </p>
                    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/oferta" className="btn btn-primary" style={{ minWidth: '240px', boxShadow: '0 8px 30px rgba(211, 84, 0, 0.4)' }}>Zobacz Ofertę</Link>
                        <Link to="/o-nas" className="btn" style={{
                            border: '3px solid var(--primary-color)',
                            color: 'var(--primary-color)',
                            minWidth: '240px',
                            background: 'rgba(255,255,255,0.9)',
                            fontWeight: '900'
                        }}>O Nas</Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
