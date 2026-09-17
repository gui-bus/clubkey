# Especificação de Módulo: KeyPass — Tiers, Missões, Conquistas & Ranking (`/keypass`)

O **KeyPass** é o ecossistema de progressão executiva, reconhecimento de engajamento e bonificação do ClubKey. Ele incentiva a participação ativa em eventos, estadias, expansão da rede de relacionamentos e negócios entre associados.

> ⚠️ **Diretriz de Terminologia**: O termo técnico *"Gamificação"* **NUNCA** é exibido para o usuário final. Na interface, utilizamos termos executivos: **"KeyPass"**, **"Tiers & Recompensas"**, **"Passe Executivo"**, **"Conquistas"**, **"Missões Qualificadoras"** e **"Drops Semanais"**.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/keypass` | Painel Central do KeyPass (Tier, Progresso, Marcos, Drops e Extrato) | Client Component | Autenticado |
| `/keypass/missoes` | Central de Missões Qualificadoras por categoria com resgate | Client Component | Autenticado |
| `/keypass/ranking` | Tabela de Classificação Global e Sazonal com metas comparativas | Client Component | Autenticado |
| `/keypass/regras` | Manual oficial de pontuação, critérios de ascensão e diretrizes | Client Component | Autenticado |

---

## 🎖️ Estrutura Oficial de Tiers Executivos

| Nível | Tier | XP Mínimo | XP Máximo | Benefícios Principais |
| :--- | :--- | :--- | :--- | :--- |
| **I** | **Membro** | 0 XP | 499 XP | Tier de entrada vitalício. Acesso básico ao catálogo e eventos abertos |
| **II** | **Associado** | 500 XP | 1.999 XP | Tier vitalício e verificado. Até 20% OFF em estadias e conexões diretas |
| **III** | **Titular** | 2.000 XP | 4.999 XP | Até 25% OFF em estadias, jantares fechados e concierge standard |
| **IV** | **Investidor** | 5.000 XP | 9.999 XP | Até 30% OFF em estadias, deal flow, concierge VIP 24/7 e experiências internacionais |
| **V** | **Incorporador**| 10.000 XP | 15.999 XP | Até 35% OFF em estadias, canal direto com fundadores e mesa cativa |
| **VI** | **Patrono** | 16.000+ XP | $\infty$ | Título supremo (#1 no Ranking Geral Global), insígnia dourada e cotas VIP irrestritas |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Painel Geral do KeyPass (`/keypass`)
- **Card do Tier Atual & Progressão**:
  - Emblema 3D do Tier (`/utils/gamification/tiers/0X_tier.webp`), nome do tier, nível e cor representativa.
  - Barra de progresso de XP indicando pontuação atual versus meta para o próximo nível.
  - **Marcos Intermediários (Milestones)**: Pílulas clicáveis que desbloqueiam bônus intermediários em XP e Tokens RIB ao atingir 25%, 50% e 75% da faixa do tier.
- **Card de Drop Semanal (`WeeklyDropCard`)**:
  - Contagem regressiva do ciclo de liberação (7 dias).
  - Objetivo semanal (ex: *"Confirmar presença em 1 evento"* ou *"Conectar com 2 associados"*).
  - Recompensa em XP e Tokens RIB com botão de resgate imediato.
- **Extrato de Atividades Recentes (`XpHistoryCard`)**:
  - Histórico cronológico de movimentações de XP com data, categoria (evento, conexão, estadia, bônus), pontuação creditada e tokens ganhos.

### 2. Central de Missões Qualificadoras (`/keypass/missoes`)
- **Filtros de Categoria**:
  - Pílulas: `"Todas"`, `"Networking"`, `"Eventos"`, `"Hospedagens"`, `"Perfil"`, `"Ranking"`.
- **Cards de Missão (`MissionCard`)**:
  - Ícone temático, título e regras claras de cumprimento.
  - Barra de progresso visual (`currentProgress` / `totalRequired`).
  - Badge com recompensa de XP e Tokens RIB.
  - Botão de Ação:
    - Se não cumprida: Botão de atalho para a rota da ação (ex: *"Explorar Membros"* $\rightarrow$ `/conexoes`).
    - Se concluída e não resgatada: Botão *"Resgatar Recompensa"* destacado.
    - Se resgatada: Badge *"Concluída & Resgatada"*.

### 3. Tabela de Classificação & Ranking (`/keypass/ranking`)
- **Filtros de Período (`timeframe`)**:
  - Pílulas: *"Geral / All-time"*, *"Mês Atual"*, *"Temporada Trimestral Q4"*.
- **Card do Líder #1 (Patrono do Clube)**:
  - Destaque com foto, coroa dourada, pontuação acumulada e empresa.
- **Card Comparativo de Alvo (`LeaderboardTargetCard`)**:
  - Apresenta o associado posicionado imediatamente acima do usuário logado e a quantidade de XP necessária para ultrapassá-lo.
- **Tabela de Classificação (`LeaderboardTable`)**:
  - Colunas: Posição (`rank`), Membro (`avatar` + `firstName` `lastName`), Cargo/Empresa, Cidade, Tier Badge, Total de XP, Saldo de Tokens RIB e Variação (`change`: $+2$, $0$, $-1$).
  - Linha do usuário autenticado recebe destaque visual com background contrastante e badge *"Você"*.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface KeyPassMeResponse {
  xp: number
  ribTokens: number
  currentTier: {
    id: "membro" | "associado" | "titular" | "investidor" | "incorporador" | "patrono"
    name: string
    badge: string
    minXp: number
    maxXp: number | null
    level: number
    image: string
  }
  nextTier: {
    id: string
    name: string
    minXp: number
  } | null
  claimedMilestones: Record<string, boolean>
}

export interface MissionItem {
  id: string
  title: string
  description: string
  category: "events" | "networking" | "stays" | "profile" | "ranking"
  xpReward: number
  tokensReward: number
  currentProgress: number
  totalRequired: number
  isCompleted: boolean
  isClaimed: boolean
  actionUrl: string
  actionLabel: string
}

export interface TierDefinition {
  id: "membro" | "associado" | "titular" | "investidor" | "incorporador" | "patrono"
  order: number
  name: string
  subtitle: string
  minXp: number
  maxXp: number | null
  image: string
  color: string
  badgeColor: string
  description: string
  perks: string[]
  isProtectedBase?: boolean
  isSpecialPinnacle?: boolean
}

export interface WeeklyDropItem {
  id: string
  title: string
  description: string
  category: string
  xpReward: number
  tokensReward: number
  currentProgress: number
  totalRequired: number
  isCompleted: boolean
  isClaimed: boolean
  expiresAt: string
}

export interface LeaderboardEntry {
  rank: number
  id: number
  firstName: string
  lastName: string
  role: string
  company: string
  city: string
  avatar: string
  tierId: string
  membershipTier: string
  xp: number
  ribTokens: number
  change: number
  isCurrentUser: boolean
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/keypass/me`
Retorna o estado de pontuação, tier atual e progresso do associado.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response (200 OK)**:
```json
{
  "xp": 14200,
  "ribTokens": 24,
  "currentTier": {
    "id": "incorporador",
    "name": "Incorporador",
    "badge": "Tier V",
    "minXp": 10000,
    "maxXp": 15999,
    "level": 5,
    "image": "/utils/gamification/tiers/05_incorporador.webp"
  },
  "nextTier": {
    "id": "patrono",
    "name": "Patrono",
    "minXp": 16000
  },
  "claimedMilestones": {
    "incorporador_0": true,
    "incorporador_1": false
  }
}
```

