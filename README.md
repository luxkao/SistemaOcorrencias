# Sistema de Gestão de Ocorrências Escolares

Este é um projeto full-stack desenvolvido para a disciplina de Desenvolvimento Web 2. O sistema permite que professores registrem e consultem ocorrências disciplinares de estudantes em uma instituição de ensino.

## ✨ Funcionalidades Principais

- **Gerenciamento de Professores:** Cadastro, listagem, edição e exclusão de professores.
- **Gerenciamento de Estudantes:** Cadastro, listagem, edição e exclusão de estudantes.
- **Registro de Ocorrências:** Permite que um professor registre uma nova ocorrência, associando-a a um estudante específico.
- **Listagem Centralizada:** A página inicial exibe todas as ocorrências registradas no sistema.
- **Filtros Dinâmicos:** É possível filtrar a lista de ocorrências por professor ou por estudante para facilitar a consulta.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna com backend e frontend desacoplados.

### **Backend (API RESTful)**

- **Java 17**: Linguagem de programação principal.
- **Spring Boot 3**: Framework para criação da API RESTful.
- **Maven**: Gerenciador de dependências e build do projeto.
- **Spring JDBC**: Para acesso e manipulação do banco de dados, seguindo o requisito de não usar JPA/Hibernate.
- **MySQL**: Banco de dados relacional.
- **Docker**: Para provisionar e gerenciar o container do banco de dados MySQL de forma isolada.

### **Frontend (Single Page Application)**

- **React**: Biblioteca para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build e servidor de desenvolvimento de alta performance.
- **Axios**: Cliente HTTP para realizar as chamadas à API do backend.
- **React Router DOM**: Para gerenciamento de rotas e navegação na aplicação.
- **CSS**: Estilização customizada para os componentes.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### **Pré-requisitos**

- [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) ou superior.
- [Maven 3.8](https://maven.apache.org/download.cgi) ou superior.
- [Node.js 18.x](https://nodejs.org/) ou superior (que inclui o `npm`).
- [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/).

### **Passos para Execução**

1.  **Clone o Repositório**
    ```bash
    git clone https://github.com/luxkao/SistemaOcorrencias.git
    cd SistemaOcorrencias
    ```

2.  **Inicie o Banco de Dados com Docker**
    O projeto inclui um arquivo `docker-compose.yml` para iniciar o banco de dados MySQL de forma simples. Na raiz do projeto, execute:
    ```bash
    docker-compose up -d
    ```
    Isso irá iniciar um container MySQL na porta `3306`, com o banco de dados e usuário já configurados.

3. **Crie as Tabelas do Banco de Dados**
   Conecte-se ao banco de dados escola_ocorrencias_db e execute o script encontrado em SistemaOcorrencias/backend/src/main/resources/sql/schema.sql para criar todas as tabelas necessárias.

4.  **Execute o Backend (API Spring Boot)**
    Abra um **novo terminal** e navegue até a pasta do backend para iniciar a API.
    ```bash
    cd backend
    mvn spring-boot:run
    ```
    O servidor da API estará rodando em `http://localhost:8080`.

5.  **Execute o Frontend (Aplicação React)**
    Abra um **terceiro terminal** e navegue até a pasta do frontend para instalar as dependências e iniciar a aplicação.
    ```bash
    cd frontend

    # Instale as dependências (execute apenas na primeira vez)
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
    ```
    A aplicação estará acessível em seu navegador no endereço `http://localhost:5173` (ou na porta indicada pelo Vite no terminal).
