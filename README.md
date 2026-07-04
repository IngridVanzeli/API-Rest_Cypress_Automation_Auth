# API-Rest_Cypress_Automation_Auth

## Introdução

Este repositório contém os testes automatizados de API desenvolvidos com Cypress, voltados para a validação dos endpoints da [Restful Booker](https://restful-booker.herokuapp.com), uma API pública usada como ambiente de prática. Os testes cobrem os principais verbos HTTP (GET, POST, PUT e DELETE), incluindo fluxos de autenticação, cenários de sucesso e cenários de erro para validação dos comportamentos esperados da API.

O projeto conta com integração ao GitHub Actions, que executa toda a suíte de testes automaticamente a cada pull request direcionado à branch main.

## Tecnologias Utilizadas

- **JavaScript** - linguagem base do projeto
- **Cypress 14.5.1** - framework de testes utilizado para estruturar e executar os casos de teste de API via `cy.request()`
- **GitHub Actions** - pipeline de CI/CD que executa os testes automaticamente a cada pull request na branch main

## Estrutura do Repositório

```
API-Rest_Cypress_Automation_Auth/
├── .github/
│   └── workflows/
│       └── pipeline.yml
├── cypress/
│   ├── e2e/
│   │   ├── delete-booking.cy.js
│   │   ├── get-booking.cy.js
│   │   ├── post-bookling.cy.js
│   │   ├── put-booking.cy.js
│   │   └── token.cy.js
│   ├── fixtures/
│   │   ├── create_booking.json
│   │   └── update_booking.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── .gitignore
```

## Objetivo de cada grupo de arquivos

### `.github/workflows/`
Contém a configuração da pipeline de integração contínua. O arquivo `pipeline.yml` define o workflow do GitHub Actions, que usa a action oficial `cypress-io/github-action` para instalar as dependências e executar os testes automaticamente a cada pull request na branch main.

### `cypress/e2e/`
Contém os arquivos de teste organizados por verbo HTTP ou funcionalidade. Cada arquivo representa um conjunto de cenários relacionados:

- **`token.cy.js`**: valida cenários de falha na geração do token de autenticação, como senha incorreta, usuário inexistente e campos vazios.
- **`get-booking.cy.js`**: cobre consultas de reservas por ID, nome, sobrenome, checkin e checkout, incluindo cenários com dados válidos e inválidos. Usa um `beforeEach` que cria uma reserva antes de cada teste para garantir que o ID consultado existe.
- **`post-bookling.cy.js`**: testa a criação de reservas com todos os campos válidos e cenários de campos ausentes ou com tipos incorretos, como `firstname` numérico, `totalprice` como string e datas em formato inválido.
- **`put-booking.cy.js`**: valida a atualização completa de reservas existentes, com e sem autenticação, e cobre cenários de campos ausentes ou inválidos. Usa um `beforeEach` que gera o token e cria uma reserva antes de cada teste.
- **`delete-booking.cy.js`**: valida a exclusão de reservas com token válido, sem ID e com token inválido, verificando os status 201, 404 e 403 respectivamente.

### `cypress/fixtures/`
Armazena os dados estáticos usados como payload nas requisições:

- **`create_booking.json`**: payload base para criação de uma nova reserva, com todos os campos obrigatórios preenchidos.
- **`update_booking.json`**: payload usado nos testes de atualização completa de uma reserva existente.

### `cypress/support/`
Centraliza a configuração global e os comandos customizados do Cypress:

- **`commands.js`**: define os comandos reutilizáveis usados em todos os testes, como `cy.createToken()`, `cy.createBooking()`, `cy.getBookingId()`, `cy.getBooking()`, `cy.updateBooking()` e `cy.deleteBooking()`. Cada comando encapsula uma chamada `cy.request()` com os headers e parâmetros necessários, evitando repetição de código nos arquivos de teste.
- **`e2e.js`**: arquivo de configuração global carregado automaticamente pelo Cypress antes dos testes, responsável por importar o `commands.js`.

### `cypress.config.js`
Arquivo de configuração do Cypress. Define a `baseUrl` como `https://restful-booker.herokuapp.com`, que é usada como base em todas as chamadas `cy.request()` dos testes.

## Modo de Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior instalado
- [Git](https://git-scm.com/) instalado

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/IngridVanzeli/API-Rest_Cypress_Automation_Auth.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd API-Rest_Cypress_Automation_Auth
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Modo de Execução do Projeto

### Executar todos os testes em modo headless (terminal)

```bash
npx cypress run
```

### Executar um arquivo de teste específico

```bash
npx cypress run --spec "cypress/e2e/get-booking.cy.js"
```

```bash
npx cypress run --spec "cypress/e2e/post-bookling.cy.js"
```

### Abrir a interface gráfica do Cypress (Cypress App)

```bash
npx cypress open
```

Na interface gráfica, selecione **E2E Testing** e escolha o arquivo de teste que deseja executar. É a forma mais indicada para acompanhar a execução dos testes em tempo real durante o desenvolvimento.