### 2. `GET /api/v1/keypass/missions`
Lista todas as missões qualificadoras e o progresso do usuário.
- **Response (200 OK)**:
```json
[
  {
    "id": "mission-networking-3",
    "title": "Networking de Alto Impacto",
    "description": "Conecte-se com 3 novos associados do clube.",
    "category": "networking",
    "xpReward": 250,
    "tokensReward": 1,
    "currentProgress": 2,
    "totalRequired": 3,
    "isCompleted": false,
    "isClaimed": false,
    "actionUrl": "/conexoes",
    "actionLabel": "Explorar Membros"
  },
  {
    "id": "two_factor_auth",
    "title": "Blindagem Digital",
    "description": "Ative a autenticação em 2 fatores no seu perfil.",
    "category": "profile",
    "xpReward": 100,
    "tokensReward": 1,
    "currentProgress": 1,
    "totalRequired": 1,
    "isCompleted": true,
    "isClaimed": false,
    "actionUrl": "/perfil",
    "actionLabel": "Ir para Segurança"
  }
]
```

### 3. `POST /api/v1/keypass/missions/:id/claim`
Resgata a recompensa de uma missão cumprida.
- **Response (200 OK)**:
```json
{
  "missionId": "two_factor_auth",
  "xpAdded": 100,
  "ribTokensAdded": 1,
  "newTotalXp": 14300,
  "newTotalTokens": 25
}
```

