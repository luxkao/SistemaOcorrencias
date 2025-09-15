import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content"> {/* Container interno */}
                <Link to="/" className="nav-brand">Sistema de Ocorrências</Link>
                <div className="nav-links">
                    <Link to="/">Ocorrências</Link>
                    <Link to="/professores">Professores</Link>
                    <Link to="/estudantes">Estudantes</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;