export default function CyberButton({ text, onClick }) {
  return (
    <div className="cyber-btn-wrapper" onClick={onClick}>
      
      {/* 1. We moved the lines FIRST so they sit on the left */}
      <div className="cyber-btn-lines"></div>
      
      {/* 2. The main button is now on the right */}
      <button className="cyber-btn">
        {text}
      </button>

    </div>
  );
}