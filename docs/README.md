# ClubKey — Documentação Técnica & Especificações de Backend

Bem-vindo à documentação oficial do ecossistema **ClubKey** — portal exclusivo para membros de alta performance e associados executivos.

Este diretório foi projetado especificamente para que desenvolvedores de backend e agentes de inteligência artificial (IAs) possam entender completamente a arquitetura do frontend, modelar o banco de dados e construir a API RESTful de forma precisa, sem ambiguidades.

---

## 📚 Índice da Documentação

### 1. Visão Geral & Arquitetura
- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)**: Arquitetura técnica do Frontend, Next.js 16 (App Router), convenções de Server/Client Components, gerenciamento de estado (Zustand), Design System (Bloom UI) e decisões de tecnologia.
- **[`DATABASE_MODELS.md`](./DATABASE_MODELS.md)**: Modelagem relacional de banco de dados sugerida (entidades, relacionamentos, chaves primárias/estrangeiras e tipos).
- **[`API_SPECIFICATIONS.md`](./API_SPECIFICATIONS.md)**: Especificação completa de todas as rotas de API, métodos HTTP, parâmetros de rota/query, schemas de requisição e resposta (JSON), autenticação e status codes.
- **[`ENUMS.md`](./ENUMS.md)**: Dicionário central de todos os Enums e constantes padronizados em inglês (`lowercase`/`snake_case`).
- **[`GAMIFICATION_RULES.md`](./GAMIFICATION_RULES.md)**: Manual de regras de negócio do KeyPass, algoritmos de cálculo de XP, subida de tier, bônus de RIB tokens, marcos intermediários e regras de retenção/descongelamento.
- **[`SEED_DATA.md`](./SEED_DATA.md)**: Datasets iniciais prontos em JSON para seeders de banco de dados (Tiers, Badges, Missões, Drops e Benefícios).

### 2. Especificações por Página / Módulo
Cada documento descreve as funcionalidades da tela, dados consumidos, ações do usuário e rotas de API necessárias:
- **[`pages/home.md`](./pages/home.md)**: Portal Home / Feed Principal (Eventos em destaque, membros recomendados, experiências, estatísticas e stories).
- **[`pages/hospedagens.md`](./pages/hospedagens.md)**: Catálogo de Hospedagens, Detalhes da Acomodação, Minhas Hospedagens, Voucher e Cancelamento de Reservas.
- **[`pages/eventos.md`](./pages/eventos.md)**: Catálogo de Eventos, Detalhes, Confirmação de Presença (RSVP), Lista de Participantes ("Quem Vai") e Meus Eventos.
- **[`pages/experiencias.md`](./pages/experiencias.md)**: Experiências Gastronômicas & Lifestyle, Detalhes, Checkout / Compra de Cotas e Lista de Participantes.
- **[`pages/beneficios.md`](./pages/beneficios.md)**: Parcerias Exclusivas, Vantagens por Categoria e Resgate de Benefícios.
- **[`pages/conexoes.md`](./pages/conexoes.md)**: Rede de Membros, Filtros de Networking (Seeking/Offering), Perfil Público do Associado, Minhas Conexões e Chat em Tempo Real.
- **[`pages/keypass.md`](./pages/keypass.md)**: Sistema KeyPass — Tiers Executivos, Progresso de XP, Tokens RIB, Missões Qualificadoras, Conquistas/Insígnias, Drops Semanais e Ranking Global.
- **[`pages/perfil.md`](./pages/perfil.md)**: Perfil do Membro Logado, Edição de Informações, Tags de Negócios, Segurança 2FA e Gestão de Assinatura.
- **[`pages/notificacoes.md`](./pages/notificacoes.md)**: Central de Notificações Global (Dropdown de avisos, convites de networking pendentes e mensagens não lidas).
- **[`pages/auth.md`](./pages/auth.md)**: Fluxos de Autenticação (Sign In, Sign Up, Recuperação e Redefinição de Senha).

---

## 🤖 Guia Rápido para a IA do Backend & Desenvolvedores

Para criar o backend a partir deste repositório:
1. **Consulte [`ENUMS.md`](./ENUMS.md)** para garantir que todos os campos de tipo e status usem os literais corretos em inglês.
2. **Leia [`DATABASE_MODELS.md`](./DATABASE_MODELS.md)** para criar as migrações/tabelas do banco de dados (Laravel Migrations, Prisma, Drizzle, SQL puro).
3. **Utilize [`SEED_DATA.md`](./SEED_DATA.md)** para popular as tabelas essenciais (`tiers`, `badges`, `missions`, `weeklyDrops`, `benefits`) com dados válidos no seeder (`DatabaseSeeder.php`).
4. **Leia [`GAMIFICATION_RULES.md`](./GAMIFICATION_RULES.md)** para implementar a lógica de concessão de XP, cálculo de tier ativo, subida de patamar e retenção de 180 dias.
5. **Leia [`API_SPECIFICATIONS.md`](./API_SPECIFICATIONS.md)** para implementar os controllers, services e rotas HTTP.
6. **Consulte [`pages/*.md`](./pages/)** para entender as regras de negócio específicas de cada tela quando tiver dúvidas sobre filtros, paginação ou fluxos de usuário.
7. **Consulte [`src/data/portalData.ts`](../src/data/portalData.ts)** no código-fonte para ver os tipos TypeScript exatos já utilizados pelo frontend.
8. **Gere a OpenAPI & Documentação com [Scalar](https://scalar.com/)**: Exponha o endpoint `GET /docs/api.json` ou `GET /openapi.json` e atribua `operationId` único em cada rota. O frontend utilizará **Orval** (`orval`) para gerar automaticamente todos os tipos TypeScript e hooks do **TanStack React Query** via **Axios**.
