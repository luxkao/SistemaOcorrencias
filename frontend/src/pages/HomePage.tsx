import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type {Ocorrencia, Professor, Estudante} from '../types/entities';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {

    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);

    const [selectedProfessor, setSelectedProfessor] = useState<string>('');
    const [selectedEstudante, setSelectedEstudante] = useState<string>('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [profResponse, estResponse] = await Promise.all([
                    api.get<Professor[]>('/professores'),
                    api.get<Estudante[]>('/estudantes')
                ]);
                setProfessores(profResponse.data);
                setEstudantes(estResponse.data);
            } catch (err) {
                setError('Falha ao carregar dados para os filtros.');
                console.error(err);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchOcorrencias = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (selectedProfessor) {
                    params.append('professorId', selectedProfessor);
                }
                if (selectedEstudante) {
                    params.append('estudanteId', selectedEstudante);
                }

                const response = await api.get<Ocorrencia[]>('/ocorrencias', { params });
                setOcorrencias(response.data);
                setError(null);
            } catch (err) {
                setError('Falha ao buscar ocorrências.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOcorrencias();
    }, [selectedProfessor, selectedEstudante]);

    const handleProfessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProfessor(e.target.value);
        setSelectedEstudante(''); // Limpa o filtro de estudante
    };

    const handleEstudanteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEstudante(e.target.value);
        setSelectedProfessor(''); // Limpa o filtro de professor
    };

    return (
        <div className="ocorrencia-container">
            <div className="page-header">
                <h2>Ocorrências Registradas</h2>
                <button className="add-button" onClick={() => navigate('/ocorrencias/nova')}>
                    + Registrar Ocorrência
                </button>
            </div>

            <div className="filters">
                <select onChange={handleProfessorChange} value={selectedProfessor}>
                    <option value="">Filtrar por Professor...</option>
                    {professores.map(p => (
                        <option key={p.codigo} value={p.codigo}>{p.nome}</option>
                    ))}
                </select>

                <select onChange={handleEstudanteChange} value={selectedEstudante}>
                    <option value="">Filtrar por Estudante...</option>
                    {estudantes.map(e => (
                        <option key={e.matricula} value={e.matricula}>{e.nome}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Carregando ocorrências...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                ocorrencias.length === 0 ? (
                    <p>Nenhuma ocorrência encontrada para os filtros selecionados.</p>
                ) : (
                    <ul className="ocorrencia-list">
                        {ocorrencias.map((ocorrencia) => (
                            <li key={ocorrencia.id} className="ocorrencia-card">
                                {/* ... (o conteúdo do card continua o mesmo de antes) ... */}
                                <h3>{ocorrencia.descricao}</h3>
                                <p><strong>Local:</strong> {ocorrencia.local}</p>
                                <p><strong>Data:</strong> {new Date(ocorrencia.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                                <div className="ocorrencia-details">
                                    <p><strong>Estudante:</strong> {ocorrencia.denunciado.nome} ({ocorrencia.denunciado.matricula})</p>
                                    <p><strong>Professor:</strong> {ocorrencia.denunciante.nome} ({ocorrencia.denunciante.codigo})</p>
                                </div>
                                {ocorrencia.infoAdicional && <p className="info-adicional"><strong>Informações Adicionais:</strong> {ocorrencia.infoAdicional}</p>}
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
};

export default HomePage;