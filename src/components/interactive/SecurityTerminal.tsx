import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TerminalContainer = styled(motion.div)`
  background: rgba(10, 15, 25, 0.95);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  width: 100%;
  max-width: 800px;
  font-family: 'JetBrains Mono', monospace;
  color: #64ffda;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

const CommandInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: #64ffda;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  outline: none;
  caret-color: #64ffda;

  &::placeholder {
    color: rgba(100, 255, 218, 0.3);
  }
`;

const CommandOutput = styled(motion.div)`
  margin: 10px 0;
  padding: 10px;
  background: rgba(100, 255, 218, 0.05);
  border-radius: 4px;
`;

const SecurityMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MetricCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.6);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(100, 255, 218, 0.1);
`;

const PasswordMeter = styled.div<{ strength: number }>`
  height: 4px;
  background: ${({ strength }) => {
    if (strength < 30) return '#e06c75';
    if (strength < 70) return '#ffd700';
    return '#98c379';
  }};
  width: ${({ strength }) => strength}%;
  transition: all 0.3s ease;
  border-radius: 2px;
`;

const NetworkGraph = styled.div`
  height: 150px;
  margin-top: 10px;
`;

interface CommandResponse {
  type: 'success' | 'error' | 'info';
  message: string[];
}

const availableCommands = {
  'view-projects': async (): Promise<CommandResponse> => ({
    type: 'success',
    message: [
      '🔍 Scanning project repository...',
      '📂 Project 1: Cybersecurity Dashboard',
      '📂 Project 2: Network Monitoring Tool',
      '📂 Project 3: Security Analysis Platform'
    ]
  }),
  'scan-skills': async (): Promise<CommandResponse> => ({
    type: 'info',
    message: [
      '🔍 Analyzing skill matrix...',
      '✅ Network Security: Advanced',
      '✅ Incident Response: Proficient',
      '✅ Threat Detection: Expert',
      '✅ Log Analysis: Advanced'
    ]
  }),
  'run-security-check': async (): Promise<CommandResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      type: 'success',
      message: [
        '🛡️ Initiating security scan...',
        '✅ Firewall Status: Active',
        '✅ Encryption: Enabled',
        '✅ Latest Security Updates: Installed',
        '✅ No vulnerabilities detected'
      ]
    };
  },
  'help': async (): Promise<CommandResponse> => ({
    type: 'info',
    message: [
      '💻 Available Commands:',
      'view-projects     : Display portfolio projects',
      'scan-skills      : Show skill analysis',
      'run-security-check: Perform security audit',
      'help             : Show this help message'
    ]
  })
};

const SecurityTerminal: React.FC = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<{ type: string; message: string[] }[]>([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [networkData, setNetworkData] = useState({
    labels: Array.from({ length: 10 }, (_, i) => i.toString()),
    datasets: [{
      label: 'Network Activity',
      data: Array.from({ length: 10 }, () => Math.random() * 100),
      borderColor: '#64ffda',
      tension: 0.4
    }]
  });

  useEffect(() => {
    // Simulate password strength changes
    const strengthInterval = setInterval(() => {
      setPasswordStrength(prev => (prev + 1) % 101);
    }, 3000);

    // Simulate network activity
    const networkInterval = setInterval(() => {
      setNetworkData(prev => ({
        labels: prev.labels,
        datasets: [{
          ...prev.datasets[0],
          data: [...prev.datasets[0].data.slice(1), Math.random() * 100]
        }]
      }));
    }, 2000);

    return () => {
      clearInterval(strengthInterval);
      clearInterval(networkInterval);
    };
  }, []);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && command.trim()) {
      const cmd = command.trim().toLowerCase();
      setCommand('');

      if (cmd in availableCommands) {
        const response = await availableCommands[cmd as keyof typeof availableCommands]();
        setOutput(prev => [...prev, response]);
      } else {
        setOutput(prev => [...prev, {
          type: 'error',
          message: [`Command not found: ${cmd}`, 'Type "help" for available commands']
        }]);
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 255, 218, 0.1)'
        },
        ticks: {
          color: '#64ffda'
        }
      },
      x: {
        grid: {
          color: 'rgba(100, 255, 218, 0.1)'
        },
        ticks: {
          color: '#64ffda'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#64ffda'
        }
      }
    }
  };

  return (
    <TerminalContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalHeader>
        <span>🛡️ Security Terminal v1.0</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </TerminalHeader>

      <CommandInput
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyPress={handleCommand}
        placeholder="Type 'help' for available commands..."
      />

      <AnimatePresence>
        {output.map((out, i) => (
          <CommandOutput
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {out.message.map((line, j) => (
              <div key={j}>{line}</div>
            ))}
          </CommandOutput>
        ))}
      </AnimatePresence>

      <SecurityMetrics>
        <MetricCard>
          <h4>Password Strength</h4>
          <PasswordMeter strength={passwordStrength} />
          <span>{passwordStrength}%</span>
        </MetricCard>

        <MetricCard>
          <h4>Network Activity</h4>
          <NetworkGraph>
            <Line data={networkData} options={chartOptions} />
          </NetworkGraph>
        </MetricCard>
      </SecurityMetrics>
    </TerminalContainer>
  );
};

export default SecurityTerminal;