export interface Professor {
    codigo: string;
    nome: string;
    curso: string;
    materiaLecionada: string;
}

export interface Estudante {
    matricula: string;
    nome: string;
    curso: string;
    anoEntrada: number;
}

export interface Ocorrencia {
    id: number;
    data: string;
    local: string;
    descricao: string;
    infoAdicional: string;
    denunciante: Professor;
    denunciado: Estudante;
}