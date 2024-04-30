import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './services/api';
import { setCookie } from 'nookies';
import styles from './verificacao.module.css'; 

const VerificacaoLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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
            if (response.status === 200) {
                // Desestruturação dos dados
                const { token, refreshToken, is_admin: isAdmin, user_id: userId, company_id: companyId } = response.data;
                // Configuração dos cookies
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
        <div className={styles.container}>

            <h2>aceno</h2>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <label htmlFor="email"></label>
                <input type="text" id="email" name="email" placeholder="Email" className={styles.input} value={formData.email} onChange={handleOnChange} />
                <label htmlFor="password"></label>
                <input type="password" id="password" name="password" placeholder="Password" className={styles.input} value={formData.password} onChange={handleOnChange} />
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default VerificacaoLogin;
