import { useState } from 'react';
import './App.css';
import api from './services/api';

const VerificacaoLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOnSubmit = async (e : any) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);

        const response = await api.post('login', {
            email: formData.username,
            password: formData.password
        })
        console.log(response)
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
}

export default VerificacaoLogin;
