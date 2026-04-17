import { useState } from 'react';

// THE PURE INFO NODE (No links, no sound, no logos)
const SkillNode = ({ title, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="cyber-btn-wrapper" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ margin: '20px 0', cursor: 'default' }} 
    >
      <div className="cyber-btn-lines"></div>
      
      {/* Changed from <a> to <div> since it doesn't click anywhere */}
      <div 
        className="cyber-btn" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minWidth: '450px', // Slightly wider to hold the lists
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'default' 
        }}
      >
        {/* TOP ROW: Title Only */}
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
      </div>
    </div>
  );
};

// THE MAIN SKILLS PAGE
export default function Skills({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} SKILL_TREE
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
        marginTop: '20px' 
      }}>
        
        <SkillNode 
          title="PROGRAMMING"
          text="Python, Java, C, C++ (including Arduino), HTML, SQL, Game Maker Language, JavaFX/SceneBuilder, C# (With Unity)"
        />

        <SkillNode 
          title="GAME ENGINES"
          text="Game Maker Studio, Flowlab, Unity"
        />

        <SkillNode 
          title="SOFTWARE & TOOLS"
          text="Photoshop, Illustrator, Visual Studio, IntelliJ, Blender (Animation, Video Editing, Modeling)"
        />

      </div>
    </div>
  );
}