import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCertificate, FaCheck, FaAward, FaBrain } from 'react-icons/fa';

const CertContainer = styled.section`
  min-height: 100vh;
  max-height: 100vh;
  padding: clamp(2rem, 5vw, 4rem);
  position: relative;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  overflow-y: auto;

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
`;

const Title = styled(motion.h2)`
  color: #64ffda;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 3rem;
  text-align: center;
  font-family: 'Fira Code', monospace;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #64ffda, transparent);
    border-radius: 2px;
  }
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem; /* Add bottom padding for better scrolling experience */
`;

const Badge = styled(motion.div)`
  background: rgba(17, 34, 64, 0.95);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(45deg, #64ffda, #1a6dff);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const BadgeIcon = styled.div`
  color: #64ffda;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  position: relative;
  filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.3));
  
  &::after {
    content: '';
    position: absolute;
    width: 180%;
    height: 180%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, transparent 70%);
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.2; }
    100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
  }
`;

const BadgeTitle = styled.h3`
  color: #e6f1ff;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  letter-spacing: -0.02em;
  
  background: linear-gradient(120deg, #e6f1ff, #64ffda);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BadgeIssuer = styled.div`
  color: #8892b0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const BadgeDate = styled.div`
  color: #64ffda;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  opacity: 0.8;
  position: relative;
  display: inline-block;
  padding: 0.25rem 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(100, 255, 218, 0.1);
    border-radius: 4px;
    z-index: -1;
  }
`;

const certifications = [
  {
    title: 'AI Aware',
    issuer: 'Infosys',
    date: '2025',
    icon: <FaBrain />
  },
  {
    title: 'CEHV12',
    issuer: 'EC-Council',
    date: '2024',
    icon: <FaCertificate />
  },
  {
    title: 'VMDR (Qualys)',
    issuer: 'Qualys',
    date: '2023',
    icon: <FaCheck />
  },
  {
    title: 'CCNA',
    issuer: 'Institute Level',
    date: '2024',
    icon: <FaAward />
  }
];

const CertificationsSection = () => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const badge = event.currentTarget;
    const rect = badge.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    badge.style.setProperty('--mouse-x', `${x}%`);
    badge.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <CertContainer id="certifications">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Certifications & Achievements
      </Title>
      <BadgesGrid>
        {certifications.map((cert, index) => (
          <Badge
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 30px rgba(100, 255, 218, 0.15)'
            }}
            onMouseMove={handleMouseMove}
          >
            <BadgeIcon>{cert.icon}</BadgeIcon>
            <BadgeTitle>{cert.title}</BadgeTitle>
            <BadgeIssuer>{cert.issuer}</BadgeIssuer>
            <BadgeDate>{cert.date}</BadgeDate>
          </Badge>
        ))}
      </BadgesGrid>
    </CertContainer>
  );
};

export default CertificationsSection;