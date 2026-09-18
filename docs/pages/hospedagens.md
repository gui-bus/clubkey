# Especificação de Módulo: Hospedagens & Acomodações (`/hospedagens`)

O módulo de **Hospedagens** disponibiliza a coleção privada de vilas, chalés de campo, suítes executivas e boutique hotels parceiros do ClubKey em destinos nacionais e internacionais, com tarifas e benefícios exclusivos para membros.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/hospedagens` | Catálogo geral com barra de busca inteligente e carrosséis temáticos | Client Component | Autenticado |
| `/hospedagens/[id]/[slug]` | Página de detalhes da acomodação e solicitação de reserva | Server + Client | Autenticado |
| `/hospedagens/minhas-hospedagens` | Painel de estadias ativas e histórico de reservas do associado | Client Component | Autenticado |
| `/hospedagens/minhas-hospedagens/[id]/[slug]` | Voucher digital com QR Code de check-in e cancelamento | Server + Client | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Catálogo de Hospedagens (`/hospedagens`)
- **Barra de Busca & Filtros Inteligentes (`roomsSearchFilterBar.tsx`)**:
  - **Destino**: Input com autocompletar e sugestões de cidades/estados (ex: São Paulo, Trancoso, Angra dos Reis, Campos do Jordão, Milão).
  - **Período (Check-in & Check-out)**: Popover com calendário duplo (`datePicker`) para seleção do intervalo de datas.
  - **Hóspedes**: Seletor numérico de passageiros/acompanhantes (`1` a `6+` hóspedes).
  - **Botão "Buscar"**: Filtra a listagem dinamicamente.
- **Carrosséis por Seção Temática (`sectionCarousel.tsx`)**:
  - *"Coleção Urbana & Executiva"*, *"Refúgios de Campo & Serra"*, *"Villas à Beira-Mar"*, *"Coleção Internacional"*.
  - Cada card exibe galeria de fotos, título da suíte, localização, capacidade máxima de hóspedes, diária padrão, diária exclusiva de membro com desconto do tier e botão de favoritar (`toggleFavorite`).

### 2. Detalhes da Acomodação (`/hospedagens/[id]/[slug]`)
- **Galeria de Imagens**: Carrossel em alta definição com suporte a visualização em tela cheia.
- **Ficha Técnica & Comodidades**:
  - Localização precisa, tipo de acomodação (`roomType`: `"master_suite"`, `"executive_room"`, `"villa"`).
  - Tags de comodidades (`amenities`): Wi-Fi de alta velocidade, Jacuzzi privativa, Café da manhã artesanal, Concierge 24h, Heliponto, Adega climatizada.
- **Card Lateral de Reserva**:
  - Seletor de datas e cálculo automático da quantidade de noites (`nights`).
  - Preço por diária e cálculo do valor total (`totalPrice`) já aplicando o percentual de desconto do tier do membro logado.
  - Botão CTA *"Reservar Acomodação"* $\rightarrow$ Envia payload para o backend.

### 3. Minhas Hospedagens (`/hospedagens/minhas-hospedagens`)
- **Abas de Navegação**: *"Reservas Ativas & Futuras"* e *"Histórico de Estadias"*.
- **Cards de Reserva (`memberStayCard.tsx`)**:
  - Foto da suíte, nome da acomodação, endereço.
  - Período (`checkIn` a `checkOut`), total de noites e número de hóspedes.
  - Badge de status colorido:
    - `"confirmada"` (verde esmeralda)
    - `"em_analise"` (azul)
    - `"concluida"` (cinza)
    - `"cancelled"` (vermelho)
  - Botão *"Acessar Voucher & Check-in"* $\rightarrow$ `/minhas-hospedagens/[id]/[slug]`.

### 4. Voucher Digital de Estadia (`/hospedagens/minhas-hospedagens/[id]/[slug]`)
- **`memberStayDetailClient.tsx`**:
  - Cartão de confirmação de luxo com código localizador (ex: `"CK-STAY-8821"`).
  - QR Code dinâmico para leitura rápida na recepção da propriedade.
  - Horários oficiais de Check-in (a partir das 15:00) e Check-out (até as 12:00).
  - Informações de contato do concierge da propriedade e instruções de acesso.
  - Botão perigoso *"Cancelar Reserva"* com diálogo de confirmação (`confirmActionDialog.tsx`).

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface StayItem {
  id: string | number
  title: string
  roomType: "master_suite" | "executive_room" | "villa"
  description: string
  pricePerNight: number
  capacityGuests: number
  images: string[]
  amenities: string[]
  city: {
    name: string
    state: string
  }
}

export interface StayReservation {
  id: string
  stayId: number | string
  stayName: string
  location: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  roomType: string
  status: "confirmada" | "em_analise" | "concluida" | "cancelled"
  confirmationCode: string
  totalPrice: number
  image: string
}

export interface StayBookingPayload {
  stayId: number | string
  checkIn: string
  checkOut: string
  guests: number
  roomType: string
  specialRequests?: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/stays`
