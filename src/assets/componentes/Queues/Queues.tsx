import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";

interface Queue {
    id: number;
    name: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

const Queues = () => {
    const { id } = useParams<{ id: string }>();
    const [queue, setQueue] = useState<Queue | null>(null); 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`queues/${id}`);
                console.log('Dados recebidos da API:', response.data);
                setQueue(response.data);
            } catch (error) {
                console.log('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {queue ? (
                <div>
                    <h2>Detalhes da Fila</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>ID da Empresa</th>
                            <th>Data de Criação</th>
                            <th>Data de Atualização</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{queue.id}</td>
                            <td>{queue.name}</td>
                            <td>{queue.company_id}</td>
                            <td>{queue.created_at}</td>
                            <td>{queue.updated_at}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Queues;
