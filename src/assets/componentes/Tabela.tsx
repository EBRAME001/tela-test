import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./tabela.module.css"; // Importação atualizada

interface Queue {
    id: number;
    name: string;
    company_id: number;
    created_at: string;
    updated_at: string;
}

const Tabela = () => {
    const [queues, setQueues] = useState<Queue[]>([]);

    useEffect(() => {
        api.get('queues')
            .then((res) => {
                console.log('Dados recebidos da API:', res.data);
                setQueues(res.data);
            })
            .catch((err) => console.log('Erro ao buscar dados da API:', err));
    }, []);

    return (
        <div>
            <table className={styles.tabela}>
                <thead>
                <tr className={styles.headerTabela}>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Detalhes</th>
                </tr>
                </thead>
                <tbody>
                {queues.map((queue: Queue) => (
                    <tr key={queue.id}>
                        <td>{queue.id}</td>
                        <td>{queue.name}</td>
                        <td><Link to={`/queues/${queue.id}`}>Ver Detalhes</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabela;