### 4. `GET /api/v1/keypass/ranking`
Retorna a classificação dos associados no período selecionado.
- **Query Params**: `timeframe` (`"all_time"` | `"monthly"` | `"quarterly"`)
- **Response (200 OK)**:
```json
[
  {
    "rank": 1,
    "id": 3,
    "firstName": "Eduardo",
    "lastName": "Prado",
    "role": "Fundador",
    "company": "Prado Agro Global",
    "city": "Ribeirão Preto, SP",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "tierId": "patrono",
    "membershipTier": "Patrono",
    "xp": 16850,
    "ribTokens": 18,
    "change": 0,
    "isCurrentUser": false
  },
  {
    "rank": 2,
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "role": "Founder & Managing Partner",
    "company": "Venture Capital",
    "city": "São Paulo, SP",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "tierId": "incorporador",
    "membershipTier": "Incorporador",
    "xp": 14200,
    "ribTokens": 24,
    "change": 1,
    "isCurrentUser": true
  }
]
```

### 5. `GET /api/v1/keypass/weekly-drops`
Retorna a oportunidade especial da semana.
- **Response (200 OK)**:
```json
{
  "id": "drop-w42-networking",
  "title": "Drop Semanal: Conexão Cruzada",
  "description": "Envie uma mensagem e conecte-se com um membro do setor imobiliário.",
  "category": "networking",
  "xpReward": 300,
  "tokensReward": 2,
  "currentProgress": 1,
  "totalRequired": 1,
  "isCompleted": true,
  "isClaimed": false,
  "expiresAt": "2026-09-24T23:59:59Z"
}
```

### 6. `POST /api/v1/keypass/weekly-drops/:id/claim`
Resgata o drop semanal cumprido.
- **Response (200 OK)**:
```json
{
  "dropId": "drop-w42-networking",
  "xpAdded": 300,
  "ribTokensAdded": 2,
  "newTotalXp": 14500,
  "newTotalTokens": 26
}
```

### 7. `POST /api/v1/keypass/milestones/:tierId/:milestoneIndex/claim`
Resgata recompensa de marco intermediário do tier atual.
- **Response (200 OK)**:
```json
{
  "tierId": "incorporador",
  "milestoneIndex": 1,
  "xpAdded": 200,
  "ribTokensAdded": 1,
  "claimedMilestones": {
    "incorporador_0": true,
    "incorporador_1": true
  }
}
```

