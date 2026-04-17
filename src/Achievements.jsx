export default function Achievements({ onBack }) {
  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: 'Orbitron, sans-serif'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--accent)', textShadow: '2px 2px black', margin: 0 }}>
          {">"} BRAVERY_LOGS
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

      {/* CENTERED DATA BOX */}
      <div style={{
        backgroundColor: 'var(--accent)',
        color: 'black',
        padding: '50px',
        /* A unique "inverted" cut for the achievements log */
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '1.4rem',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '10px 10px 0px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ fontSize: '2rem', borderBottom: '3px solid black', paddingBottom: '10px', marginBottom: '30px' }}>
          SYSTEM_RECORD: NOTABLE_ACHIEVEMENTS
        </h3>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>[!]</span>
            <span>
              <strong>Resilience & Determination:</strong> Overcame two instances of leukemia (age 9 and 12) while maintaining focus on learning programming and game development. 
            </span>
          </li>

          <li style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>[!]</span>
            <span>
              <strong>Computer Science Ambassador:</strong> Served during sixth form, assisting in teaching Year 8 classes and mentoring junior students.
            </span>
          </li>

          <li style={{ display: 'flex', gap: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>[!]</span>
            <span>
              <strong>Outreach:</strong> Supported university open days and outreach events for computer science, advocating for the field.
            </span>
          </li>
        </ul>
      </div>

    </div>
  );
}