# 📅 Sistema de Gestão de Eventos — API RESTful (AdonisJS 6)

API desenvolvida para uma plataforma de gestão de eventos presenciais e online.
A aplicação permite que **organizadores criem eventos** e que **participantes se inscrevam**, respeitando regras de negócio essenciais como capacidade máxima, conflitos de horário e integridade das inscrições.

Este projeto segue princípios de **Clean Architecture** e boas práticas de organização em camadas.

---

# 📌 1. Escopo do Projeto

O objetivo é construir uma API escalável para:

- Gerenciamento de eventos presenciais e online
- Cadastro e autenticação de participantes e organizadores
- Inscrições com regras de negócio rígidas
- Segurança e integridade dos dados trafegados

---

# 🧰 2. Stack Tecnológica

- **Node.js**
- **AdonisJS 6** (TypeScript)
- **Lucid ORM**
- **PostgreSQL** (recomendado) ou SQLite
- **Docker & Docker Compose**
- **Bearer Token** para autenticação

---

# 🏛️ 3. Arquitetura e Padrões Utilizados

A aplicação segue uma arquitetura em camadas inspirada em **Clean Architecture**, garantindo desacoplamento, modularidade e facilidade de manutenção.

### ✔ Estrutura adotada:

- **Controllers:** Recebem a requisição HTTP e executam apenas a chamada para o caso de uso
- **Validators:** Responsáveis por validar dados da requisição
- **DTOs:** Objetos para transporte de dados entre camadas
- **Use Cases:** Implementam as regras de negócio da aplicação
- **Repositories:** Onde fica a regra de acesso ao banco de dados via Lucid ORM

---

# 📋 4. Requisitos Funcionais (RF)

### 🔐 Autenticação
- **RF01:** Login de organizadores e participantes via Token (Bearer)

### 👤 Módulo: Participante
- **RF02:** Cadastro de novo participante
- **RF03:** Participante pode editar seus próprios dados
- **RF04:** Participante pode visualizar eventos nos quais está inscrito
- **RF05:** Participante pode cancelar sua inscrição

### 🧑‍💼 Módulo: Organizador
- **RF06:** Cadastro de organizador
- **RF07:** Criar novo evento
- **RF08:** Editar um evento criado por ele
- **RF09:** Excluir evento (somente se não houver inscritos)
- **RF10:** Visualizar participantes de um evento criado por ele

---

# ⚙️ 5. Regras de Negócio (RN)

- **RN01 — Capacidade:** O evento deve respeitar a capacidade máxima; impedir novas inscrições ao atingir o limite
- **RN02 — Conflito de Horário:** Participante não pode se inscrever em eventos com horários conflitantes
- **RN03 — Unicidade:** Impedir que um participante se inscreva duas vezes no mesmo evento
- **RN04 — Ownership (Propriedade):** Organizador só pode modificar/excluir eventos que ele próprio criou
- **RN05 — Dados Obrigatórios do Evento:** Nome, Data/Hora, Localização e Capacidade Máxima

---

# 🗄️ 6. Estrutura de Pastas (Clean Architecture)
```bash
app/
├── controllers/
├── dtos/
├── exceptions/
├── middlewares/
├── models/
├── repositories/
├── use_case/
├── utils/
│   ├── functions/
│   └── interfaces/
└── validators/

# 🐳 7. Como Rodar o Projeto

```bash
# 1. Copie o arquivo de exemplo
cp .env.example .env

# 2. Gere a chave da aplicação
node ace generate:key

# 3. Suba os containers (PostgreSQL)
docker compose up -d

# 4. Instale as dependências
npm install

# 5. Execute as migrations
node ace migration:run

# 6. Inicie o servidor de desenvolvimento
npm run dev
A API estará rodando em: http://localhost:3333

🛠️ 8. Tecnologias e Ferramentas

Node.js
AdonisJS 6
TypeScript
PostgreSQL
Lucid ORM
Docker + Docker Compose
Bearer Token

A collection completa de requisições está disponível no arquivo:
insomnia.json
