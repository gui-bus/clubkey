# Especificação Completa da API (API Specifications)

Este documento descreve todas as rotas RESTful necessárias para que o backend forneça os dados e processamento exigidos pelo frontend do **ClubKey**.

---

## 🔒 Padrões Globais da API

- **Base URL**: `https://api.clubkey.com.br/api/v1` (ou `http://localhost:4000/api/v1` em ambiente local).
- **Autenticação**: Header padrão `Authorization: Bearer <jwt_token>`.
- **Formato de Dados**: `application/json` (UTF-8).
- **Respostas de Sucesso**: HTTP 200 OK, 201 Created ou 204 No Content.
- **Estrutura de Erro Padrão**:
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Mensagem detalhada do erro.",
  "timestamp": "2026-09-17T17:00:00.000Z"
}
```

---

## 1. 🔑 Autenticação & Conta (`/auth`)

### `POST /auth/sign-in`
Autentica o associado com e-mail e senha.
- **Request Body**:
```json
{
  "email": "associado@empresa.com.br",
  "password": "MinhaSenhaForte123!"
}
```
- **Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "refreshToken": "d8f7e6a5-...",
  "user": {
    "id": 1,
    "email": "associado@empresa.com.br",
    "name": "Rodrigo Salles",
    "role": "Founder & CEO",
    "company": "Venture Capital",
    "avatar": "https://images.unsplash.com/...",
    "activeClubId": "club-sp"
  }
}
```

### `POST /auth/sign-up`
Cria uma nova conta / solicitação de adesão ao clube.
- **Request Body**:
```json
{
  "fullName": "Rodrigo Salles",
  "email": "associado@empresa.com.br",
  "phone": "+5511999999999",
  "company": "Venture Capital",
  "role": "Founder & CEO",
  "city": "São Paulo",
  "state": "SP",
  "password": "MinhaSenhaForte123!",
  "referralCode": "CONVITE-VIP"
}
```
- **Response (201 Created)**: Retorna o token e o perfil criado.

### `POST /auth/forgot-password`
Solicita envio de link de recuperação de senha por e-mail.
- **Request Body**: `{ "email": "associado@empresa.com.br" }`
- **Response (200 OK)**: `{ "success": true, "message": "E-mail de recuperação enviado com sucesso." }`

### `POST /auth/reset-password`
Redefine a senha através do token recebido por e-mail.
- **Request Body**:
```json
{
  "token": "reset-token-xyz",
  "newPassword": "NovaSenhaSegura456!"
}
```
- **Response (200 OK)**: `{ "success": true, "message": "Senha redefinida com sucesso." }`

---

## 2. 🏛️ Sedes & Clubes (`/clubs`)

### `GET /clubs`
Lista todos os clubes ativos da rede ClubKey.
- **Response (200 OK)**:
```json
[
  {
    "id": "club-sp",
    "name": "ClubKey São Paulo",
    "city": "São Paulo",
    "state": "SP",
    "address": "Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP",
    "coverImage": "/utils/banners/img_01.png"
  }
]
```

### `PATCH /clubs/active`
Atualiza o clube ativo selecionado na sessão do associado.
- **Request Body**: `{ "clubId": "club-rio" }`
- **Response (200 OK)**: `{ "activeClubId": "club-rio" }`

---

## 3. 👥 Membros & Networking (`/members`, `/connections`)

### `GET /members`
Lista membros da rede com paginação e filtros.
- **Query Params**:
  - `clubId` (opcional): Filtrar por sede (ex: `"club-sp"`).
  - `search` (opcional): Busca por nome, cargo ou empresa.
  - `seeking` (opcional): Tag de busca (ex: `"Investimentos"`).
  - `offering` (opcional): Tag de oferta (ex: `"Mentoria"`).
  - `page` (default: 1), `limit` (default: 20).
- **Response (200 OK)**:
```json
{
  "items": [
    {
      "id": 1,
      "name": "Rodrigo Salles",
      "role": "Founder & CEO",
      "company": "Venture Capital",
      "city": "São Paulo",
      "avatar": "https://...",
      "coverImage": "https://...",
      "tierId": "patrono",
      "membershipTier": "founding_member",
      "memberSince": "2024",
      "seeking": ["Investimentos", "M&A", "Board Member"],
      "offering": ["Venture Capital", "Mentoria", "Governança"],
      "bio": "Investidor anjo e empreendedor serial...",
      "connectionStatus": "connected"
    }
  ],
  "total": 128,
  "page": 1,
  "totalPages": 7
}
```

