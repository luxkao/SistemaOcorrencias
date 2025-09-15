import React, { useState, useEffect, type FormEvent } from 'react';
import api from '../services/api';
import type { Estudante } from '../types/entities';
import './FormPage.css';

const EstudantesPage: React.FC = () => {
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [anoEntrada, setAnoEntrada] = useState<number | ''>('');

    const fetchEstudantes = async () => {
        try {
            const response = await api.get<Estudante[]>('/estudantes');
            setEstudantes(response.data);
        } catch (error) {
            console.error("Erro ao buscar estudantes:", error);
            alert("Não foi possível carregar a lista de estudantes.");
        }
    };

    useEffect(() => {
        fetchEstudantes();
    }, []);

    const resetForm = () => {
        setMatricula('');
        setNome('');
        setCurso('');
        setAnoEntrada('');
        setIsEditing(false);
    };

    const handleEdit = (estudante: Estudante) => {
        setIsEditing(true);
        setMatricula(estudante.matricula);
        setNome(estudante.nome);
        setCurso(estudante.curso);
        setAnoEntrada(estudante.anoEntrada);
    };

    const handleDelete = async (matricula: string) => {
        if (window.confirm("Tem certeza que deseja excluir este estudante?")) {
            try {
                await api.delete(`/estudantes/${matricula}`);
                alert("Estudante excluído com sucesso!");
                fetchEstudantes();
            } catch (error) {
                console.error("Erro ao excluir estudante:", error);
                alert("Erro ao excluir estudante. Verifique se ele não está associado a uma ocorrência.");
            }
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const estudanteData = { nome, curso, anoEntrada: Number(anoEntrada) };

        try {
            if (isEditing) {
                await api.put(`/estudantes/${matricula}`, estudanteData);
                alert("Estudante atualizado com sucesso!");
            } else {
                await api.post('/estudantes', estudanteData);
                alert("Estudante cadastrado com sucesso!");
            }
            resetForm();
            fetchEstudantes();
        } catch (error) {
            console.error("Erro ao salvar estudante:", error);
            alert("Erro ao salvar estudante. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>{isEditing ? 'Editar Estudante' : 'Cadastrar Novo Estudante'}</h2>
                <form onSubmit={handleSubmit}>
                    {isEditing && (
                        <input
                            type="text"
                            value={matricula}
                            placeholder="Matrícula"
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
                        type="number"
                        value={anoEntrada}
                        onChange={(e) => setAnoEntrada(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                        placeholder="Ano de Entrada"
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
                        <button type="button" onClick={resetForm}>Cancelar</button>
                    </div>
                </form>
            </div>

            <div className="list-container">
                <h2>Estudantes Cadastrados</h2>
                <ul className="item-list">
                    {estudantes.map(estudante => (
                        <li key={estudante.matricula}>
                            <div>
                                <strong>{estudante.nome}</strong> ({estudante.matricula})<br/>
                                <span>Curso: {estudante.curso} | Ano de Entrada: {estudante.anoEntrada}</span>
                            </div>
                            <div className="item-buttons">
                                <button onClick={() => handleEdit(estudante)}>Editar</button>
                                <button onClick={() => handleDelete(estudante.matricula)} className="delete-button">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EstudantesPage;