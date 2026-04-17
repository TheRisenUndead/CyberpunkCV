import { useState } from 'react';
import clickSound from './assets/buttonsoundeffect.mp3';

// THE PROJECT NODE (Clickable, plays sound, no logos)
const ProjectNode = ({ title, text, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.3;
    audio.play().catch(err => console.log("Audio block:", err));
  };

  return (
    <div 
      className="cyber-btn-wrapper" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ margin: '20px 0' }}
    >
      <div className="cyber-btn-lines"></div>
      
      {/* Clickable link block */}
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="cyber-btn" 
        onClick={handleClick}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textDecoration: 'none',
          minWidth: '500px', // Wider to accommodate the descriptions
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* TOP ROW: Title */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem' }}>{title}</span>
        </div>

        {/* BOTTOM ROW: Expanding Text */}
        <div style={{
          maxHeight: isHovered ? '200px' : '0px',
          opacity: isHovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          marginTop: isHovered ? '15px' : '0px',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '1.2rem',
          lineHeight: '1.4',
          color: 'black',
          borderTop: isHovered ? '2px solid black' : '0px solid black',
          paddingTop: isHovered ? '10px' : '0px'
        }}>
          {text}
        </div>
      </a>
    </div>
  );
};

// THE MAIN PROJECTS PAGE
export default function Projects({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} PROJECT_ARCHIVES
        </h2>
        
        <button onClick={onBack} style={{
          background: 'transparent', color: 'white', border: '1px solid white',
          padding: '10px 20px', fontFamily: 'Orbitron, sans-serif', cursor: 'pointer',
          transition: 'all 0.3s', textTransform: 'uppercase'
        }}
        onMouseEnter={(e) => { e.target.style.background = 'white'; e.target.style.color = 'black'; }}
        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'white'; }}
        >
          [ X ] CLOSE
        </button>
      </div>

      {/* NODES CONTAINER - Aligned to the Right with scrolling if needed */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        paddingRight: '50px',
        paddingBottom: '50px', // Extra padding at bottom
        overflowY: 'auto', // Allows scrolling if screens are small
        height: '100%'
      }}>
        
        <ProjectNode 
          title="PUNCHOUT LEAGUE"
          link="https://therisenundead.itch.io/punchout-leauge"
          text="Developed a 2D fighting game using Game Maker Studio."
        />

        <ProjectNode 
          title="CARD SANDBOX GAME"
          link="https://drive.google.com/file/d/1Xe3-5xaCejzIMV-wjzv1OtzJ9WCvU0QU/view?usp=sharing"
          text="University group project. Contributed to 5 out of 13 user stories, implementing gameplay features and mechanics."
        />

        <ProjectNode 
          title="HYPERDECKV"
          link="https://drive.google.com/drive/folders/1rCG-C3jY1uovFb_16BBid3bfz8IRnCKj?usp=sharing"
          text="Independent game developed using knowledge gained from previous group project. Screenshots provided for offline reference."
        />

        <ProjectNode 
          title="DIRTY LAUNDRY"
          link="https://drive.google.com/file/d/1LSqQBiX-9wtB-KCVjKYoqPjjo3acBzG6/view?usp=sharing"
          text="I learned Unity and have started making a 3D Simulator Style Video Game. Still in development."
        />

      </div>
    </div>
  );
}