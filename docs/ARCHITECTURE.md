# Arquitetura Técnica do Frontend & Decisões de Tecnologia

Este documento detalha a arquitetura, convenções e tecnologias adotadas no desenvolvimento do frontend da plataforma **ClubKey**.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa / Uso |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.1.7 (App Router & Turbopack) | Suporte nativo a React 19, Server Components, SSR/SSG dinâmico, SEO otimizado (`generateMetadata`) e performance de ponta. |
| **Linguagem** | TypeScript 5+ | Tipagem estrita de todas as entidades de domínio, props de componentes e payloads de estado. |
| **Estilização** | Tailwind CSS v4 | Utility-first styling moderno, variáveis CSS nativas, alta performance e zero runtime overhead. |
| **Design System** | Bloom UI + Radix UI Primitives | Sistema de componentes acessíveis, consistentes e baseados no Radix UI com CVA (Class Variance Authority). |
| **Gerenciamento de Estado** | Zustand 5.x (`persist` middleware) | Estado global performático, reativo, com sincronização em `localStorage` e tipagem completa. |
| **Ícones** | Phosphor Icons (`@phosphor-icons/react`) | Pacote de ícones consistente, leve e com múltiplos pesos (`bold`, `regular`, `fill`). |
| **Formulários & Validação** | React Hook Form + Zod | Validação robusta de schemas, controle de erros e feedback em tempo real. |
| **Feedback Visual** | Sonner (`toast`) | Notificações flutuantes elegantes e reativas para ações de sucesso, erro e alertas. |

---

## 🏛️ Padrões de Arquitetura do Frontend

### 1. Separação entre Server Components e Client Components
Para garantir SEO impecável e máxima performance:
- **Server Components (`page.tsx`)**:
  - Responsáveis por receber os parâmetros da rota (ex: `params: Promise<{ id: string; slug: string }>`).
  - Executam a função `generateMetadata` para gerar tags de `title`, `description`, `openGraph` e `twitter` dinâmicas para cada recurso.
  - Repassam os identificadores necessários para os componentes clientes.
- **Client Components (`...Client.tsx` / `use client`)**:
  - Responsáveis pela interatividade, leitura/escrita no store Zustand, animações, modais e formulários.
  - Todos os nomes de arquivos e componentes seguem estritamente a convenção `camelCase` em **inglês** (ex: `eventDetailClient.tsx`, `experienceDetailClient.tsx`, `leaderboardTable.tsx`, `memberProfileDetailClient.tsx`).

### 2. Gerenciamento de Estado Modular (Zustand Slices Pattern)
Para manter o princípio de Responsabilidade Única (SRP) e segregação de interfaces:
- O store global (`src/store/usePortalStore.ts`) compõe fatias modulares por domínio localizadas em `src/store/slices/`:
  - `authSlice.ts`: Sessão, credenciais e dados do usuário ativo.
  - `networkingSlice.ts`: Conexões, convites pendentes e rede de membros.
  - `chatSlice.ts`: Conversas ativas, mensagens não lidas e histórico de chat.
  - `eventsSlice.ts`: RSVPs de eventos e agenda do associado.
  - `staysSlice.ts`: Reservas ativas, vouchers e histórico de estadias.
  - `gamificationSlice.ts`: Tiers do KeyPass, saldo de XP, tokens RIB, missões e conquistas.
  - `profileSlice.ts`: Dados cadastrais, tags de busca/oferta e configurações de segurança.
- Os componentes UI consomem seletores atômicos para evitar re-renderizações desnecessárias.

### 3. Tipos Centralizados & Schemas de Validação
- **Tipos de Domínio (`src/types/`)**: Interfaces centralizadas por entidade (`member.types.ts`, `event.types.ts`, `stay.types.ts`, `gamification.types.ts`, `chat.types.ts`, `benefit.types.ts`, `experience.types.ts`) exportadas via barrel `index.ts`.
- **Validação com Zod (`src/schemas/`)**: Schemas de validação de formulários tipados (`auth.schema.ts`, `subscription.schema.ts`).
- **Utilitários e Formatadores (`src/lib/formatters.ts`)**: Funções centralizadas de formatação (moeda BRL, datas, tempo relativo e números) com suite de testes unitários em Vitest (`src/__tests__/`).

### 4. Diretrizes de Tema Neutro (Bloom UI & ClubKey)
- **Superfícies de Cards & Contêineres**: Fundo estritamente branco puro (`bg-white`) no modo claro e cinza neutro profundo (`bg-zinc-900`, `dark:bg-zinc-900`, bordas `border-zinc-200`, `dark:border-zinc-800`) no modo escuro.
- **Sem Contêineres Coloridos/Azulados**: Apenas superfícies limpas e neutras.
- **Cores de Destaque**: A cor da marca (`#00E599` / `text-brand-primary`) e cores semânticas (`emerald`, `amber`, `red`) são reservadas exclusivamente para tipografia, ícones de status, badges, tags e acentos.

