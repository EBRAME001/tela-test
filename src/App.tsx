import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import VerificacaoLogin from './VerificacaoLogin';
import Tabela from './assets/componentes/Tabela';
import Queues from './assets/componentes/Queues/Queues';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VerificacaoLogin />} />
                    <Route path="/tabela" element={<Tabela />} />
                    <Route path="/queues/:id" element={<Queues />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
