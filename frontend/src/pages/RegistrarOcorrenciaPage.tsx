import React, { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Professor, Estudante } from '../types/entities';
import './FormPage.css';

const RegistrarOcorrenciaPage: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');
    const [infoAdicional, setInfoAdicional] = useState('');
    const [professorCodigo, setProfessorCodigo] = useState('');
    const [estudanteMatricula, setEstudanteMatricula] = useState('');

    const [professores, setProfessores] = useState<Professor[]>([]);
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profResponse, estResponse] = await Promise.all([
                    api.get('/professores'),
                    api.get('/estudantes')
                ]);
                setProfessores(profResponse.data);
                setEstudantes(estResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                alert("Não foi possível carregar a lista de professores e estudantes.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!professorCodigo || !estudanteMatricula) {
            alert("Por favor, selecione um professor e um estudante.");
            return;
        }

        const ocorrenciaData = {
            data,
            local,
            descricao,
            infoAdicional,
            professorCodigo,
            estudanteMatricula
        };

        try {
            await api.post('/ocorrencias', ocorrenciaData);
            alert("Ocorrência registrada com sucesso!");
            navigate('/'); // Redireciona para a página inicial após o sucesso
        } catch (error) {
            console.error("Erro ao registrar ocorrência:", error);
            alert("Erro ao registrar ocorrência. Tente novamente.");
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Registrar Nova Ocorrência</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        placeholder="Local da Ocorrência"
                        required
                    />
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição da Ocorrência"
                        rows={4}
                        required
                        style={{ padding: '12px', fontSize: '1em', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />
                    <textarea
                        value={infoAdicional}
                        onChange={(e) => setInfoAdicional(e.target.value)}
                        placeholder="Informações Adicionais (Opcional)"
                        rows={2}
                        style={{ padding: '12px', fontSize: '1em', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                    />

                    <select value={professorCodigo} onChange={(e) => setProfessorCodigo(e.target.value)} required>
                        <option value="" disabled>Selecione o Professor Denunciante</option>
                        {professores.map(p => (
                            <option key={p.codigo} value={p.codigo}>{p.nome}</option>
                        ))}
                    </select>

                    <select value={estudanteMatricula} onChange={(e) => setEstudanteMatricula(e.target.value)} required>
                        <option value="" disabled>Selecione o Estudante Denunciado</option>
                        {estudantes.map(e => (
                            <option key={e.matricula} value={e.matricula}>{e.nome}</option>
                        ))}
                    </select>

                    <div className="form-buttons">
                        <button type="submit">Registrar</button>
                        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarOcorrenciaPage;