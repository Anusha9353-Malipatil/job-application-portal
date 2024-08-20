import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            style={{
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                }
            }}
        >
            <div style={{ marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333333' }}>{job?.company?.name}</h1>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{job?.location || 'India'}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{job?.title}</h1>
                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{job?.description}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                <Badge style={{ backgroundColor: '#007BFF', color: '#ffffff', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {job?.position} Positions
                </Badge>
                <Badge style={{ backgroundColor: '#FF6F61', color: '#ffffff', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {job?.jobType}
                </Badge>
                <Badge style={{ backgroundColor: '#6F42C1', color: '#ffffff', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

// Badge Component
const Badge = ({ style, children }) => {
    return (
        <span style={{ ...style, display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem' }}>
            {children}
        </span>
    );
};

export default LatestJobCards;
