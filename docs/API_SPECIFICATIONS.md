# Especificação Completa da API (API Specifications)

Este documento descreve todas as rotas RESTful necessárias para que o backend forneça os dados e processamento exigidos pelo frontend do **ClubKey**.

---

## 🔒 Padrões Globais da API

- **Base URL**: `https://api.clubkey.com.br/api/v1` (ou `http://localhost:8000/api/v1` em ambiente local).
- **Autenticação**: Header padrão `Authorization: Bearer <jwt_token>`.
- **Formato de Dados**: `application/json` (UTF-8).
- **Convenção de Nomenclatura**: **Estritamente `camelCase`** em todas as chaves JSON (requests e responses).
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

## ⚡ Guia de Integração Frontend & Documentação OpenAPI (Scalar + Orval)

O frontend do **ClubKey** utilizará a seguinte arquitetura de consumo de API:
- **Axios**: Cliente HTTP para chamadas com interceptors de autenticação.
- **TanStack React Query v5** (com `React Query Devtools`): Gerenciamento de cache, refetching em segundo plano e mutações otimistas.
- **Orval**: Gerador automático de código que lê a especificação OpenAPI 3.x do backend e gera automaticamente todos os types TypeScript e hooks do React Query (`useQuery`, `useMutation`).

### 💡 Recomendações para o Backend (PHP / Laravel / Symfony):
1. **Documentação Automática com [Scalar](https://scalar.com/)**:
   - Recomenda-se hospedar a interface do **Scalar** (ex: na rota `/docs` ou `/api/documentation`) para que a equipe de frontend possa testar as rotas interativamente.
   - Em **Laravel**, recomenda-se utilizar o pacote [`dedoc/scramble`](https://scramble.dedoc.co/) (gera OpenAPI 3.x automaticamente sem anotações manuais) em conjunto com [`scalar/laravel`](https://github.com/scalar/laravel).
2. **Exposição do JSON da OpenAPI**:
   - Disponibilizar a rota pública `GET /docs/api.json` ou `GET /openapi.json` para que o frontend rode `npx orval` e sincronize os tipos em 1 segundo.
3. **Definição de `operationId` nas Rotas**:
   - Cada endpoint deve possuir um `operationId` explícito e semântico (ex: `getEventsList`, `createEventRsvp`, `getUserProfile`, `getNotificationsSummary`). O Orval usa o `operationId` para dar nome aos hooks do React Query (`useGetEventsList`, `useCreateEventRsvp`, etc.).
4. **CORS (Cross-Origin)**:
   - Configurar o backend para aceitar requisições de `http://localhost:3000` com `credentials: true` e headers `Authorization`, `Content-Type`, `Accept`.

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
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "role": "Founder & CEO",
    "company": "Venture Capital",
    "avatar": "https://images.unsplash.com/..."
  }
}
```

### `POST /auth/sign-up`
Cria uma nova conta / solicitação de adesão ao clube.
- **Request Body**:
```json
{
  "firstName": "Rodrigo",
  "lastName": "Salles",
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

## 2. 👥 Membros & Networking (`/members`, `/connections`)

### `GET /members`
Lista membros da rede com paginação e filtros.
- **Query Params**:
  - `search` (opcional): Busca por nome, cargo ou empresa.
  - `seeking` (opcional): Tag de busca (ex: `"Investimentos"`).
  - `offering` (opcional): Tag de oferta (ex: `"Mentoria"`).
  - `city` (opcional): Filtrar por cidade.
  - `page` (default: 1), `limit` (default: 20).
- **Response (200 OK)**:
```json
{
  "items": [
    {
      "id": 1,
      "firstName": "Rodrigo",
      "lastName": "Salles",
      "role": "Founder & CEO",
      "company": "Venture Capital",
      "city": "São Paulo",
      "avatar": "https://...",
      "coverImage": "https://...",
      "tierId": "patrono",
      "membershipTier": "Patrono",
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

## 3. 📅 Eventos (`/events`)

### `GET /events`
Lista eventos da plataforma com suporte a filtros de categoria e busca.
- **Query Params**: `category`, `search`, `page`, `limit`.
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
    "minTier": "patrono",
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
    "firstName": "Rodrigo",
    "lastName": "Salles",
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

## 4. 🍷 Experiências (`/experiences`)

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

## 5. 🏨 Hospedagens & Estadias (`/stays`)

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

## 6. 🎁 Benefícios & Parcerias (`/benefits`)

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

## 7. 🛡️ KeyPass — Tiers, Missões, Conquistas & Ranking (`/keypass`)

### `GET /keypass/me`
Retorna o estado completo de pontuação e progresso do associado.
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
    "firstName": "Eduardo",
    "lastName": "Prado",
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

### `GET /keypass/tiers`
Retorna a lista oficial dos 6 Tiers Executivos para a página de Regras (`/keypass/regras`).
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

## 8. 💬 Chat & Mensagens Diretas (`/chat`)

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

## 9. 👤 Perfil do Membro (`/profile`)

### `GET /profile`
Retorna os dados completos de perfil do usuário logado.

### `PUT /profile`
Atualiza os dados de perfil (bio, tags de negócio, telefone, redes sociais).
- **Request Body**:
```json
{
  "firstName": "Rodrigo",
  "lastName": "Salles",
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
Retorna os dados da assinatura ativa (plano, valor, status, data de renovação e dados mascarados do cartão).
- **Response (200 OK)**:
```json
{
  "id": "sub-01",
  "planName": "ClubKey Member",
  "planType": "monthly",
  "status": "active",
  "price": "R$ 19,90/mês",
  "billingCycle": "mensal",
  "nextBillingDate": "2026-10-17",
  "currentPeriodEnd": "2026-10-17T00:00:00Z",
  "cancelAtPeriodEnd": false,
  "card": {
    "brand": "Mastercard",
    "lastFour": "4242",
    "expiry": "12/28"
  }
}
```

### `POST /subscriptions/checkout`
Realiza a contratação de uma nova assinatura ou renovação (utilizado na landing/portal).
- **Request Body (Cartão de Crédito)**:
```json
{
  "planType": "monthly",
  "paymentMethod": "credit_card",
  "cardNumber": "4242424242424242",
  "holderName": "Rodrigo Salles",
  "expirationDate": "12/28",
  "cvv": "123",
  "holderCpf": "123.456.789-00"
}
```
- **Request Body (PIX)**:
```json
{
  "planType": "annual",
  "paymentMethod": "pix"
}
```
- **Response (200 OK)**:
```json
{
  "status": "active",
  "subscriptionId": "sub_ck_9921",
  "planName": "ClubKey Member",
  "pixQrCode": "00020126580014br.gov.bcb.pix...",
  "pixCopyPaste": "00020126580014br.gov.bcb.pix..."
}
```

### `POST /profile/subscription/card`
Atualiza o cartão de crédito associado à assinatura recorrente.
- **Request Body**:
```json
{
  "cardNumber": "5555444433332222",
  "holderName": "Rodrigo Salles",
  "expirationDate": "10/29",
  "cvv": "456",
  "holderCpf": "123.456.789-00"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "card": {
    "brand": "Visa",
    "lastFour": "2222",
    "expiry": "10/29"
  }
}
```

### `POST /profile/subscription/cancel`
Agenda o cancelamento da renovação automática ao final do período vigente.
- **Response (200 OK)**:
```json
{
  "success": true,
  "cancelAtPeriodEnd": true,
  "activeUntil": "2026-10-17"
}
```

### `GET /profile/invoices`
Lista o histórico de faturas e recibos de pagamento.
- **Response (200 OK)**:
```json
[
  {
    "id": "inv-2026-09",
    "date": "17 de Setembro de 2026",
    "amount": "R$ 19,90",
    "status": "paid",
    "paymentMethod": "Mastercard •••• 4242",
    "pdfUrl": "https://api.clubkey.com.br/invoices/inv-2026-09.pdf"
  }
]
```

### `POST /profile/2fa/toggle`
Ativa ou desativa a autenticação em dois fatores (2FA).
- **Request Body**: `{ "enabled": true, "token": "123456" }`
- **Response (200 OK)**: `{ "twoFactorEnabled": true }`


---

## 10. 🔔 Central de Notificações (`/notifications`)

### `GET /notifications/summary`
Retorna o sumário de contadores e notificações ativas para o dropdown do cabeçalho.
- **Response (200 OK)**:
```json
{
  "totalUnread": 3,
  "pendingInvitesCount": 1,
  "unreadMessagesCount": 2,
  "notifications": [
    {
      "id": "notif-001",
      "type": "connection_request",
      "title": "Solicitação de Conexão",
      "message": "Carlos Eduardo enviou uma solicitação de networking para você.",
      "isRead": false,
      "createdAt": "2026-09-17T15:30:00Z",
      "sender": {
        "id": 4,
        "firstName": "Carlos",
        "lastName": "Eduardo",
        "avatar": "https://...",
        "role": "Managing Partner",
        "company": "Prado Agro Global"
      },
      "metadata": {
        "memberId": 4
      }
    }
  ]
}
```

### `PATCH /notifications/:id/read`
Marca uma notificação individual como lida.
- **Response (200 OK)**: `{ "id": "notif-001", "isRead": true }`

### `POST /notifications/read-all`
Marca todas as notificações como lidas.
- **Response (200 OK)**: `{ "success": true, "markedCount": 3 }`

