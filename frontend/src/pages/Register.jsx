import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/customers/register', { name, email, password });
            
            // Store JWT token and auto-login
            sessionStorage.setItem('token', response.data);
            sessionStorage.setItem('user', email);
            
            showToast('Registration successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } catch (err) {
            console.error("Registration Error:", err);
            let errorMessage = 'Registration failed';
            if (err.response) {
                errorMessage = err.response.data?.message || err.response.statusText || 'Server error';
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        {loading ? <LoadingSpinner size="20px" /> : 'Register'}
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

export default Register;
