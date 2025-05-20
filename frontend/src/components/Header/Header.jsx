import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import LogoImage from '../../assets/logo.png'; 

const Header = () => (
    <header className="app-header">
        <div className="header-container">
            <Link to="/" className="logo-link">
                <img src={LogoImage} alt="PiggyBoss Logo" className="logo-image" />
                <h2>PiggyBoss</h2>
            </Link>
            <nav className="main-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/features"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            Funcionalidades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pricing"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            Planos
                        </NavLink>
                    </li>
                    {/* Adicione mais links conforme necessário */}
                </ul>
            </nav>
            <div className="header-actions">
                <Link to="/login" className="btn btn-secondary">
                    Entrar
                </Link>
                <Link to="/register" className="btn btn-primary">
                    Criar Conta
                </Link>
            </div>
        </div>
    </header>
);

export default Header;