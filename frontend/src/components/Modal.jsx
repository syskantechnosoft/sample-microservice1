const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="glass-panel" style={{
                width: '90%',
                maxWidth: '400px',
                padding: '24px',
                borderRadius: '12px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>{title}</h3>
                    <button 
                        onClick={onClose}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: 'var(--text-main)', 
                            fontSize: '24px', 
                            cursor: 'pointer' 
                        }}
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;