import styled from 'styled-components';
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCloud, FaDesktop, FaLock, FaSearch, FaCog, FaBolt } from 'react-icons/fa';

const ToolsContainer = styled.section`
  min-height: 100vh;
  max-height: 100vh;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  position: relative;
  overflow-y: auto;
  background: rgba(10, 25, 47, 0.95);
  color: #ccd6f6;
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-track {
    background: rgba(17, 34, 64, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #64ffda;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background: #9fffeb;
    }
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #64ffda rgba(17, 34, 64, 0.5);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(26px, 5vw, 32px);
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #64ffda;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem; /* Add padding at the bottom for better scrolling experience */
`;

const ToolCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.75);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #233554;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px rgba(100, 255, 218, 0.2);
    border-color: #64ffda;
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ToolIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #64ffda;
  display: flex;
  align-items: center;
`;

const ToolName = styled.h3`
  font-size: 1.25rem;
  color: #e6f1ff;
  margin: 0;
`;

const ToolDescription = styled.p`
  color: #8892b0;
  font-size: 0.95rem;
  line-height: 1.6;
`;

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const ToolsSection: React.FC = () => {
  const tools: Tool[] = [
    {
      name: "QRadar",
      description: "IBM's SIEM platform for centralized log management, threat detection, and incident analysis through real-time correlation and behavioral analytics.",
      icon: <FaShieldAlt />
    },
    {
      name: "Microsoft Sentinel",
      description: "Cloud-native SIEM and SOAR solution that provides intelligent security analytics, threat detection, and automated response across hybrid environments.",
      icon: <FaCloud />
    },
    {
      name: "Microsoft Defender",
      description: "Comprehensive endpoint protection suite offering real-time threat prevention, detection, investigation, and response capabilities across devices and identities.",
      icon: <FaDesktop />
    },
    {
      name: "CrowdStrike Falcon",
      description: "Cloud-delivered endpoint protection platform leveraging AI and behavioral analytics to detect, prevent, and respond to advanced threats with minimal system impact.",
      icon: <FaBolt />
    },
    {
      name: "Azure Security Center",
      description: "Unified infrastructure security management system that strengthens cloud posture, provides threat protection, and ensures compliance across Azure and hybrid workloads.",
      icon: <FaLock />
    },
    {
      name: "Qualys",
      description: "Cloud-based vulnerability management and compliance platform that continuously scans assets to identify security risks and misconfigurations across IT environments.",
      icon: <FaSearch />
    },
    {
      name: "XSOAR",
      description: "Security orchestration and automated response platform for incident management and response automation.",
      icon: <FaCog />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ToolsContainer id="tools">
      <Title>Security Arsenal</Title>
      <ToolsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            variants={itemVariants}
          >
            <ToolHeader>
              <ToolIcon>{tool.icon}</ToolIcon>
              <ToolName>{tool.name}</ToolName>
            </ToolHeader>
            <ToolDescription>{tool.description}</ToolDescription>
          </ToolCard>
        ))}
      </ToolsGrid>
    </ToolsContainer>
  );
};
