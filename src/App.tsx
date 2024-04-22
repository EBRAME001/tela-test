import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VerificacaoLogin from './VerificacaoLogin';
import SimpleTable from './assets/componentes/Tabela';
import { api } from './services/api';

const App = () => {

    const id = {}
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VerificacaoLogin id={id} />} />
                    <Route path="/tabela" element={<SimpleTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;