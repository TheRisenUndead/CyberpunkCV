import { useState } from 'react';
import cheamLogo from './assets/CheamLogo.png';
import aberLogo from './assets/AberLogo.png';
import clickSound from './assets/buttonsoundeffect.mp3';

// THE EXPANDING NODE COMPONENT
const EduNode = ({ logo, title, text, link }) => {
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

// THE MAIN EDUCATION PAGE
export default function Education({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} EDUCATION_LOGS
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

      {/* NODES CONTAINER - Aligned to the Right */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        paddingRight: '50px',
        marginTop: '50px' 
      }}>
        
        <EduNode 
          title="ABERYSTWYTH"
          logo={aberLogo}
          link="https://courses.aber.ac.uk/undergraduate/computer-graphics-vision-games-degree/"
          text="BSc Computer Graphics, Vision, and Games | Aberystwyth University | 2023 - 2026"
        />

        <EduNode 
          title="CHEAM HIGH"
          logo={cheamLogo}
          link="https://www.cheam.sutton.sch.uk/"
          text="Attended Cheam High and Cheam Sixth Form. Earned Distinction in Sixth Form Computer Science."
        />

      </div>
    </div>
  );
}