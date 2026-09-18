# Especificação de Módulo: Experiências & Lifestyle (`/experiencias`)

O módulo de **Experiências** gerencia vivências exclusivas, jantares sensoriais conduzidos por chefs renomados, masterclasses de enologia e degustações raras em caves privadas para associados do ClubKey.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/experiencias` | Catálogo geral com filtros por categoria e busca | Client Component | Autenticado |
| `/experiencias/[id]/[slug]` | Página de detalhes completos da experiência | Server + Client | Autenticado |
| `/experiencias/[id]/[slug]/checkout` | Fluxo de reserva e checkout (PIX / Cartão / Tokens RIB) | Client Component | Autenticado |
| `/experiencias/[id]/[slug]/quem-vai` | Lista de membros com presença confirmada | Server + Client | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Catálogo de Experiências (`/experiencias`)
- **Hero de Apresentação**:
  - Título `"EXPERIÊNCIAS & LIFESTYLE EXCLUSIVO"`.
  - Subtítulo com destaque para curadoria gastronômica e vivências de alto luxo.
- **Barra de Filtros & Busca**:
  - Filtros de categoria: `"Todos"`, `"Vinhos & Degustação"`, `"Alta Gastronomia"`, `"Lifestyle"`, `"Arte & Cultura"`.
  - Input de busca por nome da experiência, chef ou local.
- **Grid de Cards (`experienceCard.tsx`)**:
  - Foto em alta definição (`image`), categoria e subtítulo de duração/vagas (`sub`).
  - Preço por cota em BRL (`price`) e custo opcional em Tokens RIB (`ribTokensCost`).
  - Vagas restantes (`spotsLeft` de `capacity`) e recompensa em XP (`xpReward`).
  - Botão CTA *"Garantir Cota"* $\rightarrow$ `/experiencias/[id]/[slug]`.

### 2. Detalhes da Experiência (`/experiencias/[id]/[slug]`)
- **`experienceDetailClient.tsx`**:
  - `backButton.tsx`: Retorna para `/experiencias`.
  - `shareButton.tsx`: Compartilha a vivência nas redes ou via link direto.
  - **Banner Hero & Dados Gerais**: Data, horário, endereço/localização e categoria.
  - **Card do Chef / Especialista**: Mini-bio do anfitrião com foto, especialidade e conquistas (estrelas Michelin, prêmios).
  - **Descrição Completa & Menu Degustação**: Detalhamento prato a prato ou etapas da vivência.
  - **Itens Inclusos (`includes`)**: Harmonização de rótulos raros, transporte executivo, material didático e presentes exclusivos.
  - **Widget "Quem Vai"**: Miniatura dos participantes confirmados com link para `/quem-vai`.
  - **Botão de Reserva Principal**: Leva diretamente para a tela de checkout (`/checkout`).

### 3. Checkout de Experiência (`/experiencias/[id]/[slug]/checkout`)
- **Resumo do Pedido**:
  - Nome da experiência, data, horário e valor unitário da cota.
  - **Seletor de Vagas**: Contador numérico (`1` a `4` cotas).
- **Abatimento com Tokens RIB (`useRibTokensDiscount`)**:
  - Switch/Checkbox permitindo abater valor financeiro utilizando o saldo disponível de Tokens RIB.
  - Exibe o valor do desconto calculado dinamicamente em Reais.
- **Métodos de Pagamento (`paymentMethod`)**:
  - Tabs ou botões de rádio para escolher entre **PIX** ou **Cartão de Crédito**.
  - Se **PIX**: Gera QR Code dinâmico, código Pix Copia-e-Cola e contador de expiração de 15 minutos.
  - Se **Cartão de Crédito**: Formulário seguro com campos de Número do Cartão, Nome Impresso, Validade (`MM/AA`), CVV e opção de parcelamento.
- **Botão "Confirmar Pagamento & Garantir Vagas"**:
  - Processa a transação, credita XP de compra na conta do associado e exibe tela/modal de confirmação com voucher digital.

### 4. Tela "Quem Vai" (`/experiencias/[id]/[slug]/quem-vai`)
- Lista os membros que adquiriram cotas para o mesmo encontro.
- Suporta busca e botão de conexão rápida entre os participantes.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface ExperienceItem {
  id: number
  title: string
  sub: string
  category: "wine" | "gastronomy" | "lifestyle" | "art"
  date: string
  time: string
  location: string
  image: string
  description: string
  fullDescription: string
  includes: string[]
  participants: number[]
  price: number
  ribTokensCost?: number
  capacity: number
  spotsLeft?: number
  xpReward: number
}

export interface ExperienceCheckoutPayload {
  experienceId: number
  seats: number
  paymentMethod: "pix" | "credit_card" | "rib_tokens"
  useRibTokensDiscount?: boolean
  tokensToRedeem?: number
  creditCard?: {
    cardNumber: string
    holderName: string
    expiry: string
    cvv: string
    installments?: number
  }
}

export interface ExperienceCheckoutResponse {
  orderId: string
  status: "confirmed" | "pending_payment" | "failed"
  amountPaid: number
  discountApplied: number
  tokensUsed: number
  xpEarned: number
  voucherCode: string
  qrCodeUrl?: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/experiences`
