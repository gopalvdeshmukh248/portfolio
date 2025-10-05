import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

// Audio elements
const bootSound = new Audio('/sounds/boot.mp3');
const keypressSound = new Audio('/sounds/keypress.mp3');
const errorSound = new Audio('/sounds/error.mp3');
const successSound = new Audio('/sounds/success.mp3');

// Set volume for all sounds
[bootSound, keypressSound, errorSound, successSound].forEach(sound => {
  sound.volume = 0.3;
});

const BootContainer = styled.div`
  background-color: #000000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 1s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    z-index: -1;
  }
`;

const BootText = styled.div`
  white-space: pre-wrap;
  margin-bottom: 2rem;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 0.5rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  outline: none;
  width: 100%;
  caret-color: #00ff00;

  &:focus {
    outline: none;
  }
`;

const Cursor = styled.span`
  animation: blink 1s step-end infinite;
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const bootMessages = [
  { text: '\nroot@localhost:~# Initializing system...', requireInput: false },
  { text: '\nroot@localhost:~# Loading Threat Intelligence Engine...', requireInput: false },
  { text: '\nroot@localhost:~# Establishing Secure Connection...', requireInput: false },
  { text: '\nroot@localhost:~# Loading Profile: Gopal - Cybersecurity Professional', requireInput: false },
  { text: '\nroot@localhost:~# System Ready. Continue? (y/Enter)', requireInput: true }
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const playKeystroke = useCallback(() => {
    keypressSound.currentTime = 0;
    keypressSound.play().catch(() => {});
  }, []);

  // Play boot sound when component mounts
  useEffect(() => {
    bootSound.play().catch(() => {});
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    
    if (currentLine < bootMessages.length) {
      const message = bootMessages[currentLine].text;
      let charIndex = 0;
      
      const typeWriter = () => {
        if (charIndex < message.length) {
          playKeystroke();
          setCurrentText(prev => prev + message[charIndex]);
          charIndex++;
          timeout = setTimeout(typeWriter, 50);
        } else {
          timeout = setTimeout(() => {
            setCurrentText(prev => prev + '\n');
            if (bootMessages[currentLine].requireInput) {
              setWaitingForInput(true);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            } else {
              setCurrentLine(prev => prev + 1);
            }
          }, 1000);
        }
      };
      
      timeout = setTimeout(typeWriter, 500);
    } else {
      timeout = setTimeout(() => {
        successSound.currentTime = 0;
        successSound.play().catch(() => {});
        setVisible(false);
        const completeTimeout = setTimeout(onComplete, 1000);
        return () => clearTimeout(completeTimeout);
      }, 1500);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentLine, onComplete]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Accept either 'Enter' key or 'y' key press
    if (e.key === 'Enter' || e.key.toLowerCase() === 'y') {
      successSound.currentTime = 0;
      successSound.play().catch(() => {});
      setWaitingForInput(false);
      setCurrentLine(prev => prev + 1);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playKeystroke();
    setInputValue(e.target.value);
  };

  if (!mounted) return null;

  return (
    <BootContainer style={{ opacity: visible ? 1 : 0 }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BootText>
          {currentText}
          {!waitingForInput && <Cursor>▊</Cursor>}
        </BootText>
        {waitingForInput && (
          <InputLine>
            <Prompt>$</Prompt>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInput}
              autoFocus
              spellCheck={false}
              placeholder="Press 'Enter' or 'Y' to proceed..."
            />
          </InputLine>
        )}
      </div>
    </BootContainer>
  );
};

export default BootSequence;