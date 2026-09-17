# Especificação de Módulo: Conexões & Networking (`/conexoes`)

O módulo de **Conexões & Networking** é o ecossistema relacional e profissional do ClubKey. Ele viabiliza o matchmaking inteligente entre associados por meio de cruzamento de interesses de negócios (*O que Busco* e *O que Ofereço*), perfis públicos executivos e mensageria direta em tempo real.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/conexoes` | Diretório geral de membros com busca e filtros de tags | Client Component | Autenticado |
| `/conexoes/[id]/[slug]` | Perfil público aprofundado do associado | Server + Client | Autenticado |
| `/conexoes/minhas-conexoes` | Gestão de conexões ativas, convites recebidos e enviados | Client Component | Autenticado |
| *(Global)* `MemberMessengerWidget` | Chat flutuante de mensagens diretas no canto inferior direito | Client Component | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Diretório de Membros (`/conexoes`)
- **Barra de Busca e Filtros de Matchmaking**:
  - Busca por nome, cargo ou empresa.
  - Filtros cruzados por tags:
    - *O que Busco* (`seeking`): ex: `"Investimentos"`, `"AgroTech"`, `"M&A"`, `"Board Member"`.
    - *O que Ofereço* (`offering`): ex: `"Venture Capital"`, `"Mentoria"`, `"Governança"`, `"Expansão Global"`.
    - Filtro por Cidade e Nível de Tier.
- **Grid de Associados (`MemberCard`)**:
  - Foto de perfil (`avatar`) com fallback de iniciais estilizado (`getInitials`).
  - Nome completo, cargo executivo, empresa e cidade.
  - Badge de Tier Executivo (`membershipTier` / `tierId`).
  - Badges de tags de busca e oferta.
  - Botão de Ação de Conexão com 4 estados reativos:
    - `none`: *"Conectar"* (ícone `UserPlus`)
    - `pending`: *"Pendente"* (ícone `Hourglass`)
    - `received`: *"Aceitar Convite"* (ícone `CheckCircle`)
    - `connected`: *"Conectado"* (ícone `Check`)

### 2. Perfil Público do Associado (`/conexoes/[id]/[slug]`)
- **`MemberProfileDetailClient`**:
  - `BackButton`: Retorna à listagem anterior.
  - `ShareButton`: Link compartilhável do perfil.
  - **Banner de Capa & Foto de Perfil**: Imagem panorâmica de fundo (`coverImage`), avatar em alta resolução com moldura e badge de tier.
  - **Informações Executivas**: Nome, cargo, empresa, cidade, ano de adesão (`memberSince`) e biografia executiva (`bio`).
  - **Canais de Contato Verificados**: Ícones e links diretos para LinkedIn, Instagram e WhatsApp/Telefone.
  - **Foco de Negócios**: Bloco com badges divididas entre *O que Busco* e *O que Ofereço*.
  - **Insígnias Desbloqueadas (`DEFAULT_BADGES`)**: Grid completo com todas as conquistas do clube. Conquistas bloqueadas exibem cadeado e opacidade reduzida; conquistas ativas exibem ícone Phosphor colorido, nome, e abrem tooltip/modal explicativo com data de conquista e XP concedido.
  - **Histórico em Eventos do Clube**: Lista de `EventCard` dos eventos em que o associado participou ou confirmou presença.
  - **Envio de Mensagem Rápida**: Caixa de texto integrada para envio de DM imediata sem sair do perfil.
  - **Navegação Entre Perfis (`RelatedMembersCard`)**: Permite transitar para o associado anterior ou seguinte da rede.

### 3. Minhas Conexões (`/conexoes/minhas-conexoes`)
- **Abas de Controle**:
  - **Conexões Ativas**: Lista de amigos/pares conectados com atalho para abrir o chat flutuante e botão para remover conexão.
  - **Solicitações Recebidas**: Painel de convites pendentes com botões *"Aceitar"* e *"Recusar"*.
  - **Convites Enviados**: Lista de solicitações aguardando resposta com botão *"Cancelar Convite"*.

### 4. Mensageiro Flutuante (`MemberMessengerWidget`)
- Widget fixo no canto inferior direito do portal.
- Exibe lista de conversas recentes com contatos conectados, status online e contador de mensagens não lidas.
- Janela de bate-papo expansível/minimizável com rolagem automática, envio de mensagens via Enter e confirmação de leitura (`isRead`).

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface Member {
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
  seekingTags: string[]
  offeringTags: string[]
  unlockedBadgeIds?: string[]
  linkedin?: string
  instagram?: string
  phone?: string
  connectionStatus?: "none" | "pending" | "received" | "connected"
}

export interface ChatMessage {
  id: string | number
  senderId: number
  receiverId: number
  text: string
  isRead: boolean
  createdAt: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/members`
Lista membros da rede com suporte a filtros avançados de busca e tags.
- **Query Params**:
  - `search` (opcional): Busca por nome, cargo ou empresa.
  - `seeking` (opcional): Tag de busca específica.
  - `offering` (opcional): Tag de oferta específica.
  - `tierId` (opcional): Filtrar por tier.
  - `city` (opcional): Filtrar por cidade.
  - `page` (default: 1), `limit` (default: 20)
- **Response (200 OK)**:
```json
{
  "items": [
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
      "memberSince": "2023",
      "seekingTags": ["AgroTech", "Deals Seed"],
      "offeringTags": ["Investimentos", "Venture Capital"],
      "connectionStatus": "none"
    }
  ],
  "total": 16,
  "page": 1,
  "totalPages": 1
}
```

