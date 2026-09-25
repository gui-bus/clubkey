# Arquitetura Técnica do Frontend & Decisões de Tecnologia

Este documento detalha a arquitetura, convenções e tecnologias adotadas no desenvolvimento do frontend da plataforma **White-Label Multi-Tenant**.

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
| **Testes Unitários** | Vitest + React Testing Library | Validação ágil de formatação, componentes, stores, hooks e matriz de módulos (83 testes). |
| **Testes E2E** | Playwright Test | Validação ponta a ponta no navegador de fluxos de login, segurança de rotas e white-label (19 testes). |

---

## 🏛️ Padrões de Arquitetura do Frontend

### 1. Separação entre Server Components e Client Components
Para garantir SEO impecável e máxima performance:
- **Server Components (`page.tsx` e `layout.tsx`)**:
  - Responsáveis por receber os parâmetros da rota (ex: `params: Promise<{ id: string; slug: string }>`).
  - Executam a função `generateMetadata` para gerar tags de `title`, `description`, `openGraph` e `twitter` dinâmicas.
  - Executam guards de segurança no servidor com `assertModule("module_name")` para barrar rotas de módulos desativados.
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

### 4. Diretrizes de Tema Neutro (Bloom UI)
- **Superfícies de Cards & Contêineres**: Fundo estritamente branco puro (`bg-white`) no modo claro e cinza neutro profundo (`bg-zinc-900`, `dark:bg-zinc-900`, bordas `border-zinc-200`, `dark:border-zinc-800`) no modo escuro.
- **Sem Contêineres Coloridos/Azulados**: Apenas superfícies limpas e neutras.
- **Cores de Destaque**: A cor primária da marca (injetada dinamicamente via variáveis CSS por preset) e cores semânticas (`emerald`, `amber`, `red`) são reservadas exclusivamente para tipografia, ícones de status, badges, tags e acentos.

### 5. Arquitetura White-Label & Sistema Modular
A plataforma opera em regime single-codebase multi-tenant controlado por `NEXT_PUBLIC_TENANT`:
- **Presets de Marca (`src/config/brand.config.ts`)**: Matriz de ativação dos 7 módulos do sistema (`home`, `stays`, `networking`, `events`, `experiences`, `benefits`, `keypass`), tokens de cores com injeção dinâmica de variáveis CSS e assets de logotipo.
- **Defesa em Profundidade (4 Camadas)**:
  1. **Edge Proxy (`src/proxy.ts`)**: Intercepta requisições HTTP antes da renderização e reescreve acessos a módulos desativados para `/not-found`.
  2. **Server Route Guards (`assertModule`)**: Executados em Server Components (`layout.tsx` e `page.tsx`), emitindo digest 404 caso o módulo esteja desligado no tenant.
  3. **Componente `<ModuleGate>` (`src/components/common/moduleGate.tsx`)**: Oculta condicionalmente blocos visuais, widgets de dashboard e seções do feed.
  4. **Hook Reativo `useBrandModules()` (`src/hooks/useBrandModules.ts`)**: Expõe o estado reativo de módulos para componentes clientes.
- Para a especificação completa, consulte o documento [`docs/WHITE_LABEL.md`](./WHITE_LABEL.md).

---

## 📁 Estrutura de Diretórios

