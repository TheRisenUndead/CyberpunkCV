import { useState } from 'react';
import clickSound from './assets/buttonsoundeffect.mp3';

import githubLogo from './assets/GitHubLogo.png';
import itchLogo from './assets/ItchIoLogo.png';
import scratchLogo from './assets/ScratchLogo.png';
import flowlabLogo from './assets/FlowlabLogo.png';

// THE PORTFOLIO NODE (Image + Link + Sound)
const PortfolioNode = ({ logo, title, text, link }) => {
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
      style={{ margin: '15px 0' }} // Slightly tighter margin for 4 items
    >
      <div className="cyber-btn-lines"></div>
      
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
          minWidth: '400px',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* TOP ROW: Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src={logo} alt={title} style={{ height: '50px', width: '50px', objectFit: 'contain', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }} />
          <span style={{ fontSize: '2.5rem' }}>{title}</span>
        </div>

        {/* BOTTOM ROW: Expanding Link Text */}
        <div style={{
          maxHeight: isHovered ? '100px' : '0px',
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

// THE MAIN PORTFOLIO PAGE
export default function Portfolio({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} EXTERNAL_UPLINKS
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

      {/* NODES CONTAINER */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        paddingRight: '50px',
        paddingBottom: '50px',
        overflowY: 'auto', 
        height: '100%'
      }}>
        
        <PortfolioNode 
          title="GITHUB"
          logo={githubLogo}
          link="https://github.com/TheRisenUndead"
          text="github.com/TheRisenUndead"
        />

        <PortfolioNode 
          title="ITCH.IO"
          logo={itchLogo}
          link="https://therisenundead.itch.io/punchout-leauge"
          text="therisenundead.itch.io"
        />

        <PortfolioNode 
          title="SCRATCH"
          logo={scratchLogo}
          link="https://scratch.mit.edu/users/herodime/"
          text="scratch.mit.edu/users/herodime"
        />

        <PortfolioNode 
          title="FLOWLAB"
          logo={flowlabLogo}
          link="https://flowlab.io/users/profile/1190607"
          text="flowlab.io/users/profile/1190607"
        />

      </div>
    </div>
  );
}