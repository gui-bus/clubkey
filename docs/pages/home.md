# Especificação de Página: Home / Feed Executivo (`/`)

A página inicial do portal de membros atua como o **centro de comando inteligente e cockpit executivo do associado**. Ela sintetiza o status de membro, próximos compromissos, oportunidades de networking de alto impacto, experiências em destaque e progressão no KeyPass em um feed dinâmico e personalizado.

---

## 🗺️ Rotas & Metadados

- **URL da Rota**: `/`
- **Acesso**: Privado (requer autenticação JWT via cookie/header).
- **Título SEO / Head**: `ClubKey — Cockpit do Associado`
- **Layout**: `(portal)/layout.tsx` (com Header, Sidebar de navegação, widget flutuante de Mensagens e Toaster).

---

## 🖥️ Arquitetura Visual & Componentes

A tela é composta pelas seguintes seções verticais ordenadas:

1. **Cockpit Hero (`#cockpit-hero`)**:
   - Imagem de fundo imersiva com overlay em degradê neutro (`/utils/banners/img_02.png`).
   - Avatar do usuário com fallback de iniciais e moldura de destaque.
   - Badge envidraçada (`GlassBadge`) indicando o nível do plano (`memberSubscription.tierBadge` ou `"Membro VIP"`).
   - Título de boas-vindas: `"BEM-VINDO(A), {firstName}"`.
   - Subtítulo informativo: `"{role} na {company} • {city}"`.
2. **Grid de Indicadores Rápidos (4 Cards)**:
   - **Próximo Evento**: Exibe a data (`day` + `month`), título e total de eventos na agenda. Ao clicar, navega para `/eventos/meus-eventos`.
   - **Hospedagem Ativa**: Exibe o nome da suíte e data de check-in (ou status *"Nenhuma reserva ativa"*). Ao clicar, navega para `/hospedagens/minhas-hospedagens`.
   - **Rede do Clube**: Exibe o total de conexões ativas e pedidos pendentes de aprovação. Ao clicar, navega para `/conexoes/minhas-conexoes`.
   - **Assinatura & Acesso**: Exibe o plano do associado (`planName`), badge de status ativo (verde esmeralda). Ao clicar, navega para `/perfil/minha-assinatura`.
3. **Centrais do Associado (Navegação Rápida)**:
   - 5 cards com ícones Phosphor (`BuildingApartment`, `Calendar`, `Compass`, `Gift`, `Users`), micro-descrições e setas interativas para as rotas:
     - `/hospedagens`, `/eventos`, `/experiencias`, `/beneficios`, `/conexoes`.
4. **Seção: Próximo Encontro Confirmado**:
   - Renderiza o card estendido do evento mais próximo em que o membro deu RSVP.
   - Caso o membro não tenha nenhum evento confirmado, renderiza um **Empty State** com ícone de calendário e botão CTA *"Explorar Agenda de Eventos"*.
5. **Seção: Próximos Eventos em Destaque**:
   - Grid com 3 `EventCard` dos próximos eventos da plataforma, com tags de categoria, data, local, vagas restantes e botão interativo de RSVP.
   - Link de cabeçalho: *"Ver Agenda Completa"* $\rightarrow$ `/eventos`.
6. **Seção: Conexões Sugeridas (Match Estratégico)**:
   - Grid com 3 `MatchCard` de associados recomendados com base no cruzamento de tags (*O que Busco* vs *O que Ofereço*).
   - Exibe foto, cargo, empresa, tags coincidentes com badge verde, botão *"Conectar"* e link para o perfil.
   - Link de cabeçalho: *"Explorar Todos os Membros"* $\rightarrow$ `/conexoes`.
7. **Seção: Experiências & Lifestyle**:
   - Grid de cards de alta gastronomia e vivências exclusivas (`ExperienceCard`), exibindo fotos em alta resolução, chef/anfitrião, vagas, valor em BRL e opção de desconto com Tokens RIB.
   - Link de cabeçalho: *"Ver Todas as Experiências"* $\rightarrow$ `/experiencias`.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
