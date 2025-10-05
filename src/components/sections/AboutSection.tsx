import { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: clamp(1rem, 5vw, 2rem);
  display: flex;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Terminal = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.95) 0%,
    rgba(10, 25, 47, 0.85) 100%
  );
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 2rem);
  width: 100%;
  max-width: min(800px, 90vw);
  margin: 0 auto;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(180%);
  overflow-y: auto;
  max-height: 80vh;
  cursor: text;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #233554;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #64ffda;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #233554;
`;

const Dot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const TerminalTitle = styled.div`
  color: #8892b0;
  margin-left: 1rem;
  font-family: 'Courier New', monospace;
`;

const Line = styled(motion.div)`
  color: #fff;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
  text-shadow: 0 0 5px rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  width: 100%;
  
  &.command {
    color: #fff;
    font-weight: bold;
    position: relative;
  }
  
  &.output {
    color: #00ff00;
    margin-left: 1rem;
  }
  
  &.skill {
    color: #ffd700;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(10px);
      text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
    }
  }
`;

const AboutSection = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  return (
    <AboutContainer id="about">
      <Terminal
        ref={terminalRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
          <TerminalTitle>about.txt -- /root</TerminalTitle>
        </TerminalHeader>
        <div>
          {/* Static root terminal output */}
          <Line className="command" style={{ color: '#ffffff' }}>root@localhost:~# whoami</Line>
          <Line className="output" style={{ color: '#00ff00' }}>Gopal-SOC Analyst &amp; Cybersecurity Professional</Line>
          <Line className="command" style={{ color: '#ffffff' }}>root@localhost:~# cat about.txt</Line>
          <Line className="output" style={{ color: '#00ff00' }}>Results-driven SOC Analyst with CEHv12 certification and strong networking expertise.</Line>
          <Line className="output" style={{ color: '#00ff00' }}>Skilled in threat detection, incident response, and vulnerability management.</Line>
          <Line className="output" style={{ color: '#00ff00' }}>Leverages AI tools to boost efficiency and accelerate learning.</Line>
          <Line className="output" style={{ color: '#00ff00' }}>Committed to continuous growth through collaboration and proactive security analysis to safeguard infrastructure.</Line>
          <Line className="command" style={{ color: '#ffffff' }}>root@localhost:~# ls -la skills/</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt;  Log Analysis</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt; Incident Response</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt; Threat Detection</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt; SIEM</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt; Networking</Line>
          <Line className="skill" style={{ color: '#00ff00' }}>&gt; Vulnerability Management</Line>
        </div>
      </Terminal>
    </AboutContainer>
  );
};

export default AboutSection;