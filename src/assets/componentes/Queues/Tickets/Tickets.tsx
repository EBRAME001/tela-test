import React, { useState } from 'react';

interface Ticket {
  id: string;
  title: string;
  active_stage: string | null;
  priority: string;
  coverage_time: number | null;
}

interface TicketsProps {
  tickets: Ticket[];
}

const Tickets: React.FC<TicketsProps> = ({ tickets }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {tickets.map(ticket => (
        <div 
          key={ticket.id} 
          style={{ 
            border: '1px solid gray', 
            padding: '20px', 
            width: hoveredId === ticket.id ? '270px' : '250px', 
            transform: hoveredId === ticket.id ? 'scale(1.1)' : 'none', 
            boxShadow: hoveredId === ticket.id ? '0 8px 16px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)', 
            transition: 'all 0.3s ease',
            zIndex: hoveredId === ticket.id ? 1 : 0 
          }}
          onMouseEnter={() => setHoveredId(ticket.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <h3>{ticket.title}</h3>
          <p><strong>Priority:</strong> {ticket.priority}</p>
          <p><strong>Coverage Time:</strong> {ticket.coverage_time ?? 'N/A'} minutes</p>
          <p><strong>Stage:</strong> {ticket.active_stage ?? 'None'}</p>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
