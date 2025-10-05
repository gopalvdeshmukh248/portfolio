import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const typeWriter = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;


const EducationContainer = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Terminal = styled(motion.div)`
  background: rgba(17, 34, 64, 0.85);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 
    0 16px 48px -12px rgba(100,255,218,0.10),
    0 2px 8px rgba(2,12,27,0.15);
  border: 1.5px solid #233554;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow-y: auto;
  max-height: 80vh;
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

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  &:hover {
    box-shadow: 
      0 20px 60px -12px rgba(100,255,218,0.15),
      0 4px 12px rgba(2,12,27,0.20);
    transform: translateY(-2px);
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1.5px solid rgba(35, 53, 84, 0.8);
  backdrop-filter: blur(5px);
`;

const Dot = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
  box-shadow: 0 0 6px ${props => props.color}80;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px ${props => props.color}90;
  }

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const TerminalTitle = styled.div`
  color: #A8B2D1;
  margin-left: 1rem;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Line = styled(motion.div)`
  color: #fff;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  font-size: 1.1rem;
  letter-spacing: 0.3px;
  text-shadow: 0 0 5px rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
  }

  &.command {
    color: #fff;
    font-weight: bold;
    position: relative;
    padding: 0.3rem 0;
    opacity: 0.9;
    animation: ${slideIn} 0.5s ease-out forwards;
  }

  &.output {
    color: #00ff00;
    margin-left: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.4px;
    animation: ${typeWriter} 0.5s ease-out forwards;
    animation-delay: var(--delay, 0s);

    @media (max-width: 768px) {
      margin-left: 0.8rem;
    }
  }

  &.skill {
    color: #00ff00;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.4px;
    position: relative;
    padding-left: 0.5rem;
    opacity: 0;
    animation: typeWriter 0.5s ease-out forwards;
    animation-delay: var(--delay, 0s);

    &::before {
      content: '>';
      position: absolute;
      left: -0.8rem;
      color: #00ff00;
      opacity: 0.7;
    }

    &:hover {
      transform: translateX(10px);
      text-shadow: 0 0 12px rgba(0, 255, 0, 0.4);
      filter: brightness(1.2);
    }

    @media (max-width: 768px) {
      margin-left: 0.8rem;
      &::before {
        left: -0.6rem;
      }
    }
  }

`;

// Static data for education terminal

const EducationSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const totalLines = 20; // Total number of lines in the terminal

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => (prev < totalLines ? prev + 1 : prev));
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const lines = [
    { type: "command", text: "root@localhost:~# whoami", delay: 0 },
    { type: "output", text: "Gopal", delay: 0.2 },
    { type: "command", text: "root@localhost:~# cat btech.txt", delay: 0.6 },
    { type: "output", text: "University: Dr. Babasaheb Ambedkar Technological University, Lonere", delay: 0.6 },
    { type: "output", text: "Degree: Bachelor of Technology", delay: 0.8 },
    { type: "output", text: "Location: Sambhajinagar", delay: 1.0 },
    { type: "output", text: "Duration: 2019 - 2022", delay: 1.2 },
    { type: "command", text: "root@localhost:~# cat diploma.txt", delay: 1.4 },
    { type: "output", text: "College: Goverment Polytechnic, Jalna", delay: 0.6 },
    { type: "output", text: "Diploma: Bachelor of Technology", delay: 0.8 },
    { type: "output", text: "Location: Jalna", delay: 1.0 },
    { type: "output", text: "Duration: 2015 - 2018", delay: 1.2 },
    
  ];

  return (
    <EducationContainer id="education">
      <Terminal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
          <TerminalTitle>education.sh -- /root/education</TerminalTitle>
        </TerminalHeader>
        <div>
          {lines.slice(0, visibleLines).map((line, index) => (
            <Line 
              key={index}
              className={line.type}
              style={{ 
                color: line.type === 'command' ? '#ffffff' : '#00ff00',
                animationDelay: `${line.delay}s`
              }}
            >
              {line.type === 'skill' ? '> ' : ''}{line.text}
            </Line>
          ))}
        </div>
      </Terminal>
    </EducationContainer>
  );
};

export default EducationSection;