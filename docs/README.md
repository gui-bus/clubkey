# ClubKey — Documentação Técnica & Especificações do Sistema

Bem-vindo à documentação técnica oficial do ecossistema **ClubKey Monorepo & White-Label Multi-Tenant**.

Este diretório está organizado em três pilares principais para que desenvolvedores, arquitetos de software e agentes de inteligência artificial (IAs) possam compreender integralmente a plataforma, estender funcionalidades e construir integrações com máxima padronização.

---

## 🏛️ Os Três Pilares da Documentação

```
docs/
├── 1. Arquitetura Global & Engenharia (Monorepo, Design System, White Label, DB & APIs)
├── 2. Portal do Cliente (apps/web — Hospedagens, Eventos, Benefícios, KeyPass)
└── 3. Painel Administrativo (apps/admin — Backoffice, Gestão de Membros, Dashboard, Stays)
```

---

## 📚 1. Arquitetura Global & Engenharia

* **[`MONOREPO.md`](./MONOREPO.md)**: Guia completo da arquitetura Monorepo (pnpm workspaces + Turborepo), estrutura de pacotes compartilhados (`@clubkey/ui`, `@clubkey/types`, `@clubkey/schemas`, `@clubkey/utils`) e pipelines de deploy independente.
* **[`ARCHITECTURE.md`](./ARCHITECTURE.md)**: Arquitetura técnica global do Frontend, Next.js 16 (App Router), Server/Client Components, Edge Proxy e decisões de tecnologia.
* **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)**: Diretrizes do Design System Bloom UI em `@clubkey/ui`, política de tema neutro (cards brancos/zinco), tokens CVA, injeção dinâmica de CSS variables e fontes.
* **[`WHITE_LABEL.md`](./WHITE_LABEL.md)**: Especificação do Sistema White-Label & Arquitetura Modular (`brandPresets`, matriz `modules`, defesa em profundidade em 4 camadas e guards de rota).
* **[`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md)**: Gerenciamento de Estado com Zustand 5, Slice Pattern por domínio e atualizações otimistas.
* **[`TESTING.md`](./TESTING.md)**: Estratégia de testes automatizados com Vitest, Playwright e Git Hooks com Husky.
* **[`DATABASE_MODELS.md`](./DATABASE_MODELS.md)**: Modelagem relacional de banco de dados (PostgreSQL ERD, tabelas e isolamento multi-tenant por `tenantId`).
* **[`API_SPECIFICATIONS.md`](./API_SPECIFICATIONS.md)**: Especificação completa de todas as rotas RESTful, parâmetros, payloads JSON e autenticação.
* **[`ENUMS.md`](./ENUMS.md)**: Dicionário central de todos os tipos enumerados (`Enums`) padronizados em inglês.
* **[`GAMIFICATION_RULES.md`](./GAMIFICATION_RULES.md)**: Manual de regras de negócio do KeyPass, cálculo de XP, subida de tier e bônus de RIB tokens.
* **[`SEED_DATA.md`](./SEED_DATA.md)**: Datasets iniciais prontos em JSON para seeders de banco de dados.

---

## 🌐 2. Especificações do Portal do Cliente (`apps/web`)

👉 **[Índice Completo do Portal do Cliente (`docs/pages/portal/README.md`)](./pages/portal/README.md)**

* **[`pages/portal/HOME.md`](./pages/portal/HOME.md)**: Feed Principal, indicadores rápidos, agenda de eventos e matchmaking.
* **[`pages/portal/HOSPEDAGENS.md`](./pages/portal/HOSPEDAGENS.md)**: Catálogo de Hospedagens, Filtros, Detalhes da Villa, Voucher com QR Code.
* **[`pages/portal/EVENTOS.md`](./pages/portal/EVENTOS.md)**: Catálogo de Eventos, RSVP, Lista "Quem Vai" e Meus Eventos.
* **[`pages/portal/EXPERIENCIAS.md`](./pages/portal/EXPERIENCIAS.md)**: Experiências Gastronômicas & Lifestyle sob medida.
* **[`pages/portal/BENEFICIOS.md`](./pages/portal/BENEFICIOS.md)**: Clube de Vantagens e Resgate de Cupons de Parceiros.
* **[`pages/portal/KEYPASS.md`](./pages/portal/KEYPASS.md)**: Tiers Executivos, Progresso de XP, Tokens RIB, Missões e Ranking Global.
* **[`pages/portal/CONEXOES.md`](./pages/portal/CONEXOES.md)**: Diretório de Membros, Matchmaking e Chat Privativo.
* **[`pages/portal/PERFIL.md`](./pages/portal/PERFIL.md)**: Perfil do Membro, Edição Cadastral e Gestão de Assinatura.
* **[`pages/portal/NOTIFICACOES.md`](./pages/portal/NOTIFICACOES.md)**: Central de Notificações Global e Alertas.
* **[`pages/portal/AUTH.md`](./pages/portal/AUTH.md)**: Fluxos de Login, Cadastro, Recuperação e Redefinição de Senha.

---

## ⚙️ 3. Especificações do Painel Administrativo (`apps/admin`)

👉 **[Índice Completo do Painel Administrativo (`docs/pages/admin/README.md`)](./pages/admin/README.md)**

* **[`pages/admin/AUTH.md`](./pages/admin/AUTH.md)**: Autenticação split screen, desafio de 2FA TOTP e proxy de sessão `clubkey_admin_session`.
* **[`pages/admin/PERFIL.md`](./pages/admin/PERFIL.md)**: Perfil do operador, edição cadastral com `ImageCropper`, badges de governança e gestão de 2FA.
* **[`pages/admin/DASHBOARD.md`](./pages/admin/DASHBOARD.md)**: Indicadores de desempenho (KPIs), MRR, taxa de ocupação e saúde das APIs.
* **[`pages/admin/MEMBROS.md`](./pages/admin/MEMBROS.md)**: Gestão de associados, esteira de aprovação manual e exportação CSV.
* **[`pages/admin/HOSPEDAGENS.md`](./pages/admin/HOSPEDAGENS.md)**: Gestão de inventário de acomodações, tarifas e disponibilidade.
* **[`pages/admin/EVENTOS.md`](./pages/admin/EVENTOS.md)**: Criação de eventos, lotes de ingressos, regras KeyPass e lista de presença.
* **[`pages/admin/BENEFICIOS.md`](./pages/admin/BENEFICIOS.md)**: Gestão de marcas parceiras, cupons de desconto e controle de resgates.
* **[`pages/admin/CONFIGURACOES.md`](./pages/admin/CONFIGURACOES.md)**: Feature flags de módulos, políticas de segurança (2FA) e White Label.

---

## 🤖 Guia para Desenvolvedores & Agentes de IA

1. Para adicionar ou modificar componentes visuais, edite em `packages/ui` seguindo as diretrizes do **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)**.
2. Para alterar regras ou tipagens de domínio, modifique `packages/types` e `packages/schemas`.
3. Para rodar ambas as aplicações localmente: `pnpm dev`.
4. Para validar a integridade antes de commits: `pnpm validate` ou `pnpm test`.
