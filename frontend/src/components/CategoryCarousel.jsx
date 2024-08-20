import React from 'react';

const companies = [
    "NebulaTech",
    "QuantumShift",
    "NovaWorks",
    "FusionForge",
    "Celestial Innovations",
    "OrionLabs",
    "StellarVista",
    "ZenithTech",
    "AetherDynamics",
    "Eclipse Solutions"
];

const CompanyCarousel = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Top Companies</h2>
            <div style={styles.marqueeWrapper}>
                <div style={styles.marqueeContent}>
                    {companies.concat(companies).map((company, index) => (
                        <div key={index} style={styles.companyItem}>
                            <span style={styles.companyName}>{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        overflow: 'hidden',
        margin: '5rem auto',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        padding: '2rem 0',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '90%',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#333',
        marginBottom: '1.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    marqueeWrapper: {
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0 1rem',
        backgroundColor: '#f9f9f9', // White background to blend with container
        borderRadius: '10px', // Rounded corners
        maxWidth: '100%', // Full width to fit within the container
    },
    marqueeContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        animation: 'marquee 60s linear infinite',
    },
    companyItem: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0 1.5rem',
    },
    companyName: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
        padding: '0.5rem 1rem',
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }
};

// Keyframes for animation
const styleSheet = document.styleSheets[0];
const keyframes = `
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default CompanyCarousel;
