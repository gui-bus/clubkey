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

## 🔄 Como o Backend se Integrará ao Frontend

1. **Camada de Serviços / API Client**:
   - Bastará criar uma instância do `axios` ou `fetch` com interceptors para anexar o token `Authorization: Bearer <token>`.
2. **Substituição do Zustand Mock pelo React Query ou Handlers**:
   - As funções hoje presentes no `usePortalStore` (como `toggleEventRSVP`, `buyExperience`, `updateProfile`) passarão a invocar mutações HTTP na API REST do backend.
   - Os contratos de retorno de dados esperados pelo frontend são exatamente as interfaces TypeScript já documentadas em `src/data/portalData.ts`.
