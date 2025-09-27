import React from 'react';
import { CSSProperties } from 'react';

const LyzrAgentEmbedPage: React.FC = () => {
  const agentUrl = "https://v0-kodr-agent-showcase.vercel.app/kodr";

  // Full page style (black background)
  const pageContainerStyle: CSSProperties = {
    backgroundColor: '#000000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#E0E0E0',
  };

  // DIV wrapper style (the "black UI" frame)
  const embedWrapperStyle: CSSProperties = {
    backgroundColor: '#111111',
    padding: '20px',
    border: '1px solid #333333',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '1000px',
    height: '700px', // Fixed height for the embed
    marginTop: '50px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.7)',
  };

  // Iframe style
  const iframeStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'black',
  };

  return (
    <div style={pageContainerStyle}>
      <h1>Lyzr AI Agent Embedded</h1>
      <p>The agent is visible and interactive below (it remains in frame).</p>
      
      {/* This is the DIV containing the Iframe. 
        It allows the agent to load and remain visible.
      */}
      <div id="lyzr-agent-container" style={embedWrapperStyle}>
        <iframe
          src={agentUrl}
          title="Lyzr AI Agent"
          style={iframeStyle}
          allow="clipboard-write; fullscreen"
        />
      </div>

      {/* If you want a clickable link, use a standard link OUTSIDE the embed, 
        or only wrap a specific area.
      */}
      <a 
        href={agentUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: '#00FFFF', marginTop: '20px' }}
      >
        Click here to open the agent in a new tab.
      </a>
    </div>
  );
};

export default LyzrAgentEmbedPage;