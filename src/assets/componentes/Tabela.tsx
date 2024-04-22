import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

const SimpleTable = () => {
    const [queues, setQueues] = useState([]);
    const [selectedQueue, setSelectedQueue] = useState(null);
    const [showLess, setShowLess] = useState(false); 

    useEffect(() => {
        api.get('queues')
            .then((res) => setQueues(res.data))
            .catch((err) => console.log('Erro ao buscar dados da API:', err));
    }, []);

    const handleQueueClick = (queue) => {
        setSelectedQueue(queue); 
        setShowLess(false); 
    }; 
    
    const handleShowLessClick = () => {
        setShowLess(true);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {queues.map((queue) => (
                        <tr key={queue.id}>
                            <td>{queue.id}</td>
                            <td onClick={() => handleQueueClick(queue)}>{queue.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedQueue && (
                <div>
                    {!showLess && <h2>Detalhes da Fila</h2>}
                    {!showLess && (
                        <div>
                            <p>ID: {selectedQueue.id}</p>
                            <p>Nome: {selectedQueue.name}</p>
                            <p>ID da Empresa: {selectedQueue.company_id}</p>
                            <p>Data de Criação: {selectedQueue.created_at}</p>
                            <p>Data de Atualização: {selectedQueue.updated_at}</p>
                        </div>
                    )}
                    {!showLess && <button onClick={handleShowLessClick}>Exibir Menos</button>}
                </div>
            )}
        </div>
    );
};

export default SimpleTable;
