import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import Tickets from './Tickets/Tickets';

interface Ticket {
  id: string;
  title: string;
  active_stage: string | null;
  priority: string;
  coverage_time: number | null;
}

const Queues = () => {
    const { id } = useParams<{ id: string }>();
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`queues/${id}/tickets`);
                console.log('Dados recebidos da API:', response.data);
                setTickets(response.data);
            } catch (error) {
                console.log('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <Tickets tickets={tickets} />
        </div>
    );
};

export default Queues;