// Perfil do Usuário Autenticado
export interface UserProfile {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  company: string
  city: string
  avatar: string
  coverImage?: string
  bio: string
  membershipTier: string
  tierId: "membro" | "associado" | "titular" | "investidor" | "incorporador" | "patrono"
  memberSince: string
  xp: number
  ribTokens: number
  seekingTags: string[]
  offeringTags: string[]
  linkedin?: string
  instagram?: string
  phone?: string
  twoFactorEnabled: boolean
}

// Resumo da Assinatura
export interface SubscriptionInfo {
  planName: string
  tierBadge: string
  status: "active" | "canceled" | "past_due"
  priceFormatted: string
  nextBillingDate: string
}

// Card de Evento do Feed
export interface EventSummary {
  id: number
  title: string
  category: "networking" | "keynote" | "exclusive" | "gastronomy"
  date: string
  day: string
  month: string
  time: string
  location: string
  image: string
  description: string
  capacity: number
  initialConfirmed: number
  spotsLeft: number
  xpReward: number
  ribTokensReward?: number
  isExclusive?: boolean
  minTierId?: string
  isUserConfirmed: boolean
}

// Card de Conexão Recomendada
export interface RecommendedMember {
  id: number
  firstName: string
  lastName: string
  role: string
  company: string
  city: string
  avatar: string
  tierId: string
  membershipTier: string
  seekingTags: string[]
  offeringTags: string[]
  matchingTags: string[]
  connectionStatus: "none" | "pending" | "received" | "connected"
}
```

---

## 📡 Especificação das Rotas de API Necessárias

### 1. `GET /api/v1/profile/me`
Retorna as informações do associado logado para compor o Cockpit Hero.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response (200 OK)**:
```json
{
  "id": 1,
  "firstName": "Rodrigo",
  "lastName": "Salles",
  "email": "rodrigo.salles@venture.com.br",
  "role": "Founder & Managing Partner",
  "company": "Venture Capital Partners",
  "city": "São Paulo, SP",
  "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  "tierId": "patrono",
  "membershipTier": "Patrono",
  "memberSince": "2024",
  "xp": 16850,
  "ribTokens": 18
}
```

### 2. `GET /api/v1/profile/subscription`
Retorna os dados da assinatura ativa para o card de acesso do cockpit.
- **Response (200 OK)**:
```json
{
  "planName": "Membro Fundador Anual",
  "tierBadge": "Patrono",
  "status": "active",
  "priceFormatted": "R$ 1.890 / mês",
  "nextBillingDate": "14 de Novembro de 2026"
}
```

### 3. `GET /api/v1/events?featured=true&limit=4`
Lista os eventos em destaque para o feed inicial.
- **Query Params**:
  - `featured`: `true`
  - `limit`: `4`
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Private Dinner: Macroeconomia & Family Offices 2026",
    "category": "networking",
    "date": "24 Out 2026",
    "day": "24",
    "month": "OUT",
    "time": "19:30 - 22:30",
    "location": "Salão Nobre • ClubKey Faria Lima",
    "image": "/utils/banners/img_01.png",
    "description": "Encontro exclusivo entre fundadores e gestores de patrimônio.",
    "capacity": 24,
    "initialConfirmed": 20,
    "spotsLeft": 4,
    "xpReward": 250,
    "ribTokensReward": 1,
    "isExclusive": true,
    "minTierId": "titular",
    "isUserConfirmed": false
  }
]
```

### 4. `GET /api/v1/events/my-events?upcoming=true&limit=1`
Retorna o próximo evento no qual o associado já confirmou presença para a seção *"Seus Compromissos"*.
- **Response (200 OK)**: Retorna o objeto `EventSummary` do próximo compromisso ou `null` caso não haja.

### 5. `GET /api/v1/stays/my-stays?status=confirmada&limit=1`
Retorna a próxima reserva de estadia confirmada para o card de cockpit *"Hospedagem Ativa"*.
- **Response (200 OK)**:
```json
{
  "id": "stay-res-001",
  "stayName": "Suíte Presidencial Faria Lima",
  "location": "ClubKey São Paulo • Torre Sul",
  "checkIn": "14 Nov 2026",
  "checkOut": "18 Nov 2026",
  "guests": 2,
  "status": "confirmada"
}
```

