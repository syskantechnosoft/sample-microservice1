import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/customers/login', { email, password });
            sessionStorage.setItem('token', res.data);
            sessionStorage.setItem('user', email);
            
            showToast('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } catch (err) {
            console.error('Login Error:', err);
            let errorMessage = 'Invalid credentials';
            if (err.response) {
                errorMessage = err.response.data?.message || err.response.statusText || 'Invalid credentials';
            } else {
                errorMessage = err.message;
            }
            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div className="glass-panel card" style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <LoadingSpinner size="20px" /> : 'Login'}
                    </button>
                </form>
            </div>
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </div>
    );
};

export default Login;
