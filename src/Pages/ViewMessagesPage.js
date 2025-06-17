import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewMessagesPage.css';

function ViewMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('https://server-l1gu.onrender.com/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="messages-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          ← Back to Admin
        </button>
        <h2>Messages Received</h2>
      </div>

      {messages.length ? (
        <table className="messages-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Message</th><th>Sent At</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, idx) => {
              const isExpanded = expandedId === msg.id;
              const displayMsg = isExpanded ? msg.message : msg.message.split('\n')[0].slice(0, 60) + '...';

              return (
                <tr key={msg.id}>
                  <td>{idx + 1}</td>
                  <td>{msg.sender_name}</td>
                  <td>{msg.sender_email}</td>
                  <td className="msg-cell">
                    {displayMsg}
                    {msg.message.length > 60 && (
                      <button className="toggle-btn" onClick={() => toggleExpand(msg.id)}>
                        {isExpanded ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </td>
                  <td>{new Date(msg.sent_at).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="no-messages">No messages found.</div>
      )}
    </div>
  );
}

export default ViewMessagesPage;
