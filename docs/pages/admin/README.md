# ⚙️ Documentação do Painel Administrativo (`apps/admin`)

O **ClubKey Admin (Backoffice)** é o sistema de gestão centralizada e inteligência operacional da plataforma, permitindo aos administradores, diretores e operadores o controle integral dos membros, inventário de hospedagens, ingressos de eventos, parcerias, sinistros e configurações de White Label.

---

## 📂 Módulos e Documentação do Admin

| Módulo / Rota | Arquivo de Documentação | Descrição |
| :--- | :--- | :--- |
| `/login`, `/esqueci-minha-senha` | [`AUTH.md`](./AUTH.md) | Autenticação split screen, desafio de 2FA TOTP e proxy de sessão `clubkey_admin_session`. |
| `/perfil` | [`PERFIL.md`](./PERFIL.md) | Perfil do operador, edição cadastral com `ImageCropper`, badges de governança e gestão de 2FA. |
| `/dashboard` | [`DASHBOARD.md`](./DASHBOARD.md) | Indicadores de desempenho (KPIs), MRR, taxa de ocupação, adesões e gráficos. |
| `/usuarios` e `/membros` | [`MEMBROS.md`](./MEMBROS.md) | Cadastro, esteira de aprovação manual de associados, filtros e perfis detalhados. |
| `/hospedagens` | [`HOSPEDAGENS.md`](./HOSPEDAGENS.md) | Gestão de villas parceiras, tarifas dinâmicas, disponibilidade de datas e fotos. |
| `/eventos` | [`EVENTOS.md`](./EVENTOS.md) | Criação de eventos, lotes de ingressos, controle de acesso KeyPass e lista de presença. |
| `/beneficios` | [`BENEFICIOS.md`](./BENEFICIOS.md) | Gestão de parceiros, cupons, regras de resgate e parcerias ativas. |
| `/configuracoes` | [`CONFIGURACOES.md`](./CONFIGURACOES.md) | Feature flags de módulos, parâmetros do White Label, 2FA e logs de auditoria. |

---

## 🔒 Segurança e Controle de Acesso (RBAC)

O acesso ao Admin é restrito e segmentado por perfis de governança:
1. **Super Admin (Diretoria):** Acesso irrestrito a configurações fiscais, feature flags de módulos, convites de novos operadores e exclusão de dados.
2. **Manager (Gestor Operacional):** Acesso a aprovação de membros, edição de estadias, gestão de eventos e relatórios operacionais.
3. **Concierge / Suporte:** Visualização de reservas, diretório de membros e emissão de vouchers de atendimento.

---

## 🛠️ Tecnologias e Pacotes Utilizados

* **Framework:** Next.js 16 (App Router + Turbopack) + React 19
* **Design System:** `@clubkey/ui` (Bloom UI + Tailwind CSS v4 + `TableStatusBadge`)
* **Tipos e Schemas:** `@clubkey/types` e `@clubkey/schemas` (Zod)
* **Utilitários:** `@clubkey/utils` (`cn`, formatters, masks)
* **Estado Global:** Zustand (`apps/admin/src/store/useAdminStore.ts`)
* **Proteção de Borda:** Edge Proxy (`apps/admin/src/proxy.ts`)
