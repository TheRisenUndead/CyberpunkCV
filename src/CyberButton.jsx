export default function CyberButton({ text, onClick }) {
  return (
    <div className="cyber-btn-wrapper" onClick={onClick}>
      {/* The main yellow text block */}
      <button className="cyber-btn">
        {text}
      </button>
      
      {/* The fading slanted lines */}
      <div className="cyber-btn-lines"></div>
    </div>
  );
}