### 8. `GET /api/v1/keypass/tiers`
Retorna a lista oficial completa dos 6 Tiers Executivos do ClubKey, utilizada na página do *"Guia Completo dos 6 Tiers"* (`/keypass/regras`).
- **Response (200 OK)**:
```json
[
  {
    "id": "membro",
    "order": 1,
    "name": "Membro",
    "subtitle": "Boas-vindas ao ecossistema",
    "minXp": 0,
    "maxXp": 499,
    "image": "/utils/gamification/tiers/01_membro.webp",
    "color": "#8E8E93",
    "badgeColor": "default",
    "isProtectedBase": true,
    "description": "Tier de entrada vitalício e protegido. Complete seu cadastro e ative o 2FA para subir para Associado.",
    "perks": [
      "Acesso ao catálogo de hospedagens parceiras",
      "Visualização de eventos abertos",
      "Diretório básico de membros"
    ]
  },
  {
    "id": "associado",
    "order": 2,
    "name": "Associado",
    "subtitle": "Membro verificado e protegido",
    "minXp": 500,
    "maxXp": 1999,
    "image": "/utils/gamification/tiers/02_associado.webp",
    "color": "#3B82F6",
    "badgeColor": "primary",
    "isProtectedBase": true,
    "description": "Base segura de membro ativo. Tier vitalício e protegido: não há rebaixamento a partir deste patamar.",
    "perks": [
      "Tarifas exclusivas com até 20% OFF em estadias",
      "Confirmação de presença em eventos regulares",
      "Conexões diretas com outros membros",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "titular",
    "order": 3,
    "name": "Titular",
    "subtitle": "Engajamento recorrente e influência",
    "minXp": 2000,
    "maxXp": 4999,
    "image": "/utils/gamification/tiers/03_titular.webp",
    "color": "#10B981",
    "badgeColor": "success",
    "description": "Tier intermediário para membros ativos em eventos, viagens e conexões estratégicas.",
    "perks": [
      "Tarifas exclusivas com até 25% OFF em estadias",
      "Prioridade na lista de espera de experiências",
      "Acesso a jantares fechados e rodadas setoriais",
      "Concierge standard para reservas prioritárias",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "investidor",
    "order": 4,
    "name": "Investidor",
    "subtitle": "Alta circulação e liderança",
    "minXp": 5000,
    "maxXp": 9999,
    "image": "/utils/gamification/tiers/04_investidor.webp",
    "color": "#F59E0B",
    "badgeColor": "warning",
    "description": "Destaque sênior na comunidade com acesso prioritário a deal flow e comitês de investimento.",
    "perks": [
      "Tarifas exclusivas com até 30% OFF em estadias",
      "Acesso a reuniões de deal flow e co-investimento",
      "Concierge VIP dedicado 24/7",
      "Convites para experiências internacionais",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "incorporador",
    "order": 5,
    "name": "Incorporador",
    "subtitle": "Patamar máximo por pontuação",
    "minXp": 10000,
    "maxXp": 15999,
    "image": "/utils/gamification/tiers/05_incorporador.webp",
    "color": "#EC4899",
    "badgeColor": "accent",
    "description": "O mais alto tier regular da plataforma por pontuação contínua e contribuição estratégica.",
    "perks": [
      "Tarifas com desconto máximo de até 35% OFF",
      "Acesso total a todas as experiências e regatas",
      "Canal direto com fundadores do ClubKey",
      "Mesa cativa nos encontros institucionais anuais",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "patrono",
    "order": 6,
    "name": "Patrono",
    "subtitle": "Posição #1 no Ranking Geral Global (> 16.000 XP)",
    "minXp": 16000,
    "maxXp": null,
    "image": "/utils/gamification/tiers/06_patrono.webp",
    "color": "#E85535",
    "badgeColor": "danger",
    "isSpecialPinnacle": true,
    "description": "Título supremo e singular concedido exclusivamente ao membro com a maior pontuação de XP global (acima de 16.000 XP).",
    "perks": [
      "Insígnia dourada suprema em todo o ecossistema",
      "Destaque comemorativo fixo no hall do Patrono",
      "Cota especial de 5 Tokens RIB bônus por trimestre",
      "Acesso irrestrito a todas as cotas e propriedades VIP"
    ]
  }
]
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Resgate com Feedback Imediato**: Clicar em *"Resgatar"* em qualquer missão ou drop dispara confete visual (se ativo) e Toast sonner: `"Recompensa resgatada! +250 XP e +1 Token RIB creditados"`.
2. **Atualização Otimista dos Indicadores de Topo**: O saldo de XP e de Tokens na barra de navegação superior é atualizado no mesmo instante.
3. **Alternância de Abas de Classificação**: Alternar entre *Geral*, *Mês* e *Trimestre* faz a requisição com o `timeframe` correspondente e recalcula posições.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Proteção de Base de Tiers (Base Protection)**: Membros no patamar *Associado* e *Membro* possuem base vitalícia protegida contra rebaixamento.
2. **Critério Singular do Patrono**: O título *Patrono* é singular e concedido ao associado com mais de 16.000 XP que ocupar a 1ª posição no ranking global.
3. **Prevenção de Duplo Resgate**: O backend valida se a missão já possui `isClaimed === true` antes de processar qualquer bonificação.

