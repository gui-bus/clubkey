# 🗝️ ClubKey — Portal Executivo & Ecossistema de Membros

O **ClubKey** é uma plataforma web executiva de alta performance, fortemente tipada e projetada sobre o ecossistema do **React 19** e **Next.js 16 (App Router + Turbopack)**. Integra a biblioteca de componentes **Bloom UI**, gerenciamento de estado global modular com **Zustand (Slice Pattern)**, validação robusta de formulários com **React Hook Form + Zod** e estilização moderna via **Tailwind CSS v4**.

---

## 🚀 Comandos de Desenvolvimento

Utilize os comandos `npm` abaixo para gerenciar e executar o projeto:

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento com Turbopack
npm run dev

# Execute a validação estática de tipos (TypeScript)
npm run typecheck

# Execute a suíte de testes unitários (Vitest)
npm test

# Execute os testes unitários em modo interativo
npm run test:watch

# Execute o linter de código
npm run lint

# Formate o código com Prettier
npm run format

# Compile o projeto para produção (executa prebuild com stripComments + prettier + eslint)
npm run build

# Inicie o servidor de produção
npm start
```

---

## 🛠️ Stack Tecnológica

<div align="center">
  <img alt="React" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React.svg">
  <img alt="NextJS" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/NextJS.svg">
  <img alt="TypeScript" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg">
  <img alt="TailwindCSS" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/TailwindCSS.svg">
  <img alt="Bloom" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Bloom.svg">
  <img alt="Framer Motion" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Framer%20Motion.svg">
  <img alt="React Hook Form" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Hook%20Form.svg">
  <img alt="Zod" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zod.svg">
  <img alt="TanStack" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Tanstack.svg">
  <img alt="Vitest" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Vitest.svg">
  <img alt="Husky" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Husky.svg">
  <img alt="Zustand" height="50" width="50" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zustand.svg">
</div>

---

## 🏛️ Arquitetura do Sistema

A aplicação é estruturada segundo princípios de **Clean Architecture**, **SOLID** e **Single Responsibility Principle (SRP)**:

```mermaid
graph TB
    subgraph AppRouter ["🌐 Next.js App Router (src/app/)"]
        PortalLayout["(portal)/layout.tsx (Header, Sidebar, Messenger, Toast)"]
        PortalPages["(portal)/* (Home, Eventos, Experiências, Hospedagens, Conexões, KeyPass, Perfil)"]
        AuthPages["(auth)/* (Sign-in, Sign-up, Forgot/Reset Password)"]
    end

    subgraph ComponentsLayer ["🧩 Camada de Componentes (src/components/)"]
        PortalComp["portal/ (Componentes de Negócio & Subcomponentes)"]
        AuthComp["auth/ (Formulários tipados de autenticação)"]
        CommonComp["common/ (Container, DataTable, CtaButton)"]
        BloomUI["ui/ (Design System Bloom UI + Radix Primitives)"]
    end

    subgraph StateAndDomain ["🧠 Estado Global, Domínio & Dados"]
        Store["store/slices/ (Zustand Slices: Auth, Networking, Chat, Events, Stays, Gamification, Profile)"]
        Types["types/ (Contratos TypeScript centralizados por domínio)"]
        Schemas["schemas/ (Validação Zod para formulários e ações)"]
        DataMocks["data/mocks/ (Datasets isolados + portalData.ts)"]
        Formatters["lib/formatters.ts (Formatadores de moeda, datas e tempo)"]
        Hooks["hooks/ (useItemPagination, useScrollSpy, useMounted)"]
    end

    subgraph QualityPipeline ["🧪 Pipeline de Qualidade & CI"]
        Prebuild["Prebuild Hook (stripComments → prettier → eslint)"]
        VitestRunner["Vitest Unit Tests (src/__tests__/)"]
        HuskyGate["Husky + Commitlint (Conventional Commits em Inglês)"]
    end

    PortalPages --> PortalLayout
    PortalPages --> PortalComp
    AuthPages --> AuthComp
    PortalComp --> BloomUI
    PortalComp --> CommonComp
    PortalComp --> Store
    PortalComp --> Hooks
    PortalComp --> Formatters
    Store --> Types
    AuthComp --> Schemas
    DataMocks --> Types

    QualityPipeline -.->|Valida antes do build| AppRouter
    QualityPipeline -.->|Valida código e testes| StateAndDomain
```

---

## 📚 Documentação Técnica de Backend & APIs

Toda a especificação completa de modelagem de dados, regras de negócio da gamificação (KeyPass), contratos de API RESTful e manuais por módulo estão documentados na pasta [`docs/`](./docs):

- **[`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)**: Arquitetura técnica detalhada do frontend, convenções de código, pipeline e integração OpenAPI/Orval.
- **[`docs/DATABASE_MODELS.md`](./docs/DATABASE_MODELS.md)**: Modelagem relacional de banco de dados completa para o time de backend.
- **[`docs/API_SPECIFICATIONS.md`](./docs/API_SPECIFICATIONS.md)**: Especificação de todas as rotas RESTful, payloads e status codes.
- **[`docs/ENUMS.md`](./docs/ENUMS.md)**: Dicionário central de Enums e constantes padronizadas.
- **[`docs/GAMIFICATION_RULES.md`](./docs/GAMIFICATION_RULES.md)**: Manual oficial de pontuação, XP, tiers executivos e retenção do KeyPass.
- **[`docs/SEED_DATA.md`](./docs/SEED_DATA.md)**: Datasets JSON prontos para seeders de banco de dados.
- **[`docs/pages/`](./docs/pages)**: Documentação detalhada de regras e fluxos tela por tela.

---

## 🛡️ Padrões de Código & Git Commits

- **Nomenclatura de Arquivos**: Todos os arquivos de código-fonte seguem rigorosamente a convenção `camelCase` em inglês (`eventDetailClient.tsx`, `roomsSearchFilterBar.tsx`, `useItemPagination.ts`, `member.types.ts`).
- **Commits Convencionais**: Forçados via Husky (`commit-msg`) e Commitlint exclusivamente em inglês (ex: `feat(events): add rsvp confirmation modal`, `fix(auth): handle expired token error`).
