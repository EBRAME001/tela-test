import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VerificacaoLogin from './VerificacaoLogin';
import SimpleTable from './assets/componentes/Tabela';

const App = () => {
    // Função para redirecionar o usuário para a tabela
    const redirectToTable = () => {
        window.location.href = 'http://localhost:5173/tabela'; // Redirecionamento para a rota da tabela
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Passa a função redirectToTable como propriedade para o componente VerificacaoLogin */}
                    <Route path="/" element={<VerificacaoLogin redirect={redirectToTable} />} />
                    <Route path="/tabela" element={<SimpleTable />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
