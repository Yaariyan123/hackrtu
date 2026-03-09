import "./Mario.css";

function Mario() {
  return (
    <div className="mario-wrapper">
      <iframe
        src="https://supermarioemulator.com/mario.php"
        className="mario-game"
        title="Mario"
      ></iframe>
    </div>
  );
}

export default Mario;