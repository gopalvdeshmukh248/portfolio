import { useRef } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

import type { Mesh } from 'three';

const SkillsContainer = styled.section`
  min-height: 100vh;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: flex-start;
    padding-top: 3rem;
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: clamp(400px, 60vh, 600px);
  max-width: min(1000px, 90vw);

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const Title = styled(motion.h2)`
  color: #64ffda;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const skills = [
  { name: 'Log Analysis', color: '#64ffda' },
  { name: 'Incident Response', color: '#ff5555' },
  { name: 'Threat Intelligence', color: '#50fa7b' },
  { name: 'SIEM', color: '#bd93f9' },
  { name: 'Vulnerability Management', color: '#ffb86c' },
  { name: 'Networking', color: '#8be9fd' },
  { name: 'Security Protocols', color: '#ff79c6' },
  { name: 'Risk Assessment', color: '#f1fa8c' }
];

interface SkillProps {
  name: string;
  color: string;
  angle: number;
  distance: number;
}

const Skill = ({ name, color, angle, distance }: SkillProps) => {
  const ref = useRef<Mesh>(null);

  return (
    <Float
      speed={5}
      rotationIntensity={0.5}
      floatIntensity={2}
      position={[
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
        0
      ]}
    >
      <Text
        ref={ref}
        color={color}
        fontSize={0.5}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="left"
        font="/fonts/Inter-Bold.woff"
      >
        {name}
      </Text>
    </Float>
  );
};

const SkillsOrbit = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {skills.map((skill, i) => (
        <Skill
          key={i}
          name={skill.name}
          color={skill.color}
          angle={(i / skills.length) * Math.PI * 2}
          distance={3}
        />
      ))}
    </>
  );
};

const SkillsSection = () => {
  return (
    <SkillsContainer id="skills">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technical Expertise
      </Title>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <SkillsOrbit />
        </Canvas>
      </CanvasContainer>
    </SkillsContainer>
  );
};

export default SkillsSection;