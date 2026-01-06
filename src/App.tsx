import "./App.css";
import Hero from "./sections/Hero";

function App() {
  return (
    <div className="app-root">
      <header className="top-nav">
        <div className="top-nav-left">
          <span className="top-nav-logo">Viyrs Studio</span>
        </div>
        <nav className="top-nav-menu">
          <button type="button" className="top-nav-item">
            Work
          </button>
          <button type="button" className="top-nav-item">
            About
          </button>
          <button type="button" className="top-nav-item">
            Contact
          </button>
        </nav>
        <div className="top-nav-right">
          <button type="button" className="top-nav-cta">
            Download CV
          </button>
        </div>
      </header>

      <Hero />
    </div>
  );
}

export default App;
