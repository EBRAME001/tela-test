import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./tabela.css";

interface Queue {
    id: number;
    name: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

const SimpleTable = () => {
    const [queues, setQueues] = useState<Queue[]>([]);
    const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);
    const [showLess, setShowLess] = useState<boolean>(false);

    useEffect(() => {
        api.get('queues')
            .then((res) => {
                console.log('Dados recebidos da API:', res.data);
                setQueues(res.data);
            })
            .catch((err) => console.log('Erro ao buscar dados da API:', err));
    }, []);

    const handleQueueClick = (queue: Queue) => {
        setSelectedQueue(queue);
        setShowLess(false);
    };

    const handleShowLessClick = () => {
        setShowLess(true);
    };

    const handleShowMoreClick = () => {
        if (selectedQueue) {
            // Redirecionar para a URL com o ID da fila
            window.location.href = `http://localhost/queues/${selectedQueue.id}/tickets`;
        }
    };

    return (
        <div>
            <table>
                <thead>
                <tr className="header-tabela">
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
                </thead>
                <tbody>
                {queues.map((queue: Queue) => (
                    <tr key={queue.id}>
                        <td>{queue.id}</td>
                        <td onClick={() => handleQueueClick(queue)}>{queue.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {!showLess && selectedQueue && (
                <div className="dados-adicionais">
                    <h2>Detalhes da Fila</h2>
                    <div>
                        <p>ID: {selectedQueue.id}</p>
                        <p>Nome: {selectedQueue.name}</p>
                        <p>ID da Empresa: {selectedQueue.company_id}</p>
                        <p>Data de Criação: {selectedQueue.created_at}</p>
                        <p>Data de Atualização: {selectedQueue.updated_at}</p>
                    </div>
                </div>
            )}

            {!showLess && (
                <div className="botoes-container">
                    <button onClick={handleShowLessClick}>Exibir Menos</button>
                    {selectedQueue && (
                        <button onClick={handleShowMoreClick}>Ver Mais</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SimpleTable;
