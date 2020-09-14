import React from 'react';

function Message({ message, setMessage }) {
  return (
    <div className="rating-message-container">
      <textarea
        placeholder="What made you feel that way?"
        className="text-area"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </div>
  );
}

export default Message;
