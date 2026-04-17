import profilePic from './assets/ProfilePicture.png';

export default function Profile({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} USER_PROFILE
        </h2>
        
        {/* RETURN BUTTON */}
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

      {/* TWO COLUMN LAYOUT */}
      <div style={{ display: 'flex', gap: '40px', height: '100%', alignItems: 'stretch' }}>
        
        {/* LEFT: TEXT BOX */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--accent)',
          color: 'black',
          padding: '40px',
          /* CUTS THE TOP-LEFT CORNER */
          clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '3px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
            SENITH SUMANASIRI
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            <strong>A BSc Computer Graphics, Vision, and Games</strong> student at Aberystwyth University with a focus on immersive experience design. 
            Melding a strong foundation in <strong>programming and game engines</strong> with creative technical skill, I am dedicated to pushing the boundaries of interactive media and <strong>game development.</strong>
          </p>
        </div>

        {/* RIGHT: MIRRORED IMAGE BOX */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--accent)',
          padding: '10px', /* This padding creates the yellow border effect! */
          /* CUTS THE TOP-RIGHT CORNER */
          clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)',
          display: 'flex'
        }}>
          <img 
            src={profilePic} 
            alt="Senith Profile" 
            style={{
              width: '100%',
              objectFit: 'cover',
              /* We have to apply the exact same cut to the image inside the border */
              clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)',
              filter: 'grayscale(20%) contrast(120%)' /* Cyberpunk styling */
            }} 
          />
        </div>

      </div>
    </div>
  );
}