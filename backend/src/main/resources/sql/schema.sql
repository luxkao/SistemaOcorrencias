-- Tabela de Professores
CREATE TABLE IF NOT EXISTS professores (
                             codigo VARCHAR(255) PRIMARY KEY,
                             nome VARCHAR(255) NOT NULL,
                             curso VARCHAR(255),
                             materia_lecionada VARCHAR(255)
);

-- Tabela de Estudantes
CREATE TABLE IF NOT EXISTS estudantes (
                            matricula VARCHAR(255) PRIMARY KEY,
                            nome VARCHAR(255) NOT NULL,
                            curso VARCHAR(255),
                            ano_entrada INT
);

-- Tabela de Ocorrências
CREATE TABLE IF NOT EXISTS ocorrencias (
                                           id INT AUTO_INCREMENT PRIMARY KEY,
                                           data DATE NOT NULL,
                                           local VARCHAR(255),
                                           descricao TEXT NOT NULL,
                                           info_adicional TEXT,
                                           professor_codigo VARCHAR(255),
                                           estudante_matricula VARCHAR(255),
                                           CONSTRAINT fk_professor FOREIGN KEY (professor_codigo) REFERENCES professores(codigo),
                                           CONSTRAINT fk_estudante FOREIGN KEY (estudante_matricula) REFERENCES estudantes(matricula)
);