### `GET /members/:id`
Retorna detalhes completos do perfil público de um associado.

### `GET /connections/my-connections`
Retorna os associados conectados ao membro autenticado e solicitações pendentes.
- **Response (200 OK)**:
```json
{
  "connected": [...],
  "receivedInvites": [...],
  "sentInvites": [...]
}
```

### `POST /connections/:memberId/request`
Envia solicitação de conexão para outro membro.
- **Response (200 OK)**: `{ "status": "pending", "memberId": 2 }`

### `PATCH /connections/:memberId/accept`
Aceita solicitação de conexão recebida.
- **Response (200 OK)**: `{ "status": "connected", "memberId": 2 }`

### `DELETE /connections/:memberId`
Recusa solicitação, cancela convite enviado ou desfaz conexão existente.

---

## 4. 📅 Eventos (`/events`)

### `GET /events`
Lista eventos do clube ativo com suporte a filtros de categoria e busca.
- **Query Params**: `clubId`, `category`, `search`, `page`, `limit`.
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Private Dinner: Macroeconomia & Family Offices 2026",
    "category": "networking",
    "date": "24 Out 2026",
    "time": "19:30 - 22:30",
    "location": "Salão Nobre • ClubKey Faria Lima",
    "image": "/utils/banners/img_01.png",
    "description": "Encontro exclusivo entre fundadores e gestores de patrimônio...",
    "fullDescription": "Uma noite reservada para debater alocação de ativos...",
    "capacity": 24,
    "spotsLeft": 4,
    "xpReward": 250,
    "ribTokensReward": 1,
    "isExclusive": true,
    "minTier": "chanceler",
    "isUserConfirmed": true
  }
]
```

### `GET /events/:id`
Retorna os detalhes completos do evento.

### `GET /events/:id/attendees`
Retorna a lista de associados confirmados para a tela *"Quem Vai"*.
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "Rodrigo Salles",
    "role": "Founder & CEO",
    "company": "Venture Capital",
    "avatar": "https://...",
    "tierId": "patrono"
  }
]
```

### `GET /events/my-events`
Retorna a lista de eventos nos quais o usuário autenticado confirmou presença.

### `POST /events/:id/rsvp`
Alterna a confirmação de presença (RSVP / Cancelar RSVP).
- **Response (200 OK)**:
```json
{
  "eventId": 1,
  "isConfirmed": true,
  "xpEarned": 250,
  "ribTokensEarned": 1
}
```

---

## 5. 🍷 Experiências (`/experiences`)

### `GET /experiences`
Lista experiências gastronômicas, masterclasses e degustações privadas.

### `GET /experiences/:id`
Retorna detalhes completos da experiência.

### `GET /experiences/:id/attendees`
Retorna lista de associados que adquiriram cotas para a experiência.

### `POST /experiences/:id/checkout`
Processa a compra / reserva de cotas da experiência.
- **Request Body**:
```json
{
  "seats": 1,
  "paymentMethod": "credit_card",
  "cardToken": "tok_12345",
  "useRibTokensDiscount": true
}
```
- **Response (200 OK)**:
```json
{
  "orderId": "ORD-EXP-2026-091",
  "status": "confirmed",
  "amountPaid": 450.00,
  "xpEarned": 150
}
```

---

## 6. 🏨 Hospedagens & Estadias (`/stays`)

### `GET /stays`
Lista acomodações, suítes e villas disponíveis para reserva.

### `GET /stays/:id`
Retorna detalhes da suíte, comodidades, fotos e regras.

### `GET /stays/my-stays`
Retorna o histórico e as reservas ativas do associado autenticado.
- **Response (200 OK)**:
```json
[
  {
    "id": "stay-res-001",
    "stayName": "Suíte Presidencial Faria Lima",
    "location": "ClubKey São Paulo • Torre Sul",
    "checkIn": "14 Nov 2026",
    "checkOut": "18 Nov 2026",
    "guests": 2,
    "status": "confirmed",
    "confirmationCode": "CK-STAY-8821",
    "totalPrice": 4800,
    "image": "/utils/banners/img_01.png"
  }
]
```

### `POST /stays/book`
Realiza a reserva de uma acomodação.

### `DELETE /stays/reservations/:id`
Cancela uma reserva de hospedagem.
- **Response (200 OK)**: `{ "success": true, "message": "Reserva cancelada com sucesso." }`

---

## 7. 🎁 Benefícios & Parcerias (`/benefits`)

