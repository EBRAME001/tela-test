import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import "./Tickets.css"; 

interface Ticket {
    id: string;
    title: string;
    active_stage: string | null;
    priority: string;
    coverage_time: number | null;
}

const Tickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get(`tickets`); // Ajuste a URL conforme necessário
                setTickets(response.data);
            } catch (error) {
                console.error('Erro ao buscar tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="tickets-grid">
            {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                    <h3>{ticket.title}</h3>
                    <p>Prioridade: {ticket.priority}</p>
                    <p>Estágio Ativo: {ticket.active_stage || "Nenhum"}</p>
                    <p>Tempo de Cobertura: {ticket.coverage_time ? `${ticket.coverage_time} minutos` : "Não especificado"}</p>
                </div>
            ))}
        </div>
    );
};

export default Tickets;
