import React from 'react';
import { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const LyzrAgentEmbedPage: React.FC = () => {
  const agentUrl = "https://v0-kodr-agent-showcase.vercel.app/kodr";

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

  const embedWrapperStyle: CSSProperties = {
    backgroundColor: '#111111',
    padding: '20px',
    border: '1px solid #333333',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '1000px',
    height: '700px',
    marginTop: '50px',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)',
    overflow: 'hidden',
  };

  const iframeStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'black',
    borderRadius: '8px',
  };

  const headingStyle: CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: '4rem',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  };

  const linkStyle: CSSProperties = {
    color: '#00FFFF',
    textDecoration: 'underline',
    marginTop: '10px',
    fontWeight: 500,
  };

  return (
    <div style={pageContainerStyle}>
      <motion.h1
        style={headingStyle}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        KODR AI Agent
      </motion.h1>

      <motion.a
        href={agentUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        whileHover={{ scale: 1.05, color: "#FF00FF" }}
        transition={{ duration: 0.3 }}
      >
        Click here to open in a new tab
      </motion.a>

      <motion.div
        id="lyzr-agent-container"
        style={embedWrapperStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <iframe
          src={agentUrl}
          title="Lyzr AI Agent"
          style={iframeStyle}
          allow="clipboard-write; fullscreen"
        />
      </motion.div>
    </div>
  );
};

export default LyzrAgentEmbedPage;