### `GET /benefits`
Lista benefícios de parceiros com filtros de categoria (`"gastronomy"`, `"mobility"`, `"lifestyle"`, `"wellness"`).
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "partnerName": "Fasano Gastronomia",
    "partnerLogo": "/utils/partners/fasano.png",
    "category": "gastronomy",
    "title": "Welcome Drink & Isenção de Rolha",
    "discountBadge": "VIP Club",
    "description": "Benefício exclusivo em todas as unidades do grupo...",
    "couponCode": "CLUBKEY-FASANO-2026",
    "validUntil": "Dezembro 2026"
  }
]
```

---

## 8. 🛡️ KeyPass — Tiers, Missões, Conquistas & Ranking (`/keypass`)

### `GET /keypass/me`
Retorna o estado completo de pontuação e progresso do associado.
- **Response (200 OK)**:
```json
{
  "xp": 14200,
  "ribTokens": 24,
  "currentTier": {
    "id": "embaixador",
    "name": "Embaixador",
    "badge": "Tier V",
    "minXp": 12000,
    "maxXp": 25000,
    "level": 5,
    "image": "/utils/gamification/tiers/05_embaixador.webp"
  },
  "nextTier": {
    "id": "patrono",
    "name": "Patrono",
    "minXp": 25000
  },
  "claimedMilestones": {
    "embaixador_0": true,
    "embaixador_1": false
  }
}
```

### `GET /keypass/missions`
Lista todas as missões qualificadoras e o progresso do usuário em cada uma.
- **Response (200 OK)**:
```json
[
  {
    "id": "mission-1",
    "title": "Networking de Alto Impacto",
    "description": "Conecte-se com 3 novos associados.",
    "category": "networking",
    "xpReward": 250,
    "tokensReward": 1,
    "currentProgress": 2,
    "totalRequired": 3,
    "isCompleted": false,
    "isClaimed": false,
    "actionUrl": "/conexoes",
    "actionLabel": "Explorar Membros"
  }
]
```

### `POST /keypass/missions/:id/claim`
Resgata a recompensa de uma missão cumprida.
- **Response (200 OK)**:
```json
{
  "missionId": "mission-1",
  "xpAdded": 250,
  "ribTokensAdded": 1,
  "newTotalXp": 14450,
  "newTotalTokens": 25
}
```

### `GET /keypass/badges`
Lista todas as insígnias e o status de desbloqueio do associado.

### `GET /keypass/ranking`
Retorna a tabela de classificação do ecossistema.
- **Query Params**: `timeframe` (`"all_time"` | `"monthly"` | `"quarterly"`).
- **Response (200 OK)**:
```json
[
  {
    "rank": 1,
    "id": 3,
    "name": "Eduardo Prado",
    "role": "Fundador",
    "company": "Prado Agro",
    "city": "Ribeirão Preto",
    "avatar": "https://...",
    "tierId": "patrono",
    "xp": 16850,
    "ribTokens": 18,
    "change": 0,
    "isCurrentUser": false
  }
]
```

### `GET /keypass/weekly-drops`
Retorna as recompensas de liberação semanal.

### `POST /keypass/weekly-drops/:id/claim`
Resgata um drop semanal disponível.

---

## 9. 💬 Chat & Mensagens Diretas (`/chat`)

### `GET /chat/conversations`
Lista conversas ativas com contatos e última mensagem.

### `GET /chat/:memberId/messages`
Lista o histórico de mensagens trocadas com um associado específico.

### `POST /chat/messages`
Envia uma mensagem de texto privada.
- **Request Body**:
```json
{
  "receiverId": 2,
  "text": "Olá Fernanda, tudo bem? Gostaria de conversar sobre a rodada seed."
}
```
- **Response (201 Created)**: Retorna a mensagem persistida com timestamp.

---

## 10. 👤 Perfil do Membro (`/profile`)

### `GET /profile`
Retorna os dados completos de perfil do usuário logado.

### `PUT /profile`
Atualiza os dados de perfil (bio, tags de negócio, telefone, redes sociais).
- **Request Body**:
```json
{
  "name": "Rodrigo Salles",
  "role": "Founder & CEO",
  "company": "Venture Capital",
  "bio": "Investidor em deep techs...",
  "phone": "+55 11 99999-9999",
  "linkedin": "https://linkedin.com/in/...",
  "instagram": "@rodrigo.salles",
  "seeking": ["Investimentos", "AgroTech"],
  "offering": ["Mentoria", "Fundraising"]
}
```

### `GET /profile/subscription`
Retorna os dados da assinatura ativa (plano, valor, data de renovação, cartão).

### `POST /profile/2fa/toggle`
Ativa ou desativa a autenticação em dois fatores.
