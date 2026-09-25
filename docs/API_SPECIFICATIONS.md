# Especificação Completa da API (API Specifications)

Este documento descreve todas as rotas RESTful necessárias para que o backend forneça os dados e processamento exigidos pelo frontend do ecossistema **ClubKey & White-Label**.

---

## 🔒 Padrões Globais da API

- **Base URL**: `https://api.clubkey.com.br/api/v1` (ou `http://localhost:8000/api/v1` em desenvolvimento).
- **Autenticação**: Header padrão `Authorization: Bearer <jwt_token>`.
- **Identificação de Tenant (White-Label)**: Header opcional `X-Tenant-ID: clubkey` ou `X-Tenant-ID: viverde` (propagado automaticamente a partir de `process.env.NEXT_PUBLIC_TENANT`).
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

O frontend utilizará a seguinte arquitetura de consumo de API:
- **Axios**: Cliente HTTP para chamadas com interceptors de autenticação e injeção do header de tenant.
- **TanStack React Query v5** (com `React Query Devtools`): Gerenciamento de cache, refetching em segundo plano e mutações otimistas.
- **Orval**: Gerador automático de código que lê a especificação OpenAPI 3.x do backend e gera automaticamente todos os types TypeScript e hooks do React Query (`useQuery`, `useMutation`).

### 💡 Recomendações para o Backend (PHP / Laravel / Symfony):
1. **Documentação Automática com [Scalar](https://scalar.com/)**:
   - Hospedar a interface do **Scalar** (ex: na rota `/docs` ou `/api/documentation`) para testes interativos.
   - Em **Laravel**, recomenda-se utilizar o pacote [`dedoc/scramble`](https://scramble.dedoc.co/) com [`scalar/laravel`](https://github.com/scalar/laravel).
2. **Exposição do JSON da OpenAPI**:
   - Disponibilizar a rota pública `GET /docs/api.json` ou `GET /openapi.json` para sincronização via `npx orval`.
3. **Definição de `operationId` nas Rotas**:
   - Cada endpoint deve possuir um `operationId` semântico (ex: `getEventsList`, `createEventRsvp`, `getUserProfile`, `getNotificationsSummary`).
4. **CORS (Cross-Origin)**:
   - Permitir `http://localhost:3000` com `credentials: true` e headers `Authorization`, `X-Tenant-ID`, `Content-Type`, `Accept`.

---

## 1. 🔑 Autenticação & Conta (`/auth`)

### `POST /auth/sign-in`
Autentica o associado com e-mail e senha.
- **Request Body**: `{ "email": "associado@empresa.com.br", "password": "MinhaSenhaForte123!" }`
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
- **Response (201 Created)**: Retorna o token e o perfil criado.

### `POST /auth/forgot-password` & `POST /auth/reset-password`
Fluxo de recuperação e redefinição de senha com token de 60 minutos.

---

## 2. 👥 Membros & Networking (`/members`, `/connections`)

### `GET /members`
Lista membros da rede com paginação e filtros (`search`, `seeking`, `offering`, `city`, `page`, `limit`).

### `GET /members/:id`
Retorna detalhes completos do perfil público de um associado.

### `GET /connections/my-connections`
Retorna os associados conectados (`connected`), convites recebidos (`receivedInvites`) e convites enviados (`sentInvites`).

### `POST /connections/:memberId/request`
Envia solicitação de conexão.

### `PATCH /connections/:memberId/accept`
Aceita solicitação de conexão recebida.

### `DELETE /connections/:memberId`
Recusa, cancela ou desfaz conexão.

---

## 3. 📅 Eventos (`/events`) *(Módulo: `events`)*

### `GET /events`
Lista eventos da plataforma com suporte a filtros de categoria (`networking`, `keynote`, `exclusive`, `gastronomy`) e busca.

### `GET /events/:id`
Retorna os detalhes completos do evento.

### `GET /events/:id/attendees`
Retorna a lista de associados confirmados para a tela *"Quem Vai"*.

### `GET /events/my-events`
Retorna a lista de eventos nos quais o associado logado confirmou presença.

### `POST /events/:id/rsvp`
Alterna a confirmação de presença (RSVP / Cancelar RSVP).

---

## 4. 🍷 Experiências (`/experiences`) *(Módulo: `experiences`)*

### `GET /experiences`
Lista experiências gastronômicas, masterclasses e degustações privadas.

### `GET /experiences/:id`
Retorna detalhes completos da experiência.

### `GET /experiences/:id/attendees`
Retorna lista de associados que adquiriram cotas.

### `POST /experiences/:id/checkout`
Processa a compra / reserva de cotas da experiência (com suporte a abatimento via Tokens RIB).

---

## 5. 🏨 Hospedagens & Estadias (`/stays`) *(Módulo: `stays`)*

### `GET /stays`
Lista acomodações, suítes e vilas disponíveis para reserva.

### `GET /stays/:id`
Retorna detalhes da suíte, comodidades, fotos e regras.

### `GET /stays/my-stays`
Retorna o histórico e as reservas ativas do associado autenticado.

### `POST /stays/book`
Realiza a reserva de uma acomodação.

### `DELETE /stays/reservations/:id`
Cancela uma reserva de hospedagem.

---

## 6. 🎁 Benefícios & Parcerias (`/benefits`) *(Módulo: `benefits`)*

### `GET /benefits`
Lista benefícios de parceiros com filtros de categoria (`gastronomy`, `mobility`, `lifestyle`, `wellness`).

### `POST /benefits/:id/claim`
Registra o resgate / cópia de código de cupom pelo membro.

---

## 7. 🛡️ KeyPass (`/keypass`) *(Módulo: `keypass`)*

### `GET /keypass/me`
Retorna o estado completo de pontuação e progresso do associado.

### `GET /keypass/missions` & `POST /keypass/missions/:id/claim`
Consulta e resgate de missões qualificadoras.

### `GET /keypass/ranking`
Retorna a tabela de classificação do ecossistema (`timeframe=all_time|monthly|quarterly`).

### `GET /keypass/weekly-drops` & `POST /keypass/weekly-drops/:id/claim`
Consulta e resgate do drop semanal.

### `GET /keypass/tiers`
Retorna a lista oficial dos 6 Tiers Executivos.

---

## 8. 💬 Chat & Mensagens Diretas (`/chat`)

### `GET /chat/conversations`
Lista conversas ativas com contatos e última mensagem.

### `GET /chat/:memberId/messages`
Lista o histórico de mensagens trocadas com um associado.

### `POST /chat/messages`
Envia uma mensagem de texto privada.

---

## 9. 👤 Perfil do Membro & Assinatura (`/profile`)

### `GET /profile` & `PUT /profile`
Consulta e atualização cadastral do associado.

### `POST /profile/2fa/toggle`
Ativação ou desativação de autenticação em dois fatores (TOTP).

### `GET /profile/subscription` & `POST /profile/subscription/card`
Consulta da assinatura ativa e atualização do cartão cadastrado.

### `GET /profile/invoices`
Lista o histórico de faturas e recibos de pagamento.

---

## 10. 🔔 Central de Notificações (`/notifications`)

### `GET /notifications/summary`
Retorna o sumário de contadores e notificações ativas para o dropdown do cabeçalho.

### `PATCH /notifications/:id/read` & `POST /notifications/read-all`
Marcação de leitura individual e em lote.
