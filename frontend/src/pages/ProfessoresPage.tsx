import React, { useState, useEffect, type FormEvent } from 'react';
import api from '../services/api';
import type { Professor } from '../types/entities';
import './FormPage.css';

const ProfessoresPage: React.FC = () => {
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [materiaLecionada, setMateriaLecionada] = useState('');

    const fetchProfessores = async () => {
        try {
            const response = await api.get<Professor[]>('/professores');
            setProfessores(response.data);
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            alert("Não foi possível carregar a lista de professores.");
        }
    };

    useEffect(() => {
        fetchProfessores();
    }, []);

    const resetForm = () => {
        setCodigo('');
        setNome('');
        setCurso('');
        setMateriaLecionada('');
        setIsEditing(false);
    };

    const handleEdit = (professor: Professor) => {
        setIsEditing(true);
        setCodigo(professor.codigo);
        setNome(professor.nome);
        setCurso(professor.curso);
        setMateriaLecionada(professor.materiaLecionada);
    };

    const handleDelete = async (codigo: string) => {
        if (window.confirm("Tem certeza que deseja excluir este professor?")) {
            try {
                await api.delete(`/professores/${codigo}`);
                alert("Professor excluído com sucesso!");
                fetchProfessores();
            } catch (error) {
                console.error("Erro ao excluir professor:", error);
                alert("Erro ao excluir professor. Verifique se ele não está associado a uma ocorrência.");
            }
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const professorData = { nome, curso, materiaLecionada };

        try {
            if (isEditing) {
                // Ao editar, a API precisa do código na URL, mas os dados no corpo não precisam
                await api.put(`/professores/${codigo}`, { nome, curso, materiaLecionada });
                alert("Professor atualizado com sucesso!");
            } else {
                await api.post('/professores', professorData);
                alert("Professor cadastrado com sucesso!");
            }
            resetForm();
            fetchProfessores();
        } catch (error) {
            console.error("Erro ao salvar professor:", error);
            alert("Erro ao salvar professor. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>{isEditing ? 'Editar Professor' : 'Cadastrar Novo Professor'}</h2>
                <form onSubmit={handleSubmit}>
                    {isEditing && (
                        <input
                            type="text"
                            value={codigo}
                            placeholder="Código"
                            disabled
                        />
                    )}
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome Completo"
                        required
                    />
                    <input
                        type="text"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        placeholder="Curso"
                    />
                    <input
                        type="text"
                        value={materiaLecionada}
                        onChange={(e) => setMateriaLecionada(e.target.value)}
                        placeholder="Matéria Lecionada"
                    />
                    <div className="form-buttons">
                        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
                        <button type="button" onClick={resetForm}>Cancelar</button>
                    </div>
                </form>
            </div>

            <div className="list-container">
                <h2>Professores Cadastrados</h2>
                <ul className="item-list">
                    {professores.map(professor => (
                        <li key={professor.codigo}>
                            <div>
                                <strong>{professor.nome}</strong> ({professor.codigo})<br/>
                                <span>Curso: {professor.curso} | Matéria: {professor.materiaLecionada}</span>
                            </div>
                            <div className="item-buttons">
                                <button onClick={() => handleEdit(professor)}>Editar</button>
                                <button onClick={() => handleDelete(professor.codigo)} className="delete-button">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfessoresPage;