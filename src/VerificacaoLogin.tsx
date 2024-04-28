import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { api } from './services/api';
import { setCookie } from 'nookies';

const VerificacaoLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('login', formData);
            console.log(response);
            if (response.status === 200) {
                const { token, refreshToken, is_admin: isAdmin, user_id: userId, company_id: companyId } = response.data;

                setCookie(null, 'aceno.token', token, { maxAge: 30 * 24 * 60 * 60, path: '/' });
                setCookie(null, 'aceno.refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60, path: '/' });
                setCookie(null, 'aceno.userId', userId, { maxAge: 30 * 24 * 60 * 60, path: '/' });
                setCookie(null, 'aceno.companyId', companyId, { maxAge: 30 * 24 * 60 * 60, path: '/' });
                setCookie(null, 'aceno.isAdmin', isAdmin, { maxAge: 30 * 24 * 60 * 60, path: '/' });

                api.defaults.headers.Authorization = `Bearer ${token}`;
                navigate('/tabela');
            }
        } catch (error) {
            console.log('Erro ao efetuar login:', error);
        }
    };

    return (
        <div id="container">
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleOnChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleOnChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default VerificacaoLogin;