Lista todas as experiências com filtros de categoria e busca.
- **Query Params**:
  - `category` (opcional): `"wine"` | `"gastronomy"` | `"lifestyle"` | `"art"`
  - `search` (opcional): Termo de busca no título ou descrição.
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
    "description": "Uma imersão sensorial única pelas encostas da Côte de Nuits...",
    "price": 850.00,
    "ribTokensCost": 4,
    "capacity": 10,
    "spotsLeft": 2,
    "xpReward": 150
  }
]
```

### 2. `GET /api/v1/experiences/:id`
Retorna todos os dados detalhados da experiência.
- **Path Params**: `id` (número inteiro).
- **Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Masterclass de Vinhos Raros da Borgonha",
  "sub": "Degustação de 6 safras premiadas com o Sommelier Ricardo",
  "category": "wine",
  "date": "28 Outubro 2026",
  "time": "19:00",
  "location": "Cave Privée • ClubKey Jardins",
  "image": "/utils/banners/img_03.png",
  "description": "Uma imersão sensorial única pelas encostas da Côte de Nuits e Côte de Beaune.",
  "fullDescription": "Conduzida pelo Sommelier Executivo Ricardo Silveira, esta masterclass reúne seis garrafas raras das safras 2010 a 2018. A degustação será acompanhada por um menu degustação criado especialmente para a ocasião.",
  "includes": [
    "Degustação guiada de 6 vinhos Grands Crus & Premiers Crus",
    "Menu harmonizado em 5 tempos pelo Chef Convidado",
    "Caderno de notas enológicas personalizado em couro ClubKey",
    "Certificado de participação na masterclass assinado pelo sommelier"
  ],
  "participants": [1, 2, 4],
  "price": 850.00,
  "ribTokensCost": 4,
  "capacity": 10,
  "spotsLeft": 2,
  "xpReward": 150
}
```

### 3. `GET /api/v1/experiences/:id/attendees`
Retorna os associados confirmados para a tela *"Quem Vai"*.
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "role": "Founder & Managing Partner",
    "company": "Venture Capital Partners",
    "city": "São Paulo, SP",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "tierId": "patrono",
    "membershipTier": "Patrono"
  }
]
```

### 4. `POST /api/v1/experiences/:id/checkout`
Processa o pagamento das cotas da experiência.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Request Body**:
```json
{
  "experienceId": 1,
  "seats": 1,
  "paymentMethod": "credit_card",
  "useRibTokensDiscount": true,
  "tokensToRedeem": 2,
  "creditCard": {
    "cardNumber": "4111111111111234",
    "holderName": "RODRIGO SALLES",
    "expiry": "11/28",
    "cvv": "123",
    "installments": 1
  }
}
```
- **Response (200 OK)**:
```json
{
  "orderId": "ORD-EXP-2026-091",
  "status": "confirmed",
  "amountPaid": 650.00,
  "discountApplied": 200.00,
  "tokensUsed": 2,
  "xpEarned": 150,
  "voucherCode": "CK-EXP-7712",
  "qrCodeUrl": "https://api.clubkey.com.br/qrcodes/CK-EXP-7712.png"
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Seleção de Cotas**: Atualiza o subtotal em tempo real conforme o número de vagas selecionadas.
2. **Aplicação de Desconto com Tokens RIB**: O usuário pode ativar o switch para abater até o limite permitido; o valor final a pagar é recalculado na hora.
3. **Pagamento PIX**:
   - Exibe código PIX Copia-e-Cola com botão de cópia rápida.
   - O backend pode notificar via WebSocket ou pooling a liquidação do PIX para direcionar o usuário à tela de sucesso.
4. **Toast de Sucesso**: Ao concluir, exibe mensagem celebrando a reserva e informando o total de XP adicionado.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Saldo Insuficiente de Tokens RIB**: O checkbox de desconto só fica elegível se o membro possuir saldo de tokens maior que zero.
2. **Capacidade Esgotada**: Se as vagas forem preenchidas simultaneamente por outro associado durante o checkout, o backend deve responder com `409 Conflict` e o frontend avisar para tentar outra data.
3. **Reembolso & Cancelamento**: Cancelamentos solicitados com até 48h de antecedência estornam o valor integral e devolvem os Tokens RIB à conta.

