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
  - Todos os nomes de componentes seguem estritamente o padrão em **inglês** (ex: `EventDetailClient`, `ExperienceDetailClient`, `LeaderboardTable`, `MemberProfileDetailClient`).

### 2. Diretrizes de Tema Neutro (Bloom UI & ClubKey)
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
│   └── pages/                   # Documentação detalhada de cada página
├── public/                      # Assets estáticos (imagens, logotipos, ilustrações, favicons)
│   ├── utils/
│   │   ├── banners/
│   │   └── gamification/        # Insígnias, tiers, tokens e ícones de XP
├── src/
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
│   │   ├── auth/                # Formulários de autenticação
│   │   ├── common/              # Componentes universais (Container, DataTable, CtaButton, etc.)
│   │   ├── portal/              # Componentes de negócio do portal (Cards, Tabelas, Modais)
│   │   └── ui/                  # Componentes do Design System Bloom UI
│   ├── data/
│   │   └── portalData.ts        # Modelos TypeScript e datasets mockados
│   ├── store/
│   │   └── usePortalStore.ts    # Store global Zustand com persistência
│   └── lib/
│       └── utils.ts             # Utilitários auxiliares (cn, formatters)
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
