# 👥 Gestão de Membros & Usuários — ClubKey Admin

A área de **Gestão de Membros & Usuários** (`/usuarios` e `/membros`) gerencia o ciclo de vida completo dos associados do clube, desde a solicitação inicial até a aprovação, suspensão, histórico de estadias e cancelamento.

---

## 🔍 Recursos e Funcionalidades

1. **Busca e Filtros Avançados:**
   * Busca instantânea por Nome, E-mail ou CPF/CNPJ.
   * Filtro por Status: `Todos`, `Ativos`, `Pendentes` e `Inativos`.
   * Filtro por Categoria do Membro (`Silver`, `Gold`, `Black`, `Diamond`).

2. **Ações Operacionais:**
   * **Aprovação de Novos Cadastros:** Validação de documentos e liberação de acesso com um clique.
   * **Convidar Novo Membro:** Envio de e-mail de onboarding com link pré-aprovado.
   * **Exportação:** Geração de relatórios em formato CSV com histórico cadastral.

3. **Detalhes do Membro (`/usuarios/[slug]/detalhes/[tab]`):**
   * Visualização com avatar ampliado, status em tempo real com `TableStatusBadge`.
   * Abas de navegação interna: Perfil, Histórico de Estadias, Eventos Inscritos e Transações Financeiras.

4. **Status de Membros:**
   * `Ativo`: Membro com acesso total liberado às reservas e benefícios.
   * `Pendente`: Cadastro em análise pela diretoria/comitê de admissão.
   * `Inativo`: Membro com assinatura suspensa ou cancelada.
