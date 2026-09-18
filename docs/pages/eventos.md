# Especificação de Módulo: Eventos (`/eventos`)

O módulo de **Eventos** gerencia toda a programação presencial exclusiva do ClubKey, incluindo jantares executivos (*Private Dinners*), painéis estratégicos (*Keynotes*), encontros de c-levels (*Exclusive Roundtables*) e vivências de alta gastronomia.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/eventos` | Catálogo geral de eventos com filtros e busca | Client Component | Autenticado |
| `/eventos/[id]/[slug]` | Página de detalhes completos do evento | Server + Client | Autenticado |
| `/eventos/[id]/[slug]/quem-vai` | Lista de membros confirmados ("Quem Vai") | Server + Client | Autenticado |
| `/eventos/meus-eventos` | Agenda pessoal do associado com eventos confirmados | Client Component | Autenticado |
| `/eventos/meus-eventos/[id]/[slug]` | Voucher / Ingresso digital do associado com QR Code | Server + Client | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Catálogo de Eventos (`/eventos`)
- **Hero & Filtros**:
  - Título `"PROGRAMAÇÃO EXECUTIVA & EVENTOS"`.
  - Pílulas de filtro de categoria: `"Todos"`, `"Networking"`, `"Keynotes"`, `"Exclusivos"`, `"Gastronomia"`.
  - Barra de busca em tempo real com ícone de lupa.
- **Grid de Cards (`eventCard.tsx`)**:
  - Banner do evento (`image`), badge de categoria, badge de exclusividade de tier (se houver).
  - Título, data (`day` + `month`), horário (`time`), local (`location`).
  - Pilha de avatares dos primeiros associados confirmados (`participants`).
  - Vagas restantes (`spotsLeft` de `capacity`) e XP concedido (`xpReward`).
  - Botão interativo de confirmação rápida (RSVP) com estado alternante (*"Confirmar Presença"* $\leftrightarrow$ *"Presença Confirmada"*).

### 2. Detalhes do Evento (`/eventos/[id]/[slug]`)
- **`eventDetailClient.tsx`**:
  - `backButton.tsx`: Retorna para `/eventos`.
  - `shareButton.tsx`: Compartilha o link amigável via Web Share API ou cópia para área de transferência.
  - `addToCalendarButton.tsx`: Dropdown para adicionar o evento ao Google Calendar, Apple iCal e Outlook.
  - **Banner Principal & Badges**: Exibe categoria, recompensa de XP e RIB Tokens, formato e traje exigido (`dressCode`).
  - **Card do Host / Anfitrião**: Foto, nome, cargo, empresa e tier do membro anfitrião (`organizer`).
  - **Barra de Ocupação**: `Progress` com porcentagem de vagas preenchidas (`fillPercentage`) e contagem de vagas restantes.
  - **Destaques da Programação (`highlights`)**: Lista de blocos com título e descrição do cronograma/regras (ex: Regra Chatham House, Mesa Redonda).
  - **Itens Inclusos (`inclusions`)**: Lista de benefícios inclusos (ex: Welcome Drink, Jantar em 4 etapas, Vagas reservadas).
  - **Widget "Quem Vai"**: Miniatura dos participantes confirmados com link para a visualização expandida.
  - **Navegação Entre Eventos (`relatedEventsCard.tsx`)**: Cards para navegar rapidamente para o evento anterior e próximo da grade.

### 3. Tela "Quem Vai" (`/eventos/[id]/[slug]/quem-vai`)
- Cabeçalho com o nome do evento e contagem total de confirmados.
- Campo de busca para filtrar participantes por nome, cargo ou empresa.
- Grid de `memberCard.tsx` com foto, nome, cargo, empresa, tags de negócios e botão de conexão rápida (`toggleConnect`).

### 4. Meus Eventos & Voucher Digital (`/eventos/meus-eventos/[id]/[slug]`)
- **`memberEventDetailClient.tsx`**:
  - Card de Ingresso / Passe Digital com código de validação único (ex: `"CK-EVT-8821"`).
  - QR Code dinâmico para validação na recepção do evento.
  - Instruções de Check-in, horário de abertura das portas e traje.
  - Botão de ação perigosa *"Cancelar Presença no Evento"* com modal de confirmação (`confirmActionDialog.tsx`).

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface EventItem {
  id: number
  organizerId: number
  title: string
  category: "networking" | "keynote" | "exclusive" | "gastronomy"
  date: string
  day: string
  month: string
  time: string
  location: string
  image: string
  description: string
  fullDescription: string
  capacity: number
  initialConfirmed: number
  participants: number[] // IDs dos membros (users.id)
  dressCode?: string
  format?: string
  highlights?: Array<{ title: string; desc: string }>
  inclusions?: string[]
  xpReward: number
  ribTokensReward?: number
  isExclusive?: boolean
  minTierId?: string
}

export interface EventRSVPResponse {
  eventId: number
  isConfirmed: boolean
  currentCount: number
  spotsLeft: number
  xpEarned: number
  ribTokensEarned: number
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/events`
Lista os eventos com paginação e filtros.
- **Query Params**:
  - `category` (opcional): `"networking"` | `"keynote"` | `"exclusive"` | `"gastronomy"`
  - `search` (opcional): Termo de busca em título ou descrição.
  - `page` (default: `1`), `limit` (default: `12`)
