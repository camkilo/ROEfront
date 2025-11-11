import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Handle login
                // Example: await loginUser(email, password);
            } else {
                // Handle account creation
                // Example: await createUser(email, password);
            }
            // Reset form fields
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Need an account? Create one' : 'Already have an account? Login'}</button>
        </div>
    );
};

export default LoginPage;