import styled from 'styled-components';
import { useState } from 'react';
import BootSequence from '../boot/BootSequence';
import MatrixBackground from '../boot/MatrixBackground';
import ParticleBackground from '../effects/ParticleBackground';
import HomeSection from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import SkillsSection from '../sections/SkillsSection';
import { ToolsSection } from '../sections/ToolsSection';
import CertificationsSection from '../sections/CertificationsSection';
import EducationSection from '../sections/EducationSection';
import ContactSection from '../sections/ContactSection';
import Navigation from './Navigation';
import StatusBar from './StatusBar';
import SecurityTerminal from '../interactive/SecurityTerminal';

const LayoutContainer = styled.div`
  background-color: rgba(10, 25, 47, 0.9);
  min-height: 100vh;
  color: #8892b0;
  position: relative;
`;

const Sidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: clamp(50px, 8vw, 60px);
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.95) 0%,
    rgba(10, 25, 47, 0.85) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1rem, 3vw, 2rem) 0;
  z-index: 10;
  backdrop-filter: blur(10px) saturate(180%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    4px 0 32px 0 rgba(0, 0, 0, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem;
    bottom: 0;
    top: auto;
  }
`;

const MainContent = styled.main`
  margin-left: clamp(50px, 8vw, 60px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 60px; /* Space for bottom navigation */
    padding-top: 1rem;
  }
`;

const TABS = [
  { key: 'home', component: <HomeSection /> },
  { key: 'about', component: <AboutSection /> },
  { key: 'experience', component: <ExperienceSection /> },
  { key: 'skills', component: <SkillsSection /> },
  { key: 'tools', component: <ToolsSection /> },
  { key: 'certifications', component: <CertificationsSection /> },
  { key: 'education', component: <EducationSection /> },
  { key: 'contact', component: <ContactSection /> },
];

const MainLayout = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showTerminal, setShowTerminal] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const toggleTerminal = () => {
    setShowTerminal(prev => !prev);
  };

  if (isBooting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <LayoutContainer>
      <StatusBar 
        showTerminal={showTerminal}
        toggleTerminal={toggleTerminal}
      />
      <ParticleBackground />
      <MatrixBackground />
      <Sidebar>
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
      </Sidebar>
      <MainContent style={activeTab === 'home' ? { alignItems: 'stretch', justifyContent: 'flex-start', display: 'block' } : {}}>
        {TABS.find(tab => tab.key === activeTab)?.component}
        {showTerminal && <SecurityTerminal />}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;