- **Response (200 OK)**:
```json
{
  "items": [
    {
      "id": 1,
      "organizerId": 1,
      "title": "Private Dinner: Macroeconomia & Family Offices 2026",
      "category": "networking",
      "date": "24 Out 2026",
      "day": "24",
      "month": "OUT",
      "time": "19:30 - 22:30",
      "location": "Salão Nobre • ClubKey Faria Lima",
      "image": "/utils/banners/img_01.png",
      "description": "Encontro exclusivo entre fundadores e gestores de patrimônio...",
      "capacity": 24,
      "initialConfirmed": 20,
      "spotsLeft": 4,
      "participants": [1, 2, 3, 5],
      "xpReward": 250,
      "ribTokensReward": 1,
      "isExclusive": true,
      "minTierId": "titular",
      "isUserConfirmed": false
    }
  ],
  "total": 8,
  "page": 1,
  "totalPages": 1
}
```

### 2. `GET /api/v1/events/:id`
Retorna todos os detalhes de um evento específico.
- **Path Params**: `id` (número inteiro do evento).
- **Response (200 OK)**:
```json
{
  "id": 1,
  "organizerId": 1,
  "title": "Private Dinner: Macroeconomia & Family Offices 2026",
  "category": "networking",
  "date": "24 Out 2026",
  "day": "24",
  "month": "OUT",
  "time": "19:30 - 22:30",
  "location": "Salão Nobre • ClubKey Faria Lima",
  "image": "/utils/banners/img_01.png",
  "description": "Encontro exclusivo entre fundadores e gestores de patrimônio.",
  "fullDescription": "Uma noite reservada para debater alocação de ativos, cenários de liquidez para 2027 e co-investimentos estratégicos. Jantar harmonizado servido em quatro etapas pelo Chef convidado.",
  "capacity": 24,
  "initialConfirmed": 20,
  "spotsLeft": 4,
  "participants": [1, 2, 3, 5],
  "dressCode": "Passeio Completo / Traje Executivo",
  "format": "Jantar Exclusivo & Mesa Redonda",
  "highlights": [
    {
      "title": "Mesa Redonda Sem Palco",
      "desc": "Diálogo aberto e sem apresentações formais, onde cada membro compartilha um desafio estratégico real do trimestre."
    },
    {
      "title": "Regra Chatham House",
      "desc": "Total confidencialidade: os participantes são livres para usar as informações recebidas, mas a identidade dos relatores é estritamente protegida."
    }
  ],
  "inclusions": [
    "Menu degustação exclusivo em 4 tempos",
    "Harmonização de vinhos e bebidas premium",
    "Acesso à lista privada de contatos dos participantes",
    "Estacionamento com manobrista VIP no local"
  ],
  "xpReward": 250,
  "ribTokensReward": 1,
  "isExclusive": true,
  "minTierId": "titular",
  "isUserConfirmed": false,
  "organizer": {
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "role": "Founder & Managing Partner",
    "company": "Venture Capital Partners",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "tierId": "patrono"
  }
}
```

### 3. `GET /api/v1/events/:id/attendees`
Retorna a lista completa de associados confirmados para a tela *"Quem Vai"*.
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
    "seeking": ["AgroTech", "Deals Seed"],
    "offering": ["Investimentos", "Venture Capital"],
    "connectionStatus": "none"
  }
]
```

### 4. `GET /api/v1/events/my-events`
Retorna a lista de eventos nos quais o usuário autenticado confirmou presença.
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Private Dinner: Macroeconomia & Family Offices 2026",
    "date": "24 Out 2026",
    "time": "19:30",
    "location": "Salão Nobre • ClubKey Faria Lima",
    "image": "/utils/banners/img_01.png",
    "confirmationCode": "CK-EVT-8821",
    "confirmedAt": "2026-09-15T14:30:00Z"
  }
]
```

### 5. `POST /api/v1/events/:id/rsvp`
Confirma ou cancela a presença do usuário logado no evento.
- **Request Body**:
```json
{
  "action": "toggle"
}
```
- **Response (200 OK)**:
```json
{
  "eventId": 1,
  "isConfirmed": true,
  "currentCount": 21,
  "spotsLeft": 3,
  "xpEarned": 250,
  "ribTokensEarned": 1
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Confirmação de Presença (RSVP)**:
   - Ao clicar em *"Confirmar Presença"*, o botão exibe spinner de carregamento breve, altera para *"Presença Confirmada"* com check verde e dispara Toast de sucesso.
   - O contador de vagas restantes diminui em 1 e o saldo de XP do associado é acrescido no topo do portal.
2. **Cancelamento de Presença**:
   - Ao cancelar, o botão volta ao estado inicial, libera 1 vaga e dispara Toast de informação.
3. **Filtros e Busca no Catálogo**:
   - As pílulas de categoria filtram a grade instantaneamente sem recarregar a página.
   - A barra de pesquisa filtra por termos no título, local e descrição.
4. **Adicionar à Agenda (`AddToCalendarButton`)**:
   - Gera arquivo `.ics` para Apple/Outlook ou abre URL com parâmetros para o Google Calendar com horário de início e fim preenchidos.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Exclusividade por Tier**: Se o evento possuir `isExclusive: true` e o usuário tiver um `tierId` com nível de ordem menor que `minTierId`, o botão de RSVP é desabilitado com o texto *"Exclusivo para {minTier}"*.
2. **Capacidade Esgotada**: Se `spotsLeft === 0` e o usuário não estiver confirmado, o botão exibe *"Vagas Esgotadas"* (ou inscreve na lista de espera se habilitado).
3. **Cancelamento no Dia do Evento**: Caso o cancelamento ocorra a menos de 4 horas do evento, o sistema pode exibir alerta sobre política de pontuação do clube.

