import React, { useState } from 'react';
import styles from './ticket.module.css';

interface Ticket {
  id: string;
  title: string;
  active_stage: string | null;
  priority: string;
  coverage_time: number | null;
  company_id: string;
  created_at: string;
  finish_time: string;
  owner: {
    id: string;
    username: string;
  };
  description?: string;
}

interface TicketsProps {
  tickets: Ticket[];
}

const Tickets: React.FC<TicketsProps> = ({ tickets }) => {
  const [clickedId, setClickedId] = useState<string | null>(null);

  return (
    <div className={styles.containerBackground}>
      <div className={styles.ticketsContainer}>
        {tickets.map(ticket => (
          <div 
            key={ticket.id}
            className={clickedId === ticket.id ? `${styles.ticketCard} ${styles.ticketCardClicked}` : styles.ticketCard}
            onClick={() => setClickedId(clickedId === ticket.id ? null : ticket.id)}
          >
            <div className={styles.ticketContent}>
              <h3>{ticket.title}</h3>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Coverage Time:</strong> {ticket.coverage_time ?? 'N/A'} minutes</p>
              <p><strong>Stage:</strong> {ticket.active_stage ?? 'None'}</p>
              {clickedId === ticket.id && (
                <div>
                  <p><strong>Company ID:</strong> {ticket.company_id}</p>
                  <p><strong>Created at:</strong> {ticket.created_at}</p>
                  <p><strong>Finish Time:</strong> {ticket.finish_time}</p>
                  <p><strong>Owner:</strong> {ticket.owner.username}</p>
                  <p><strong>Description:</strong> {ticket.description}</p>
                  {/* Inclua mais campos conforme necessário */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
