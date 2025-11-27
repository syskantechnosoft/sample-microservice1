import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/customers/login', { email, password });
            sessionStorage.setItem('token', res.data);
            sessionStorage.setItem('user', email);
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Login Error:', err);
            let errorMessage = 'Login failed';
            if (err.response) {
                errorMessage += ` (${err.response.status}): ${err.response.data?.message || err.response.statusText || 'Invalid credentials'}`;
            } else {
                errorMessage += `: ${err.message}`;
            }
            alert(errorMessage);
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
                    <button type="submit" className="btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
