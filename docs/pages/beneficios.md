# Especificação de Módulo: Benefícios & Parcerias (`/beneficios`)

O módulo de **Benefícios & Parcerias** concentra as vantagens exclusivas negociadas pela diretoria do ClubKey com marcas de luxo, restaurantes com estrelas Michelin, empresas de aviação executiva, spas de alto padrão e serviços de atendimento internacional.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/beneficios` | Galeria geral de benefícios com filtros por categoria e modal de resgate | Client Component | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Galeria de Benefícios (`/beneficios`)
- **Hero & Filtros de Categoria**:
  - Título `"BENEFÍCIOS EXCLUSIVOS & PARCERIAS DE LUXO"`.
  - Pílulas de seleção de categoria:
    - `"Todos"`
    - `"Gastronomia & Vinhos"` (`"gastronomy"`)
    - `"Mobilidade & Aviação"` (`"mobility"`)
    - `"Lifestyle & Moda"` (`"lifestyle"`)
    - `"Wellness & Saúde"` (`"wellness"`)
  - Campo de pesquisa em tempo real por nome do parceiro ou tipo de vantagem.
- **Grid de Cards de Benefício (`BenefitCard`)**:
  - Logotipo da marca parceira (`partnerLogo`).
  - Nome do parceiro (`partnerName`) e badge de destaque da vantagem (`discountBadge`: ex: `"20% OFF"`, `"Isenção de Rolha"`, `"Upgrade de Categoria"`, `"Welcome Amenity"`).
  - Título da oportunidade (`title`) e resumo das condições.
  - Data de validade da parceria (`validUntil`).
  - Botão de ação *"Resgatar Vantagem"* $\rightarrow$ Abre o modal detalhado de resgate.

### 2. Modal de Resgate de Cupom (`BenefitRedemptionDialog`)
- **Cabeçalho**: Logotipo oficial do parceiro, título da vantagem e selo de garantia ClubKey.
- **Bloco de Cupom / Código**:
  - Caixa de código estilizada em fonte monoespaçada (ex: `"CLUBKEY-FASANO-2026"`).
  - Botão interativo de cópia com um clique (`Copy`), disparando Toast de confirmação.
- **Instruções de Utilização**:
  - Passo 1: Informar o código no checkout ou apresentar a carteira digital KeyPass.
  - Passo 2: Condições de reserva prévia (se aplicável).
- **Botão de Ação Externa**: Link seguro para abrir o portal do parceiro ou chamar o suporte no WhatsApp.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface BenefitItem {
  id: number
  partnerName: string
  partnerLogo: string
  category: "gastronomy" | "mobility" | "lifestyle" | "wellness"
  title: string
  discountBadge: string
  description: string
  fullRules?: string
  redemptionType: "coupon" | "qr_code" | "direct_show"
  couponCode?: string
  actionUrl?: string
  validUntil: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/benefits`
Lista os parceiros e benefícios disponíveis com filtros.
- **Query Params**:
  - `category` (opcional): `"gastronomy"` | `"mobility"` | `"lifestyle"` | `"wellness"`
  - `search` (opcional): Termo de busca por nome do parceiro ou título.
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
    "description": "Benefício exclusivo em todas as unidades do grupo no Brasil e Uruguai.",
    "fullRules": "Válido para mesas de até 4 pessoas mediante apresentação do KeyPass digital. Não cumulativo com outras promoções.",
    "redemptionType": "coupon",
    "couponCode": "CLUBKEY-FASANO-2026",
    "actionUrl": "https://www.fasano.com.br/reservas",
    "validUntil": "Dezembro 2026"
  },
  {
    "id": 2,
    "partnerName": "Flapper Aviação Executiva",
    "partnerLogo": "/utils/partners/flapper.png",
    "category": "mobility",
    "title": "US$ 250 de Crédito em Voos Compartilhados",
    "discountBadge": "US$ 250 OFF",
    "description": "Crédito na primeira reserva de assento em jatos e helicópteros executivos.",
    "fullRules": "Aplicável no app Flapper inserindo o cupom exclusivo ClubKey antes do checkout.",
    "redemptionType": "coupon",
    "couponCode": "FLAPPER-CLUBKEY-VIP",
    "actionUrl": "https://flyflapper.com",
    "validUntil": "Novembro 2026"
  }
]
```

### 2. `GET /api/v1/benefits/:id`
Retorna as regras completas e detalhes de um benefício específico.
- **Response (200 OK)**: Retorna o objeto `BenefitItem` individual.

### 3. `POST /api/v1/benefits/:id/claim`
Registra a visualização/cópia do cupom pelo associado para contabilização de métricas de conversão do parceiro.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response (200 OK)**:
```json
{
  "benefitId": 1,
  "claimedAt": "2026-09-17T17:40:00Z",
  "couponCode": "CLUBKEY-FASANO-2026"
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Filtro Rápido por Pílulas**: A seleção de categoria filtra a grade instantaneamente.
2. **Cópia do Código de Cupom**: Clicar no botão de cópia armazena a string no clipboard do sistema e dispara Toast de sucesso: `"Código CLUBKEY-FASANO-2026 copiado!"`.
3. **Abertura de Link do Parceiro**: Abre uma nova aba (`target="_blank" rel="noopener noreferrer"`) mantendo o associado no portal.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Benefício Expirado**: Benefícios cuja data `validUntil` tenha sido ultrapassada são ocultados automaticamente da listagem.
2. **Categorização Obrigatória**: Todo benefício pertence a uma das quatro categorias oficiais (`gastronomy`, `mobility`, `lifestyle`, `wellness`).