### 2. `GET /api/v1/members/:id`
Retorna todos os detalhes do perfil público do associado.
- **Response (200 OK)**:
```json
{
  "id": 2,
  "firstName": "Fernanda",
  "lastName": "Camargo",
  "email": "fernanda.camargo@atlas.com.br",
  "role": "Chief Investment Officer",
  "company": "Atlas Asset Management",
  "city": "São Paulo, SP",
  "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  "coverImage": "/utils/banners/img_02.png",
  "bio": "Mais de 15 anos liderando alocação de capital em private equity e venture capital no Brasil e exterior.",
  "membershipTier": "Incorporador",
  "tierId": "incorporador",
  "memberSince": "2023",
  "seekingTags": ["AgroTech", "Deals Seed", "Fintechs"],
  "offeringTags": ["Investimentos", "Venture Capital", "M&A"],
  "unlockedBadgeIds": ["badge_early_adopter", "badge_blindagem_digital", "badge_wine_connoisseur"],
  "linkedin": "https://linkedin.com/in/fernandacamargo",
  "instagram": "@fernandacamargo.vc",
  "phone": "+55 11 98888-7777",
  "connectionStatus": "connected"
}
```

### 3. `GET /api/v1/connections/my-connections`
Retorna as conexões ativas e solicitações recebidas/enviadas do associado logado.
- **Response (200 OK)**:
```json
{
  "connected": [
    { "id": 2, "firstName": "Fernanda", "lastName": "Camargo", "role": "CIO", "company": "Atlas Asset", "avatar": "https://..." }
  ],
  "receivedInvites": [
    { "id": 4, "firstName": "Carlos", "lastName": "Eduardo", "role": "Managing Partner", "company": "XPTO", "avatar": "https://...", "sentAt": "2026-09-16T10:00:00Z" }
  ],
  "sentInvites": [
    { "id": 5, "firstName": "Beatriz", "lastName": "Menezes", "role": "Founder", "company": "BioTech", "avatar": "https://...", "sentAt": "2026-09-17T08:30:00Z" }
  ]
}
```

### 4. `POST /api/v1/connections/:memberId/request`
Envia solicitação de conexão para outro membro.
- **Request Body**: `{ "note": "Gostaria de conectar para trocar experiências sobre M&A." }`
- **Response (200 OK)**: `{ "status": "pending", "memberId": 2 }`

### 5. `PATCH /api/v1/connections/:memberId/accept`
Aceita uma solicitação de conexão recebida.
- **Response (200 OK)**: `{ "status": "connected", "memberId": 4 }`

### 6. `DELETE /api/v1/connections/:memberId`
Recusa solicitação, cancela convite enviado ou desfaz conexão existente.
- **Response (200 OK)**: `{ "status": "none", "memberId": 2 }`

### 7. `GET /api/v1/chat/conversations`
Lista todas as conversas recentes para o widget flutuante.
- **Response (200 OK)**:
```json
[
  {
    "member": {
      "id": 2,
      "firstName": "Fernanda",
      "lastName": "Camargo",
      "avatar": "https://...",
      "role": "CIO",
      "company": "Atlas Asset"
    },
    "lastMessage": {
      "text": "Perfeito, combinamos o almoço na próxima semana!",
      "createdAt": "2026-09-17T14:15:00Z",
      "isRead": true,
      "senderId": 2
    },
    "unreadCount": 0
  }
]
```

### 8. `GET /api/v1/chat/:memberId/messages`
Retorna o histórico de mensagens trocadas com o membro.
- **Response (200 OK)**:
```json
[
  {
    "id": 101,
    "senderId": 1,
    "receiverId": 2,
    "text": "Olá Fernanda, tudo bem? Gostaria de conversar sobre a tese de AgroTech.",
    "isRead": true,
    "createdAt": "2026-09-17T14:00:00Z"
  },
  {
    "id": 102,
    "senderId": 2,
    "receiverId": 1,
    "text": "Olá Rodrigo! Claro, vamos agendar uma call.",
    "isRead": true,
    "createdAt": "2026-09-17T14:10:00Z"
  }
]
```

### 9. `POST /api/v1/chat/messages`
Envia uma nova mensagem privada.
- **Request Body**:
```json
{
  "receiverId": 2,
  "text": "Combinado, vou enviar o convite na sua agenda!"
}
```
- **Response (201 Created)**:
```json
{
  "id": 103,
  "senderId": 1,
  "receiverId": 2,
  "text": "Combinado, vou enviar o convite na sua agenda!",
  "isRead": false,
  "createdAt": "2026-09-17T14:20:00Z"
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Matchmaking em Tempo Real**: Clicar em uma tag de busca no cabeçalho filtra instantaneamente os membros que oferecem aquela competência.
2. **Ciclo de Conexão Reativo**:
   - `none` $\rightarrow$ Clicar em *"Conectar"* envia requisição, muda botão para *"Pendente"* e exibe Toast de sucesso.
   - `received` $\rightarrow$ Clicar em *"Aceitar"* ativa o status de *"Conectado"*, credita XP de conexão e abre a possibilidade de troca de mensagens.
3. **Chat Flutuante**: O widget pode ser aberto a partir de qualquer botão *"Enviar Mensagem"* no portal.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Auto-Conexão**: O usuário autenticado nunca aparece listado para si mesmo no diretório de membros com botão de conectar.
2. **Privacidade de Contatos**: Telefones e redes sociais só são exibidos integralmente se a conexão estiver no estado `connected` (ou configurado como público no perfil).
3. **XP de Networking**: Cada conexão aceita credita +50 XP para ambos os associados participantes.

