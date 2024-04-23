import React, { useState } from 'react';
import './App.css';
import { api } from './services/api';
import { setCookie } from 'nookies';

const VerificacaoLogin = ({ redirect }) => { // Adicione 'redirect' como propriedade
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleOnChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOnSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await api.post('login', {
                email: formData.username,
                password: formData.password
            });

            console.log(response);

            if (response.status === 200) {
                const { token: tokenResult, refreshToken: refreshTokenResult, is_admin: isAdminResult } = response.data;

                const refreshToken = refreshTokenResult?.id;
                const userId = refreshTokenResult?.user_id;
                const companyId = refreshTokenResult?.company_id;

                setCookie(undefined, 'aceno.token', tokenResult, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                });

                setCookie(undefined, 'aceno.refreshToken', refreshToken, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                });

                setCookie(undefined, 'aceno.userId', userId, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                });

                setCookie(undefined, 'aceno.companyId', companyId, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                });

                setCookie(undefined, 'aceno.isAdmin', isAdminResult, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                });

                api.defaults.headers.Authorization = `Bearer ${tokenResult}`;

                // Redirecionar para "http://localhost:5173/tabela" usando a função 'redirect'
                redirect('http://localhost:5173/tabela');
            }
        } catch (error) {
            console.log('Deu erro', error);
        }
    };

    return (
        <div>
            <div id={'container'}>
                <div id={'imagem'}></div>
                <div id="login">
                    <h1>aceno</h1>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type="text"
                            id='username'
                            name='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerificacaoLogin;
