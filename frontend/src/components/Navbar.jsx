import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="glass-panel" style={{ margin: '20px', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NeoBank</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                {!token ? (
                    <>
                        <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
