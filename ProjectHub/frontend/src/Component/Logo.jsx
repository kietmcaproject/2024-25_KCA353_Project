import React from 'react';

const Logo = () => {
    const styles = {
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
          
 
        },
        logo: {
            width: '80px',
            height: '80px',
            position: 'relative',
            marginRight: '20px',
        },
        logoSquare: {
            width: '60px',
            height: '60px',
            border: '6px solid #555',
            position: 'absolute',
            top: '7px',
            left: '7px',
            transform: 'rotate(45deg)',
        },
        logoPillar: {
            width: '15px',
            position: 'absolute',
            bottom: '12px',
            backgroundColor: '#0099ff',
        },
        pillar1: {
            height: '40px',
            left: '22px',
            backgroundColor: '#0077cc',
        },
        pillar2: {
            height: '55px',
            left: '33px',
        },
        pillar3: {
            height: '40px',
            left: '44px',
            backgroundColor: '#00bbff',
        },
        logoText: {
            fontSize: '28px',
            color: '#0099ff',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.logoContainer}>
            <div style={styles.logo}>
                <div style={styles.logoSquare}></div>
                <div style={{ ...styles.logoPillar, ...styles.pillar1 }}></div>
                <div style={{ ...styles.logoPillar, ...styles.pillar2 }}></div>
                <div style={{ ...styles.logoPillar, ...styles.pillar3 }}></div>
            </div>
            <div style={styles.logoText}>project hub</div>
        </div>
    );
};

export default Logo;