---

## 📁 Estrutura de Diretórios

```
clubkey/
├── docs/                        # Documentação técnica e especificações para o time e IA de backend
│   ├── ARCHITECTURE.md
│   ├── DATABASE_MODELS.md
│   ├── API_SPECIFICATIONS.md
│   ├── ENUMS.md
│   ├── GAMIFICATION_RULES.md
│   ├── SEED_DATA.md
│   └── pages/                   # Documentação detalhada de cada módulo/página
├── public/                      # Assets estáticos (imagens, logotipos, ilustrações, favicons)
│   ├── utils/
│   │   ├── banners/
│   │   └── gamification/        # Insígnias, tiers, tokens e ícones de XP
├── src/
│   ├── __tests__/               # Testes unitários com Vitest
│   │   └── formatters.test.ts
│   ├── app/                     # Next.js App Router (Rotas do sistema)
│   │   ├── (portal)/            # Grupo de rotas autenticadas do portal de membros
│   │   │   ├── layout.tsx       # Layout principal (Header, Sidebar, Messenger, ToastProvider)
│   │   │   ├── page.tsx         # Home / Feed principal
│   │   │   ├── eventos/         # Módulo de Eventos
│   │   │   ├── experiencias/    # Módulo de Experiências
│   │   │   ├── hospedagens/     # Módulo de Hospedagens
│   │   │   ├── conexoes/        # Módulo de Conexões e Networking
│   │   │   ├── beneficios/      # Módulo de Benefícios
│   │   │   ├── keypass/         # Módulo KeyPass (Tiers, Missões, Ranking, Regras)
│   │   │   └── perfil/          # Módulo de Perfil e Assinatura
│   │   ├── sign-in/             # Login
│   │   ├── sign-up/             # Cadastro
│   │   ├── forgot-password/     # Recuperação de senha
│   │   └── reset-password/      # Redefinição de senha
│   ├── components/
│   │   ├── auth/                # Formulários de autenticação (signInForm.tsx, signUpForm.tsx)
│   │   ├── common/              # Componentes universais (container.tsx, dataTable.tsx, ctaButton.tsx)
│   │   ├── portal/              # Componentes de negócio do portal
│   │   │   ├── memberProfile/   # Subcomponentes decompostos do perfil público
│   │   │   │   ├── memberProfileHero.tsx
│   │   │   │   ├── memberProfileDetailsGrid.tsx
│   │   │   │   └── memberProfileBioModal.tsx
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── notificationsDropdown.tsx
│   │   │   └── memberMessengerWidget.tsx
│   │   └── ui/                  # Componentes do Design System Bloom UI
│   ├── data/
│   │   ├── mocks/               # Datasets mockados divididos por domínio
│   │   │   ├── members.data.ts
│   │   │   ├── events.data.ts
│   │   │   ├── experiences.data.ts
│   │   │   ├── benefits.data.ts
│   │   │   ├── gamification.data.ts
│   │   │   ├── stays.data.ts
│   │   │   ├── chat.data.ts
│   │   │   └── slugs.data.ts
│   │   └── portalData.ts        # Barrel export unificado dos mocks e utilitários de dados
│   ├── hooks/                   # Custom Hooks reutilizáveis (useItemPagination, useScrollSpy, useMounted)
│   ├── lib/
│   │   ├── designSystem.ts      # Configuração de tokens de design
│   │   ├── formatters.ts        # Utilitários de formatação de dados (moeda, datas, tempo relativo)
│   │   └── utils.ts             # Utilitários auxiliares (cn)
│   ├── schemas/                 # Schemas de validação Zod (auth.schema.ts, subscription.schema.ts)
│   ├── store/
│   │   ├── slices/              # Fatias de estado Zustand por domínio
│   │   │   ├── authSlice.ts
│   │   │   ├── networkingSlice.ts
│   │   │   ├── chatSlice.ts
│   │   │   ├── eventsSlice.ts
│   │   │   ├── staysSlice.ts
│   │   │   ├── gamificationSlice.ts
│   │   │   └── profileSlice.ts
│   │   └── usePortalStore.ts    # Store global Zustand composto pelas fatias com persistência
│   └── types/                   # Tipos e interfaces TypeScript centralizados por domínio
│       ├── member.types.ts
│       ├── event.types.ts
│       ├── stay.types.ts
│       ├── gamification.types.ts
│       ├── chat.types.ts
│       ├── benefit.types.ts
│       ├── experience.types.ts
│       └── index.ts             # Barrel export centralizado de todos os tipos
```

---

## 🔄 Estratégia & Pipeline de Integração com o Backend

Quando o backend RESTful estiver implementado, a camada de dados do frontend será conectada através de uma pipeline moderna e 100% automatizada e type-safe:

