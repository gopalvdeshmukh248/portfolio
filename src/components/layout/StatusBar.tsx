import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaWifi, 
  FaLock, 
  FaBatteryFull, 
  FaBatteryThreeQuarters, 
  FaBatteryHalf, 
  FaBatteryQuarter,
  FaTerminal
} from 'react-icons/fa';
import { BiShieldQuarter } from 'react-icons/bi';

const StatusBarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: rgba(10, 15, 25, 0.95);
  backdrop-filter: blur(12px) saturate(180%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #a8b2d1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  z-index: 1000;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  &.right {
    justify-content: flex-end;
    .status-item {
      padding-left: 15px;
      border-left: 1px solid rgba(100, 255, 218, 0.1);
      
      &:hover {
        background: rgba(100, 255, 218, 0.05);
        border-radius: 4px;
      }
    }
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    font-size: 14px;
    filter: drop-shadow(0 0 8px currentColor);
  }

  &.network {
    color: #64ffda;
    
    &:hover {
      color: #7effdf;
    }
  }

  &.security {
    color: #ffd700;
    
    &:hover {
      color: #ffe44d;
    }
  }

  &.battery {
    color: #98c379;
    
    &:hover {
      color: #abd388;
    }
    
    &.low {
      color: #e06c75;
    }
  }
`;

const Time = styled.div`
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  padding: 0 15px;
  color: #64ffda;
`;

const TerminalButton = styled.button`
  background: none;
  border: none;
  color: #64ffda;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }

  &.active {
    background: rgba(100, 255, 218, 0.1);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  }

  svg {
    font-size: 14px;
  }
`;

const getBatteryIcon = (level: number) => {
  if (level > 75) return <FaBatteryFull />;
  if (level > 50) return <FaBatteryThreeQuarters />;
  if (level > 25) return <FaBatteryHalf />;
  return <FaBatteryQuarter />;
};

interface StatusBarProps {
  showTerminal: boolean;
  toggleTerminal: () => void;
}

const StatusBar = ({ showTerminal, toggleTerminal }: StatusBarProps) => {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulate battery changes
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = isCharging ? Math.min(100, prev + 1) : Math.max(0, prev - 1);
        if (newLevel <= 20 || newLevel >= 100) setIsCharging(prev => !prev);
        return newLevel;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(batteryInterval);
    };
  }, [isCharging]);

  return (
    <StatusBarContainer
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StatusGroup style={{ flex: '0 0 auto' }}>
        <TerminalButton 
          onClick={toggleTerminal}
          className={showTerminal ? 'active' : ''}
        >
          <FaTerminal />
          <span>Terminal</span>
        </TerminalButton>
      </StatusGroup>

      <StatusGroup style={{ flex: '1', justifyContent: 'center' }}>
        <Time>{time}</Time>
      </StatusGroup>

      <StatusGroup className="right" style={{ flex: '0 0 auto', gap: '15px' }}>
        <StatusItem className="network">
          <FaWifi />
          <span>Connected</span>
        </StatusItem>
        <StatusItem className="security">
          <FaLock />
          <BiShieldQuarter />
          <span>Secured</span>
        </StatusItem>
        <StatusItem className="battery">
          {getBatteryIcon(batteryLevel)}
          <span>{batteryLevel}%</span>
          {isCharging && <span>⚡</span>}
        </StatusItem>
      </StatusGroup>
    </StatusBarContainer>
  );
};

export default StatusBar;