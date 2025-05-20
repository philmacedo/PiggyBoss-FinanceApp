import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section about-us">
          <h4>PiggyBoss</h4>
          <p>
            Sua jornada para a liberdade financeira começa aqui.
            Organize, planeje e conquiste seus objetivos.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Links Úteis</h4>
          <ul>
            <li><Link to="/about">Sobre Nós</Link></li>
            <li><Link to="/features">Funcionalidades</Link></li>
            <li><Link to="/pricing">Planos</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-section legal">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms-of-service">Termos de Serviço</Link></li>
            <li><Link to="/privacy-policy">Política de Privacidade</Link></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h4>Siga-nos</h4>
          <div className="social-icons">            
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a> 
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} PiggyBoss. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;