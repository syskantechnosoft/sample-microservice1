import { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return { backgroundColor: '#10b981', color: 'white' };
            case 'error':
                return { backgroundColor: '#ef4444', color: 'white' };
            case 'info':
                return { backgroundColor: '#3b82f6', color: 'white' };
            default:
                return { backgroundColor: '#6b7280', color: 'white' };
        }
    };

    return (
        <div 
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 20px',
                borderRadius: '8px',
                zIndex: 1000,
                maxWidth: '400px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                ...getTypeStyles()
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{message}</span>
                <button 
                    onClick={onClose}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'inherit', 
                        fontSize: '18px', 
                        cursor: 'pointer',
                        marginLeft: '10px'
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast;