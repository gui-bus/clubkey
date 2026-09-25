# ClubKey — Documentação Técnica & Especificações do Sistema

Bem-vindo à documentação técnica oficial do ecossistema **ClubKey & White-Label Multi-Tenant**.

Este diretório foi projetado especificamente para que desenvolvedores, arquitetos de software e agentes de inteligência artificial (IAs) possam compreender integralmente o funcionamento da plataforma, estender funcionalidades e construir integrações e backends de forma precisa, padronizada e sem ambiguidades.

---

## 📚 Índice Geral da Documentação

### 1. Arquitetura, Estado & Design System
- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)**: Arquitetura técnica global do Frontend, Next.js 16 (App Router), Server/Client Components, Edge Proxy e decisões de tecnologia.
- **[`WHITE_LABEL.md`](./WHITE_LABEL.md)**: Especificação completa do Sistema White-Label & Arquitetura Modular (`brandPresets`, matriz `modules`, defesa em profundidade em 4 camadas, guards de rota e desacoplamento visual).
- **[`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md)**: Arquitetura de Gerenciamento de Estado com Zustand 5, Slice Pattern por domínio, persistência isolada por tenant e atualizações otimistas.
- **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)**: Diretrizes do Design System Bloom UI, política de tema neutro (cards brancos/zinco), tokens CVA, injeção dinâmica de CSS variables, formatadores e máscaras.
- **[`TESTING.md`](./TESTING.md)**: Estratégia de testes automatizados, suítes unitárias com Vitest (83 testes), suítes E2E com Playwright (19 testes) e Git Hooks com Husky.

### 2. Especificações de Dados & Backend
- **[`DATABASE_MODELS.md`](./DATABASE_MODELS.md)**: Modelagem relacional de banco de dados sugerida (PostgreSQL ERD, tabelas, chaves primárias/estrangeiras e isolamento multi-tenant por `tenantId`).
- **[`API_SPECIFICATIONS.md`](./API_SPECIFICATIONS.md)**: Especificação completa de todas as rotas RESTful, parâmetros, payloads JSON, autenticação e códigos de resposta HTTP.
- **[`ENUMS.md`](./ENUMS.md)**: Dicionário central de todos os tipos enumerados (`Enums`) e constantes em inglês padronizados em `lowercase`/`snake_case`.
- **[`GAMIFICATION_RULES.md`](./GAMIFICATION_RULES.md)**: Manual de regras de negócio do KeyPass, algoritmos de cálculo de XP, subida de tier, bônus de RIB tokens, marcos e política de retenção.
- **[`SEED_DATA.md`](./SEED_DATA.md)**: Datasets iniciais prontos em JSON para seeders de banco de dados (Tiers, Badges, Missões, Drops e Benefícios).

### 3. Especificações por Página / Módulo (`docs/pages/`)
Cada documento descreve as funcionalidades da tela, componentes visuais, interações, dados consumidos e rotas de API:
- **[`pages/HOME.md`](./pages/HOME.md)**: Página Inicial / Feed Principal (Boas-vindas, indicadores rápidos, agenda, matchmaking de conexões e experiências).
- **[`pages/HOSPEDAGENS.md`](./pages/HOSPEDAGENS.md)**: Catálogo de Hospedagens, Detalhes da Acomodação, Minhas Hospedagens, Voucher com QR Code e Cancelamento.
- **[`pages/EVENTOS.md`](./pages/EVENTOS.md)**: Catálogo de Eventos, Detalhes, Confirmação de Presença (RSVP), Lista de Participantes ("Quem Vai") e Meus Eventos.
- **[`pages/EXPERIENCIAS.md`](./pages/EXPERIENCIAS.md)**: Experiências Gastronômicas & Lifestyle, Detalhes, Checkout com Abatimento em Tokens RIB e Lista "Quem Vai".
- **[`pages/BENEFICIOS.md`](./pages/BENEFICIOS.md)**: Parcerias Exclusivas de Luxo, Categorias e Resgate de Cupons.
- **[`pages/CONEXOES.md`](./pages/CONEXOES.md)**: Diretório de Membros, Filtros de Matchmaking (Seeking/Offering), Perfil Público do Associado e Chat em Tempo Real.
- **[`pages/KEYPASS.md`](./pages/KEYPASS.md)**: Sistema KeyPass — Tiers Executivos, Progresso de XP, Tokens RIB, Missões Qualificadoras, Conquistas, Drops Semanais e Ranking Global.
- **[`pages/PERFIL.md`](./pages/PERFIL.md)**: Perfil do Membro Logado, Edição Cadastral, Tags de Negócios, Segurança 2FA e Gestão de Assinatura.
- **[`pages/NOTIFICACOES.md`](./pages/NOTIFICACOES.md)**: Central de Notificações Global (Dropdown de avisos, convites de networking pendentes e mensagens não lidas).
- **[`pages/AUTH.md`](./pages/AUTH.md)**: Fluxos de Autenticação (Login, Solicitação de Adesão, Recuperação e Redefinição de Senha).

---

## 🤖 Guia para Desenvolvedores & Agentes de IA

Para estender ou integrar o ecossistema:
1. **Consulte [`WHITE_LABEL.md`](./WHITE_LABEL.md)** para entender como o sistema ativa/desativa módulos e isola rotas no Edge Proxy e nos componentes.
2. **Consulte [`ENUMS.md`](./ENUMS.md)** para garantir que novos campos utilizem os identificadores canônicos corretos.
3. **Leia [`DATABASE_MODELS.md`](./DATABASE_MODELS.md)** e **[`API_SPECIFICATIONS.md`](./API_SPECIFICATIONS.md)** ao modelar tabelas e construir endpoints de backend.
4. **Consulte [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)** ao criar novas interfaces para manter a conformidade com o Bloom UI e a política de temas neutros.
5. **Consulte [`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md)** para entender o fluxo de dados reativo e as fatias do Zustand.
6. **Execute `pnpm test:all`** (conforme detalhado em **[`TESTING.md`](./TESTING.md)**) para validar a integridade de qualquer nova alteração antes de submeter commits.
