import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending request to http://localhost:8080/api/customers/register");
            const response = await axios.post('http://localhost:8080/api/customers/register', { name, email, password });
            console.log("Response:", response);
            
            // Store JWT token and auto-login
            sessionStorage.setItem('token', response.data);
            sessionStorage.setItem('user', email);
            
            alert('Registration successful! You are now logged in.');
            window.location.href = '/dashboard';
        } catch (err) {
            console.error("Registration Error:", err);
            let errorMessage = 'Registration failed';
            if (err.response) {
                errorMessage += ` (${err.response.status}): ${err.response.data?.message || err.response.statusText || 'Server error'}`;
            } else {
                errorMessage += `: ${err.message}`;
            }
            alert(errorMessage);
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
                    <button type="submit" className="btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