### 1. Stack de Integração no Frontend
- **HTTP Client**: `Axios` com interceptors globais para injeção do header `Authorization: Bearer <token>`, refresh token transparente e tratamento padronizado de erros.
- **Gerenciamento de Estado do Servidor**: `TanStack React Query v5` (`@tanstack/react-query`) para cache assíncrono, revalidação em background, optimistic updates e controle de mutações.
- **Diagnóstico & Debug**: `React Query Devtools` (`@tanstack/react-query-devtools`) integrado em ambiente de desenvolvimento.
- **Geração Automática de Código**: `Orval` (`orval`) para ler a especificação OpenAPI (Swagger/JSON) gerada pelo backend e gerar automaticamente:
  - Todas as interfaces e tipos TypeScript de requisições e respostas.
  - Hooks do React Query (`useQuery`, `useMutation`) tipados e prontos para uso.
  - Funções de chamada HTTP vinculadas à instância customizada do Axios.

### 2. Sugestão para o Backend (PHP / Laravel / Symfony): Documentação com Scalar
Recomenda-se fortemente que o backend em **PHP** exponha a especificação **OpenAPI 3.0 / 3.1** e utilize o **[Scalar](https://scalar.com/)** como interface visual de documentação interativa de API (ex: acessível em `/docs` ou `/api/documentation`):

- **Vantagens do Scalar**: Interface moderna, pesquisa rápida, modo claro/escuro integrado e cliente HTTP embutido para testes de rota.
- **Pacotes recomendados no ecossistema PHP/Laravel**:
  - `dedoc/scramble`: Gera a especificação OpenAPI automaticamente a partir dos FormRequests e rotas do Laravel, sem necessidade de escrever anotações manuais complexas.
  - `scalar/laravel` ou `@scalar/api-reference`: Renderiza o visual do Scalar consumindo o JSON da OpenAPI (`/docs/api.json`).
  - `l5-swagger` / `zircote/swagger-php`: Para controle explícito de anotações OpenAPI se preferir Swagger clássico com visual Scalar.

### 3. Exemplo de Fluxo com Orval (`orval.config.ts`)
Com o backend servindo o arquivo `openapi.json`, a geração de código no frontend é instantânea:

```typescript
// orval.config.ts (exemplo de configuração no frontend)
import { defineConfig } from "orval"

export default defineConfig({
  clubkey: {
    input: {
      target: "http://localhost:8000/docs/api.json", // Endpoint OpenAPI do Backend PHP
    },
    output: {
      mode: "tags-split",
      target: "./src/api/endpoints",
      schemas: "./src/api/model",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/lib/axiosInstance.ts",
          name: "customAxiosInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
})
```

---

## 🎯 Boas Práticas para o Desenvolvedor do Backend Garantir Compatibilidade com Orval
1. **`operationId` em todas as rotas**: Cada endpoint OpenAPI deve conter um `operationId` claro e semântico (ex: `getEvents`, `createEventRsvp`, `getUserProfile`, `getKeypassTiers`), pois o Orval usará esses nomes para gerar os hooks (`useGetEvents`, `useCreateEventRsvp`, etc.).
2. **Propriedades em `camelCase`**: Todos os campos de request/response JSON devem seguir `camelCase` para coincidir 1:1 com os tipos do frontend sem necessidade de transformadores.
3. **CORS liberado para desenvolvimento**: Permitir origem `http://localhost:3000` com `credentials: true` e headers de autorização.

---

## 🛡️ Padrões de Qualidade, SOLID & Pipeline Automatizada

### 1. Princípios SOLID Aplicados
- **Single Responsibility Principle (SRP)**: Componentes mantidos abaixo do threshold de 250–300 linhas. Componentes complexos (como `memberProfileDetailClient.tsx`) são decompostos em subcomponentes atômicos na pasta da funcionalidade.
- **Don't Repeat Yourself (DRY)**: Lógicas recorrentes (como paginação, scroll spy e lifecycle de montagem) são isoladas em custom hooks (`src/hooks/`).
- **Interface Segregation Principle (ISP)**: Tipos de domínio desacoplados e centralizados por entidade em `src/types/`.
- **Dependency Inversion / Slice Pattern (DIP)**: O estado global do Zustand é modularizado em fatias autônomas em `src/store/slices/`.

### 2. Automação de Qualidade & Pipeline de Build
- **Prebuild Hook (`npm run build`)**: Dispara automaticamente a sequência:
  1. `stripComments`: Limpa comentários de debug sem afetar o código de produção.
  2. `prettier`: Garante formatação consistente em todo o código.
  3. `eslint`: Verifica regras de linting estritas.
- **Git Hooks com Husky & Commitlint**:
  - `commit-msg`: Força commits padronizados pelo **Conventional Commits** exclusivamente em **inglês** (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, etc.).
- **Suite de Testes Unitários**:
  - `npm test`: Executa os testes unitários via **Vitest** (`src/__tests__/formatters.test.ts`).