```
clubkey/
├── docs/                        # Documentação técnica e especificações para o time e IA de backend
│   ├── ARCHITECTURE.md          # Arquitetura global, padrões SOLID e stack
│   ├── WHITE_LABEL.md           # Sistema White-Label e matriz modular
│   ├── DATABASE_MODELS.md       # Modelagem relacional e schemas PostgreSQL
│   ├── API_SPECIFICATIONS.md    # Especificações RESTful e OpenAPI
│   ├── ENUMS.md                 # Dicionário de Enums canônicos
│   ├── GAMIFICATION_RULES.md    # Regras de negócio do KeyPass e XP
│   ├── SEED_DATA.md             # Datasets prontos para seeders
│   └── pages/                   # Documentação funcional por módulo/tela
├── public/                      # Assets estáticos (imagens, logotipos, ilustrações, favicons)
│   ├── utils/
│   │   ├── banners/
│   │   └── gamification/        # Insígnias, tiers, tokens e ícones de XP
│   └── logos/                   # Logotipos oficiais dos presets de marca
├── src/
│   ├── __tests__/               # Testes unitários com Vitest e E2E com Playwright
│   │   ├── modules.test.ts
│   │   ├── brandConfig.test.ts
│   │   ├── moduleGate.test.tsx
│   │   ├── proxy.test.ts
│   │   └── e2e/                 # Testes ponta a ponta com Playwright
│   ├── app/                     # Next.js App Router (Rotas do sistema)
│   │   ├── (portal)/            # Grupo de rotas autenticadas do portal de membros
│   │   │   ├── layout.tsx       # Layout principal (Header, Sidebar, Messenger, ToastProvider)
│   │   │   ├── page.tsx         # Página Inicial e Painel do Associado
│   │   │   ├── eventos/         # Módulo de Eventos (protegido por assertModule)
│   │   │   ├── experiencias/    # Módulo de Experiências (protegido por assertModule)
│   │   │   ├── hospedagens/     # Módulo de Hospedagens (protegido por assertModule)
│   │   │   ├── conexoes/        # Módulo de Conexões e Networking (protegido por assertModule)
│   │   │   ├── beneficios/      # Módulo de Benefícios (protegido por assertModule)
│   │   │   ├── keypass/         # Módulo KeyPass (protegido por assertModule)
│   │   │   └── perfil/          # Módulo de Perfil e Assinatura
│   │   ├── entrar/              # Login
│   │   ├── cadastro/            # Cadastro e adesão
│   │   ├── esqueci-minha-senha/ # Recuperação de senha
│   │   └── redefinir-senha/     # Redefinição de senha
│   ├── config/                  # Configurações multi-tenant, presets de marca e módulos
│   │   ├── brand.config.ts      # Presets de marcas e gerador de variáveis CSS
│   │   ├── modules.config.ts    # Registro canônico dos 7 módulos e validação de rotas
│   │   ├── site.ts              # Metadados globais e links
│   │   └── env.ts               # Validação de variáveis de ambiente
│   ├── proxy.ts                 # Edge Proxy do Next.js 16 para segurança de rotas e bypass de assets
│   ├── components/
│   │   ├── auth/                # Formulários de autenticação (signInForm.tsx, signUpForm.tsx)
│   │   ├── common/              # Componentes universais (container.tsx, moduleGate.tsx, ctaButton.tsx)
│   │   ├── portal/              # Componentes de negócio do portal
│   │   └── ui/                  # Componentes do Design System Bloom UI
│   ├── hooks/                   # Custom Hooks reutilizáveis (useBrandModules, useItemPagination, useScrollSpy)
│   ├── lib/
│   │   ├── designSystem.ts      # Configuração de tokens de design Bloom UI
│   │   ├── formatters.ts        # Utilitários de formatação (moeda, datas, tempo relativo)
│   │   └── utils.ts             # Utilitários auxiliares (cn)
│   ├── schemas/                 # Schemas de validação Zod (auth.schema.ts, subscription.schema.ts)
│   ├── store/
│   │   ├── slices/              # Fatias de estado Zustand por domínio
│   │   └── usePortalStore.ts    # Store global Zustand composto com persistência
│   └── types/                   # Tipos e interfaces TypeScript centralizados por domínio
```

---

## 🔄 Estratégia & Pipeline de Integração com o Backend

Quando o backend RESTful estiver implementado, a camada de dados do frontend será conectada através de uma pipeline moderna e 100% automatizada e type-safe:

### 1. Stack de Integração no Frontend
- **HTTP Client**: `Axios` com interceptors globais para injeção do header `Authorization: Bearer <token>`, `X-Tenant-ID: <tenant>`, refresh token transparente e tratamento padronizado de erros.
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

---

## 🛡️ Padrões de Qualidade, SOLID & Pipeline Automatizada

### 1. Princípios SOLID Aplicados
- **Single Responsibility Principle (SRP)**: Componentes mantidos abaixo do threshold de 250–300 linhas. Componentes complexos (como `memberProfileDetailClient.tsx`) são decompostos em subcomponentes atômicos na pasta da funcionalidade.
- **Don't Repeat Yourself (DRY)**: Lógicas recorrentes (como paginação, scroll spy e verificação de módulos) são isoladas em custom hooks (`src/hooks/`).
- **Interface Segregation Principle (ISP)**: Tipos de domínio desacoplados e centralizados por entidade em `src/types/`.
- **Dependency Inversion / Slice Pattern (DIP)**: O estado global do Zustand é modularizado em fatias autônomas em `src/store/slices/`.

### 2. Automação de Qualidade & Pipeline de Build
- **Prebuild Hook (`npm run build`)**: Dispara automaticamente a sequência de linters e formatação.
- **Git Hooks com Husky & Commitlint**: Força commits padronizados pelo **Conventional Commits** exclusivamente em **inglês**.
- **Suite de Testes Completa**:
  - `pnpm test`: Executa os testes unitários via **Vitest** (83 testes).
  - `pnpm test:e2e`: Executa os testes ponta a ponta via **Playwright** (19 testes).
  - `pnpm test:all`: Executa ambas as suítes em sequência garantindo 100% de integridade.
