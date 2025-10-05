import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ExperienceContainer = styled(motion.section)`
  min-height: 100vh;
  padding: 4rem 0;
  position: relative;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #64ffda #0a192f;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0a192f;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #64ffda;
    border-radius: 4px;
    border: 2px solid #0a192f;
  }

  @media (max-width: 768px) {
    padding: 2rem 0;
    &::-webkit-scrollbar {
      height: 4px;
    }
  }

  /* Add horizontal padding for tablet */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 3rem 1rem;
  }
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, #64ffda, #233554);
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    gap: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

const ExperienceCard = styled(motion.div)`
  min-width: 300px;
  width: 400px;
  margin: 0 1.5rem;
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(17, 34, 64, 0.95) 0%,
    rgba(10, 25, 47, 0.85) 100%
  );
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px) saturate(180%);
  flex-shrink: 0;
  scroll-snap-align: center;
  overflow-y: auto;
  max-height: 500px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #233554;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #64ffda;
  }

  scrollbar-width: thin;
  scrollbar-color: #233554 rgba(0, 0, 0, 0.1);
  
  &:nth-child(odd) {
    margin-bottom: 60px;
    transform-origin: bottom center;
    
    &::before {
      bottom: -30px;
      height: 30px;
      width: 2px;
    }
  }
  
  &:nth-child(even) {
    margin-top: 60px;
    transform-origin: top center;
    
    &::before {
      top: -30px;
      height: 30px;
      width: 2px;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #64ffda;
  }

  @media (max-width: 768px) {
    min-width: 85vw;
    width: 85vw;
    margin: 0 0.5rem;
    padding: 1rem;
    
    /* Stack cards vertically on mobile */
    &:nth-child(odd),
    &:nth-child(even) {
      margin-top: 0;
      margin-bottom: 1rem;
      
      &::before {
        display: none;
      }
    }
  }

  /* Tablet styles */
  @media (min-width: 769px) and (max-width: 1024px) {
    min-width: 320px;
    width: 350px;
    margin: 0 1rem;
    
    &:nth-child(odd) {
      margin-bottom: 40px;
      &::before {
        bottom: -20px;
        height: 20px;
      }
    }
    
    &:nth-child(even) {
      margin-top: 40px;
      &::before {
        top: -20px;
        height: 20px;
      }
    }
  }
`;

const TimeNode = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: #64ffda;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #0a192f;
    border-radius: 50%;
  }

  &:nth-child(odd) {
    top: calc(100% + 30px);
  }

  &:nth-child(even) {
    top: -30px;
  }
`;

const Company = styled.h3`
  color: #64ffda;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  margin-bottom: 0.5rem;
  font-family: 'Fira Code', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Duration = styled.div`
  color: #8892b0;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`;

const Description = styled.ul`
  color: #8892b0;
  list-style-type: none;
  padding: 0;
  font-size: clamp(0.9rem, 2vw, 1rem);
  margin: 0;
  padding-right: 0.5rem;
  
  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0.5rem;
    }
    
    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: #64ffda;
      font-family: 'Fira Code', monospace;
    }

    @media (max-width: 768px) {
      margin-bottom: 0.8rem;
      padding-left: 1.2rem;
      font-size: 0.9rem;
    }
  }
`;

const experienceData = [
  {
    company: "Infosys",
    duration: "May 2023 – Present",
    responsibilities: [
      "AI Integration: Leveraging AI tools across all tasks to enhance efficiency, accuracy, and decision-making in daily operations",
      "Log & Traffic Monitoring: Analyzing network traffic and security logs for threats using SIEM tools like QRadar, XSOAR, and CrowdStrike Falcon",
      "Threat Detection: Identifying vulnerabilities and potential malicious activities through continuous monitoring",
      "Incident Response: Investigating security incidents and responding promptly to threats",
      "Collaboration: Working with internal teams to strengthen the organization's security posture",
      "Security Enhancements: Assisting in improving system performance and implementing security measures",
      "Continuous Learning: Keeping up with cybersecurity trends, threats, and best practices through blogs and online research"
    ]
  },
  {
    company: "Infosys (Trainee)",
    duration: "Nov 2022 – April 2023",
    responsibilities: [
      "Expanded knowledge of Java and SQL concepts",
      "Proficient in Linux administration, including Unix systems, shell scripting, and Red Hat Enterprise Linux",
      "Skilled in Windows administration.",
      "Strong understanding of networking fundamentals"
    ]
  },
  {
    company: "SehatEasy (Intern)",
    duration: "May 2022 – Oct 2022",
    responsibilities: [
      "Developed and maintained user-friendly web interfaces using HTML,CSS, and JavaScript.",
      "Managed data analysis using Excel and general administrative operations.",
      "Handled client communications, including calls and presentations to doctors, to showcase platform features",
    ]
  },
  {
    company: "GE Aerospace",
    duration: "March 2019 – March 2021",
    responsibilities: [
      "- Lean Manufacturing: Contributed to process improvement initiatives aimed at reducing waste and enhancing production efficiency.",
      "- Kaizen Implementation: Participated in continuous improvement workshops to identify bottlenecks and implement actionable solutions.",
      "- Quality Assurance: Conducted inspections and supported root cause analysis to maintain product integrity and reliability.",
      "- Cross-Functional Collaboration: Worked closely with design, production, and quality teams to meet project milestones and ensure seamless workflow.",


      "- Welding Operations: Performed and inspected precision welding tasks, ensuring compliance with aerospace quality standards.",
      "- Machining Processes: Operated and maintained CNC and manual machines for high-tolerance part fabrication.",    ]
  }
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Apply scroll-based opacity animation to the container
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <ExperienceContainer 
      id="experience" 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity }}
    >
      <TimelineContainer>
        {experienceData.map((exp, index) => (
          <ExperienceCard
            key={index}
            initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <TimeNode
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            />
            <Company>{exp.company}</Company>
            <Duration>{exp.duration}</Duration>
            <Description>
              {exp.responsibilities.map((resp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {resp}
                </motion.li>
              ))}
            </Description>
          </ExperienceCard>
        ))}
      </TimelineContainer>
    </ExperienceContainer>
  );
};

export default ExperienceSection;