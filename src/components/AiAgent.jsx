import React, { useState } from 'react';

// Placeholder for the persistent AI Agent component
function AiAgent() {
  const [isOpen, setIsOpen] = useState(true); // Example state: visibility
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]); // To hold conversation history
  const [selectedModel, setSelectedModel] = useState('claude'); // Default model

  // Placeholder function for sending message to backend AI proxy
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate API call and response
    console.log(`Sending to backend (Model: ${selectedModel}): ${userMessage.text}`);
    // Replace with actual API call later, e.g., using fetch or axios
    // const response = await fetch('/api/ai', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ model: selectedModel, prompt: userMessage.text })
    // });
    // const data = await response.json();
    // const aiResponse = { sender: 'ai', text: data.reply };

    // Dummy response for now
    const aiResponse = { 
        sender: 'ai', 
        text: `Dummy response from ${selectedModel}: You said '${userMessage.text}'` 
    };
    setMessages(prev => [...prev, aiResponse]);
  };

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)} className="ai-agent-toggle">Open AI Agent</button>;
  }

  return (
    <div className="ai-agent-container" style={styles.container}> {/* Basic inline styles for now */}
      <div style={styles.header}>
        <span>AI Agent</span>
        <button onClick={() => setIsOpen(false)} style={styles.closeButton}>X</button>
      </div>
      <div style={styles.messageArea}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
         <select 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)}
            style={styles.select}
        >
          <option value="claude">Claude 3.7</option>
          <option value="gpt">GPT-3</option> 
          <option value="gemini">Gemini 2.5</option>
        </select>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask AI..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}

// Basic inline styles - move to CSS later
const styles = {
    container: { position: 'fixed', bottom: '20px', right: '20px', width: '300px', height: '400px', border: '1px solid #ccc', backgroundColor: 'white', display: 'flex', flexDirection: 'column', zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' },
    header: { padding: '10px', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc' },
    messageArea: { flexGrow: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
    userMessage: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', padding: '5px 10px', borderRadius: '5px' },
    aiMessage: { alignSelf: 'flex-start', backgroundColor: '#eee', padding: '5px 10px', borderRadius: '5px' },
    inputArea: { display: 'flex', padding: '10px', borderTop: '1px solid #ccc' },
    input: { flexGrow: 1, padding: '8px', marginRight: '5px' },
    select: { marginRight: '5px'},
    sendButton: { padding: '8px 12px' },
    closeButton: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }
};

export default AiAgent; 