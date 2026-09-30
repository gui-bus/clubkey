# ⚙️ Documentação do Painel Administrativo (`apps/admin`)

O **ClubKey Admin (Backoffice)** é o sistema de gestão centralizada e inteligência operacional do clube, permitindo aos administradores, gestores e operadores o controle integral dos membros, inventário de hospedagens, ingressos de eventos, parcerias e configurações de White Label.

---

## 📂 Módulos e Documentação do Admin

| Módulo / Rota | Arquivo de Documentação | Descrição |
| :--- | :--- | :--- |
| `/dashboard` | [`DASHBOARD.md`](./DASHBOARD.md) | Indicadores de desempenho (KPIs), MRR, taxa de ocupação, adesões e gráficos. |
| `/membros` | [`MEMBROS.md`](./MEMBROS.md) | Cadastro, esteira de aprovação manual de membros, filtros e permissões. |
| `/hospedagens` | [`HOSPEDAGENS.md`](./HOSPEDAGENS.md) | Gestão de villas parceiras, tarifas, disponibilidade de datas e fotos. |
| `/eventos` | [`EVENTOS.md`](./EVENTOS.md) | Criação de eventos, lotes de ingressos, controle de acesso KeyPass e lista de presença. |
| `/beneficios` | [`BENEFICIOS.md`](./BENEFICIOS.md) | Gestão de parceiros, cupons, regras de resgate e parcerias ativas. |
| `/configuracoes` | [`CONFIGURACOES.md`](./CONFIGURACOES.md) | Feature flags de módulos, parâmetros do White Label, 2FA e logs de auditoria. |

---

## 🔒 Segurança e Controle de Acesso (RBAC)

O acesso ao Admin é restrito por perfis:
1. **Super Admin (Diretoria):** Acesso irrestrito a configurações fiscais, módulos, convites e exclusão de dados.
2. **Manager (Gestor Operacional):** Acesso a aprovação de membros, edição de estadias e gestão de eventos.
3. **Concierge / Suporte:** Visualização de reservas, membros e emissão de vouchers.
