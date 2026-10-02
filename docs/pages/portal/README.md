# 🌐 Documentação do Portal do Cliente (`apps/web`)

O **Portal do Cliente ClubKey** é a aplicação web voltada aos membros associados, oferecendo uma experiência premium e fluida para reservas de estadias, confirmação de presença em eventos, resgate de benefícios parceiros, conexões e gamificação (KeyPass).

---

## 📂 Mapa de Páginas e Módulos do Portal

| Página / Rota | Arquivo de Documentação | Descrição |
| :--- | :--- | :--- |
| `/` e `/home` | [`HOME.md`](./HOME.md) | Feed principal, destaques de estadias, próximos eventos e atalhos rápidos. |
| `/entrar`, `/cadastro` | [`AUTH.md`](./AUTH.md) | Fluxos de autenticação, onboarding de novos membros e recuperação de senha. |
| `/hospedagens` | [`HOSPEDAGENS.md`](./HOSPEDAGENS.md) | Busca de villas, filtros avançados por destino, datas, comodidades e checkout. |
| `/eventos` | [`EVENTOS.md`](./EVENTOS.md) | Calendário de eventos exclusivos, ingressos e confirmação de presença. |
| `/experiencias` | [`EXPERIENCIAS.md`](./EXPERIENCIAS.md) | Catálogo de experiências sob medida para membros. |
| `/beneficios` | [`BENEFICIOS.md`](./BENEFICIOS.md) | Clube de vantagens, descontos em marcas parceiras e cupons de resgate. |
| `/keypass` | [`KEYPASS.md`](./KEYPASS.md) | Programa de pontos, missões de engajamento e ranking de membros. |
| `/conexoes` | [`CONEXOES.md`](./CONEXOES.md) | Rede de networking entre membros e chat privativo. |
| `/perfil` | [`PERFIL.md`](./PERFIL.md) | Gerenciamento de perfil, histórico de reservas e dados da assinatura. |
| Central de Notificações | [`NOTIFICACOES.md`](./NOTIFICACOES.md) | Notificações de confirmação de reservas, pontos e avisos do clube. |

---

## 🛠️ Tecnologias e Pacotes Utilizados

* **Framework:** Next.js 16 (App Router) + React 19
* **Design System:** `@clubkey/ui` (Bloom UI + Tailwind CSS v4)
* **Tipos e Schemas:** `@clubkey/types` e `@clubkey/schemas` (Zod)
* **Estado Global:** Zustand (`apps/web/src/store/usePortalStore.ts`)
* **Gerenciamento de Dados:** `@tanstack/react-query`
