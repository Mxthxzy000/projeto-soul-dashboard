import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-wrapper">
      <header className="header">
        {/* Placeholder para Logo */}
        <div className="header-logo">
          LOGO
        </div>

        <Link to="/" className="header-login">
          <div className="header-login-text">
            <p>Já possui uma conta?</p>
            <p>Faça o login agora mesmo!</p>
          </div>
          <div className="header-login-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </Link>
      </header>
    </div>
  );
}

export default Header;