### 6. `GET /api/v1/members?recommended=true&limit=3`
Retorna associados recomendados por algoritmo de matchmaking com base nas tags de busca e oferta.
- **Response (200 OK)**:
```json
[
  {
    "id": 2,
    "firstName": "Fernanda",
    "lastName": "Camargo",
    "role": "Chief Investment Officer",
    "company": "Atlas Asset Management",
    "city": "São Paulo, SP",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    "tierId": "incorporador",
    "membershipTier": "Incorporador",
    "seekingTags": ["AgroTech", "Deals Seed", "Fintechs"],
    "offeringTags": ["Investimentos", "Venture Capital", "M&A"],
    "matchingTags": ["Investimentos", "Venture Capital"],
    "connectionStatus": "none"
  }
]
```

### 7. `GET /api/v1/experiences?featured=true&limit=3`
Lista as experiências gastronômicas e vivências de destaque.
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Masterclass de Vinhos Raros da Borgonha",
    "sub": "Degustação de 6 safras premiadas com o Sommelier Ricardo",
    "category": "wine",
    "date": "28 Outubro 2026",
    "time": "19:00",
    "location": "Cave Privée • ClubKey Jardins",
    "image": "/utils/banners/img_03.png",
    "price": 850.00,
    "ribTokensCost": 4,
    "capacity": 10,
    "spotsLeft": 2,
    "xpReward": 150
  }
]
```

### 8. `POST /api/v1/events/:id/rsvp`
Confirma ou remove a presença do usuário em um evento diretamente do card da Home.
- **Request Body**: `{ "action": "toggle" }` (ou `{ "confirmed": true }`)
- **Response (200 OK)**:
```json
{
  "eventId": 1,
  "isConfirmed": true,
  "spotsLeft": 3,
  "xpEarned": 250,
  "ribTokensEarned": 1
}
```
- **Feedback no Frontend**:
  - Se confirmou: Dispara Toast de sucesso `"Presença confirmada: {event.title}"` e atualiza o estado do card e o indicador de próximo evento.
  - Se cancelou: Dispara Toast informativo `"Presença cancelada: {event.title}"`.

### 9. `POST /api/v1/connections/:memberId/request`
Envia solicitação de conexão a partir do card de matchmaking da Home.
- **Request Body**: `{ "note": "Olá, vi sua sugestão no feed do ClubKey." }` (opcional)
- **Response (200 OK)**:
```json
{
  "memberId": 2,
  "status": "pending"
}
```
- **Feedback no Frontend**: Dispara Toast `"Solicitação de conexão enviada para {firstName}!"` e altera o botão para *"Pendente"*.

---

## ⚡ Interações & Comportamento do Usuário

1. **Cliques nos Cards de Indicadores Rápidos**: Redirecionamento instantâneo via Next.js `Link` para as páginas detalhadas.
2. **Toggle RSVP no Feed**: Atualização otimista do botão de confirmação, alteração do contador de vagas em tela e crédito imediato dos pontos no saldo de XP do topo.
3. **Conectar com Membro Sugerido**: O card muda instantaneamente para o estado `pending` com ícone de ampulheta/relógio.
4. **Resgate Rápido**: Acessível através dos atalhos rápidos de navegação.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Usuário sem Conexões**: Exibe contagem de 0 conexões ativas com o link *"Explorar Diretório"*.
2. **Usuário sem Eventos Marcados**: O bloco de próximo compromisso exibe um estado vazio ilustrado com botão para a página `/eventos`.
3. **Evento com Vagas Esgotadas (`spotsLeft === 0`)**: O botão de confirmação exibe *"Lista de Espera"* ou fica desabilitado com o rótulo *"Vagas Esgotadas"*.
4. **Evento com Exclusividade de Tier (`isExclusive: true`)**: Caso o `tierId` do usuário seja inferior a `minTierId`, o card exibe badge de cadeado e ao tentar o RSVP avisa que o evento é reservado para patamares superiores.

