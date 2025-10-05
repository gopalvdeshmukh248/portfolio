import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from '../3d/Globe';
import { motion } from 'framer-motion';

const HomeContainer = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  padding: clamp(1rem, 5vw, 2rem);
  z-index: 1;
  color: #e6f1ff;
  max-width: min(600px, 90vw);
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
`;

const GlobeContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 350px;
  max-width: 800px;
  height: 100vh;
  /* Responsive adjustments */
  @media (max-width: 900px) {
    display: none;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  color: #64ffda;
  white-space: pre-wrap;
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Role = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #8892b0;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #8892b0;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
`;

const TextCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #64ffda;
  margin-left: 5px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const HomeSection = () => {
  const handleDownloadCV = () => {
    // TODO: Implement CV download
    console.log('Downloading CV...');
  };

  return (
    <HomeContainer id="home">
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          &gt; Welcome, I'm Gopal Deshmukh<TextCursor />
        </Title>
        <Role
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SOC Analyst & Cybersecurity Professional
        </Role>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          &gt; System Status: Secure_
          <br />
          &gt; Environment: Operational_
          <br />
          &gt; Mission: Protecting Digital Assets_
        </Description>
        <Button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={handleDownloadCV}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download CV
        </Button>
      </Content>
      <GlobeContainer>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Globe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </GlobeContainer>
    </HomeContainer>
  );
};

export default HomeSection;