Lista todas as propriedades e suítes disponíveis.
- **Query Params**:
  - `destination` (opcional): Filtro por cidade ou estado.
  - `checkIn` (opcional): Data no formato `YYYY-MM-DD`.
  - `checkOut` (opcional): Data no formato `YYYY-MM-DD`.
  - `guests` (opcional): Número mínimo de hóspedes (default: 1).
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Suíte Presidencial Faria Lima",
    "roomType": "master_suite",
    "description": "Suíte de 120m² com vista panorâmica para o skyline financeiro.",
    "pricePerNight": 1200.00,
    "capacityGuests": 2,
    "images": [
      "/utils/banners/img_01.png",
      "/utils/banners/img_02.png"
    ],
    "amenities": ["Wi-Fi 1Gbps", "Jacuzzi", "Café da Manhã Incluso", "Concierge 24/7"],
    "city": {
      "name": "São Paulo",
      "state": "SP"
    }
  }
]
```

### 2. `GET /api/v1/stays/:id`
Retorna os detalhes completos de uma acomodação específica.
- **Response (200 OK)**: Retorna o objeto `StayItem` com a galeria de imagens completa e regras da casa.

### 3. `POST /api/v1/stays/book`
Cria uma nova reserva para o associado logado.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body**:
```json
{
  "stayId": 1,
  "checkIn": "2026-11-14",
  "checkOut": "2026-11-18",
  "guests": 2,
  "roomType": "master_suite",
  "specialRequests": "Check-in antecipado às 13h, se possível."
}
```
- **Response (201 Created)**:
```json
{
  "reservationId": "stay-res-001",
  "status": "confirmada",
  "confirmationCode": "CK-STAY-8821",
  "totalPrice": 4800.00,
  "nights": 4,
  "xpEarned": 400
}
```

### 4. `GET /api/v1/stays/my-stays`
Lista todas as reservas do associado autenticado.
- **Response (200 OK)**:
```json
[
  {
    "id": "stay-res-001",
    "stayId": 1,
    "stayName": "Suíte Presidencial Faria Lima",
    "location": "ClubKey São Paulo • Torre Sul",
    "checkIn": "14 Nov 2026",
    "checkOut": "18 Nov 2026",
    "nights": 4,
    "guests": 2,
    "roomType": "Suíte Presidencial",
    "status": "confirmada",
    "confirmationCode": "CK-STAY-8821",
    "totalPrice": 4800.00,
    "image": "/utils/banners/img_01.png"
  }
]
```

### 5. `GET /api/v1/stays/my-stays/:id`
Retorna os detalhes específicos de um voucher de reserva individual.
- **Response (200 OK)**: Retorna o objeto `StayReservation` detalhado com QR Code de validação.

### 6. `DELETE /api/v1/stays/reservations/:id`
Cancela uma reserva de hospedagem.
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Reserva cancelada com sucesso.",
  "reservationId": "stay-res-001",
  "status": "cancelled"
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Filtro Combinado de Destino e Datas**: A barra de pesquisa filtra os quartos nos carrosséis com debounce de 300ms.
2. **Favoritar Acomodação**: Ao clicar no ícone de coração, adiciona aos salvos locais e emite feedback Toast `"Acomodação salva!"`.
3. **Cancelamento Seguro**: Ao clicar em *"Cancelar Reserva"*, um modal `AlertDialog` pergunta se o associado tem certeza. Ao confirmar, envia o `DELETE` e atualiza a lista para o status cancelado.

---

## 🛡️ Regras de Negócio & Descontos por Tier

1. **Desconto Automático em Hospedagens por Tier**:
   - **Membro**: Acesso ao catálogo com diária padrão.
   - **Associado**: Até 20% OFF.
   - **Titular**: Até 25% OFF.
   - **Investidor**: Até 30% OFF.
   - **Incorporador / Patrono**: Até 35% OFF.
2. **Conflito de Disponibilidade**: Caso o quarto já esteja reservado nas datas solicitadas, a API responde `422 Unprocessable Entity` com `"Datas indisponíveis para esta acomodação"`.

