import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfessoresPage from './pages/ProfessoresPage';
import EstudantesPage from './pages/EstudantesPage';
import RegistrarOcorrenciaPage from './pages/RegistrarOcorrenciaPage'; // <-- Importe a nova página
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/professores" element={<ProfessoresPage />} />
                        <Route path="/estudantes" element={<EstudantesPage />} />
                        <Route path="/ocorrencias/nova" element={<RegistrarOcorrenciaPage />} /> {/* <-- Adicione esta linha */}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;