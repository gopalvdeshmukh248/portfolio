import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactContainer = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
`;

const Title = styled(motion.h2)`
  color: #64ffda;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 700;
  @media (max-width: 600px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ContactBox = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.95) 0%,
    rgba(10, 25, 47, 0.85) 100%
  );
  border-radius: clamp(12px, 2vw, 18px);
  padding: clamp(1.2rem, 4vw, 2.5rem);
  width: 100%;
  max-width: min(420px, 95vw);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s;
  margin: 0 1rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 0 0.5rem;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #233554;
  width: 100%;
`;


const ContactInfo = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #b2c2e0;
  font-size: 1.08rem;
  width: 100%;
  svg {
    color: #64ffda;
    margin-right: 1rem;
    font-size: 1.3rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 2rem;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  color: ${props => props.type === 'success' ? '#64ffda' : '#ff5f56'};
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  padding: 0.5rem;
  border-radius: 4px;
  background: ${props => props.type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 95, 86, 0.1)'};
  border: 1px solid ${props => props.type === 'success' ? '#64ffda' : '#ff5f56'};
`;

const SocialLink = styled(motion.a)`
  color: #8892b0;
  font-size: 1.7rem;
  transition: color 0.3s, transform 0.2s;
  border-radius: 50%;
  padding: 0.3rem;
  background: rgba(100,255,218,0.05);
  &:hover {
    color: #64ffda;
    background: rgba(100,255,218,0.15);
    transform: scale(1.18);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
`;

const Input = styled.input`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.8) 0%,
    rgba(10, 25, 47, 0.7) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.95rem 1rem;
  color: #e6f1ff;
  font-size: 1.08rem;
  transition: all 0.3s ease;
  width: 100%;
  backdrop-filter: blur(5px) saturate(150%);
  box-shadow: 
    0 4px 16px 0 rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 
      0 4px 16px 0 rgba(100, 255, 218, 0.1),
      inset 0 0 0 1px rgba(100, 255, 218, 0.2);
    background: linear-gradient(
      135deg,
      rgba(17, 34, 64, 0.9) 0%,
      rgba(10, 25, 47, 0.8) 100%
    );
  }
`;

const TextArea = styled.textarea`
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.8) 0%,
    rgba(10, 25, 47, 0.7) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.95rem 1rem;
  color: #e6f1ff;
  font-size: 1.08rem;
  min-height: 120px;
  resize: vertical;
  width: 100%;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px) saturate(150%);
  box-shadow: 
    0 4px 16px 0 rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 
      0 4px 16px 0 rgba(100, 255, 218, 0.1),
      inset 0 0 0 1px rgba(100, 255, 218, 0.2);
    background: linear-gradient(
      135deg,
      rgba(17, 34, 64, 0.9) 0%,
      rgba(10, 25, 47, 0.8) 100%
    );
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(90deg, #64ffda 0%, #1de9b6 100%);
  border: none;
  color: #112240;
  font-weight: 700;
  padding: 1rem;
  font-size: 1.08rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(100,255,218,0.08);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1de9b6 0%, #64ffda 100%);
    color: #0a192f;
    transform: translateY(-2px) scale(1.04);
  }
`;

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        form.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setMessage({ text: 'Message sent successfully!', type: 'success' });
        setFormState({ name: '', email: '', message: '' });
      } else {
        setMessage({ text: 'Failed to send message. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Failed to send message. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer id="contact">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </Title>
      <ContactBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TerminalHeader>
          <span style={{ color: '#ffffff' }}>root@localhost:~# contact --init</span>
        </TerminalHeader>
        
        <ContactInfo>
          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaEnvelope />
            <span>gopaleshdeshmukh1@gmail.com</span>
          </InfoItem>
          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FaPhone />
            <span>+91 902108356453</span>
          </InfoItem>
        </ContactInfo>

        <Form ref={form} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="user_name"
            placeholder="Name"
            value={formState.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <Input
            type="email"
            name="user_email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <TextArea
            name="message"
            placeholder="Message"
            value={formState.message}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </Button>
        </Form>

        <SocialLinks>
          <SocialLink
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin />
          </SocialLink>
        </SocialLinks>
      </ContactBox>
    </ContactContainer>
  );
};

export default ContactSection;