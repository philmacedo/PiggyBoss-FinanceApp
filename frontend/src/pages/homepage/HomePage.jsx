import { Link } from 'react-router-dom';
import "../../styles/HomePage.css";
import PinkButton from '../../components/PinkButton';

const HomePage = () => { 
  return (
   
    <div className="homepage-container">
      {/* Seção Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Domine suas finanças com inteligência.</h1>
          <p>Organize suas receitas e despesas, crie metas e acompanhe seus investimentos de forma simples e intuitiva.</p>
          <Link to="/register">
            <PinkButton>Comece Agora (Grátis)</PinkButton>
          </Link>
        </div>
        <div className="hero-image">
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="features-section">
        <h2>Funcionalidades Pensadas para Você</h2>
        <div className="features-grid">
            <div className="feature-item">
                <span className="icon-placeholder">💰</span> 
                <h4>Controle de Despesas Inteligente</h4>
                <p>Categorize seus gastos automaticamente e veja para onde seu dinheiro está indo.</p>
            </div>
            <div className="feature-item">
                <span className="icon-placeholder">🎯</span> 
                <h4>Planejamento e Metas</h4>
                <p>Defina seus objetivos financeiros e acompanhe seu progresso de perto.</p>
            </div>
            <div className="feature-item">
                <span className="icon-placeholder">📊</span>
                <h4>Relatórios Completos</h4>
                <p>Tenha uma visão clara da sua saúde financeira com relatórios fáceis de entender.</p>
            </div>
        </div>
      </section>

      {/* Seção de Benefícios (exemplo) */}
      <section className="benefits-section">
        <h2>Alcance a tranquilidade financeira</h2>
        <div className="benefit-item">
            <h4>Menos Estresse, Mais Paz</h4>
            <p>Com clareza e controle, diga adeus à ansiedade financeira.</p>
        </div>
        <div className="benefit-item">
            <h4>Decisões Mais Inteligentes</h4>
            <p>Entenda seus hábitos e tome decisões financeiras assertivas.</p>
        </div>
      </section>

      <section className="final-cta-section">
        <h2>Pronto para assumir o controle?</h2>
        <Link to="/register">
          <PinkButton>Crie sua conta gratuita no PiggyBoss!</PinkButton>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;