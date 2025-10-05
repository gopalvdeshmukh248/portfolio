import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaBriefcase, 
  FaCog, 
  FaGraduationCap,
  FaTools,
  FaMedal,
  FaEnvelope
} from 'react-icons/fa';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 1rem;
  height: 100vh;
  justify-content: center;
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
    width: 100%;
    bottom: 0;
    top: auto;
    border-right: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    padding: 0.6rem;
  }
`;

const NavItem = styled(motion.a)`
  color: #8892b0;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.7rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;

  &:hover {
    color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
  }

  &.active {
    color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: #64ffda;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #112240;
  color: #64ffda;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-left: 1rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 5px 5px 5px 0;
    border-color: transparent #112240 transparent transparent;
  }
`;


interface NavItemWrapperProps {
  icon: React.ReactNode;
  label: string;
  tabKey: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavItemWrapper = ({ icon, label, tabKey, activeTab, setActiveTab }: NavItemWrapperProps) => {
  return (
    <NavItem
      as="div"
      style={{ color: activeTab === tabKey ? '#64ffda' : undefined }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99]
        }
      }}
      whileHover={{ 
        scale: 1.1,
        transition: {
          duration: 0.4,
          ease: [0.6, 0.01, -0.05, 0.95]
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: {
          duration: 0.1,
          ease: [0.6, 0.01, -0.05, 0.95]
        }
      }}
      onClick={() => setActiveTab(tabKey)}
    >
      {icon}
      <Tooltip
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        }}
      >
        {label}
      </Tooltip>
    </NavItem>
  );
};

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <NavContainer>
      <NavItemWrapper icon={<FaUser />} label="About" tabKey="about" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaBriefcase />} label="Experience" tabKey="experience" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaCog />} label="Skills" tabKey="skills" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaTools />} label="Tools" tabKey="tools" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaMedal />} label="Certifications" tabKey="certifications" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaGraduationCap />} label="Education" tabKey="education" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaEnvelope />} label="Contact" tabKey="contact" activeTab={activeTab} setActiveTab={setActiveTab} />
      <NavItemWrapper icon={<FaHome />} label="Home" tabKey="home" activeTab={activeTab} setActiveTab={setActiveTab} />
    </NavContainer>
  );
};

export default Navigation;