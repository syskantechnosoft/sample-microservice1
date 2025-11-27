import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [customer, setCustomer] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const api = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Customer Details
                const custRes = await api.get(`/customers/${userEmail}`);
                setCustomer(custRes.data);
                const customerId = custRes.data.id;

                // Get Accounts
                const accRes = await api.get(`/accounts/user/${customerId}`);
                setAccounts(accRes.data);

                // Get Loans
                const loanRes = await api.get(`/loans/user/${customerId}`);
                setLoans(loanRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const createAccount = async (type) => {
        try {
            await api.post('/accounts/create', {
                customerId: customer.id,
                accountType: type,
                initialDeposit: 1000
            });
            window.location.reload();
        } catch (err) {
            alert('Failed to create account');
        }
    };

    const applyLoan = async () => {
        try {
            await api.post('/loans/apply', {
                customerId: customer.id,
                amount: 50000,
                tenureMonths: 12
            });
            window.location.reload();
        } catch (err) {
            alert('Failed to apply loan');
        }
    };

    const handleDeposit = async (accountId) => {
        const amount = prompt('Enter deposit amount:');
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
            try {
                await api.post('/accounts/deposit', {
                    accountId: parseInt(accountId),
                    amount: parseFloat(amount)
                });
                window.location.reload();
            } catch (err) {
                alert('Deposit failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleWithdraw = async (accountId) => {
        const amount = prompt('Enter withdrawal amount:');
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
            try {
                await api.post('/accounts/withdraw', {
                    accountId: parseInt(accountId),
                    amount: parseFloat(amount)
                });
                window.location.reload();
            } catch (err) {
                alert('Withdrawal failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleEmiPayment = async (loanId) => {
        try {
            await api.post(`/loans/${loanId}/pay-emi`);
            alert('EMI payment successful!');
        } catch (err) {
            alert('EMI payment failed: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h2 style={{ marginBottom: '24px' }}>Hello, {customer?.name}</h2>

            <div className="grid-cols-2">
                {/* Accounts Section */}
                <div className="glass-panel card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Your Accounts</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => createAccount('SAVINGS')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>+ Savings</button>
                            <button onClick={() => createAccount('CURRENT')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>+ Current</button>
                        </div>
                    </div>
                    {accounts.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No accounts found.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {accounts.map(acc => (
                                <div key={acc.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{acc.accountType}</p>
                                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${acc.balance}</p>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {acc.id}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button 
                                            onClick={() => handleDeposit(acc.id)} 
                                            className="btn-primary" 
                                            style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#10b981' }}
                                        >
                                            Deposit
                                        </button>
                                        <button 
                                            onClick={() => handleWithdraw(acc.id)} 
                                            className="btn-primary" 
                                            style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#ef4444' }}
                                        >
                                            Withdraw
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Loans Section */}
                <div className="glass-panel card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Your Loans</h3>
                        <button onClick={applyLoan} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Apply Loan</button>
                    </div>
                    {loans.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No active loans.</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {loans.map(loan => (
                                <div key={loan.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loan Amount</p>
                                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${loan.amount}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>EMI: ${loan.emi}/mo</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{loan.status}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleEmiPayment(loan.id)} 
                                        className="btn-primary" 
                                        style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#3b82f6', width: '100%' }}
                                    >
                                        Pay EMI (${loan.emi})
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
