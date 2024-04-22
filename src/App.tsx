import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VerificacaoLogin from './VerificacaoLogin';
import SimpleTable from './assets/Tabela';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VerificacaoLogin />} />
                    <Route path="/tabela" element={<SimpleTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;