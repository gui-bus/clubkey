# Especificação de Módulo: Perfil do Membro & Assinatura (`/perfil`)

O módulo de **Perfil & Assinatura** centraliza a identidade profissional do associado, gestão de tags de matchmaking para networking, uploads de fotos e banners, configurações de segurança de acesso (2FA) e gerenciamento financeiro de planos e cartões de crédito.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/perfil` | Edição completa de perfil, biografia, tags de negócios e segurança 2FA | Client Component | Autenticado |
| `/perfil/minha-assinatura` | Painel financeiro, detalhes do plano, cartão cadastrado e faturas | Client Component | Autenticado |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Meu Perfil Executivo (`/perfil`)
- **Header de Identidade Visual**:
  - Banner panorâmico de capa (`coverImage`) com botão de alteração rápida de capa.
  - Avatar do membro em alta resolução (`avatar`) com botão de câmera para upload.
  - Nome completo, cargo, empresa e badge de Tier do membro.
- **Seção: Dados Pessoais & Profissionais (`ProfilePersonalForm`)**:
  - Inputs para: Primeiro Nome (`firstName`), Sobrenome (`lastName`), E-mail Corporativo (`email`), Cargo (`role`), Empresa (`company`), Cidade/UF (`city`) e Biografia (`bio`).
- **Seção: Canais de Contato & Redes**:
  - Inputs para: URL do LinkedIn (`linkedin`), Usuário do Instagram (`instagram`), Telefone / WhatsApp com máscara (`phone`).
- **Seção: Foco de Negócios & Tags de Networking**:
  - **O que Busco (`seeking`)**: Interface dinâmica de inserção de tags com tecla `Enter` ou botão de adicionar, renderizando pílulas com botão de exclusão (`X`).
  - **O que Ofereço (`offering`)**: Interface idêntica para competências e ofertas de valor.
- **Seção: Dados Cadastrais & Fiscais**:
  - Campos corporativos: Nacionalidade (`nationality`), CPF (`cpf`), Data de Nascimento (`birthDate`), Razão Social (`companyName`), CNPJ (`cnpj`), E-mail Corporativo (`corporateEmail`), Data de Abertura (`openingDate`).
- **Seção: Segurança da Conta**:
  - **Autenticação em Dois Fatores (2FA)**: Switch que dispara modal explicativo com QR Code para Google Authenticator ou Authy. Ao ativar, credita a insígnia *"Blindagem Digital"* e +100 XP.
  - **Alteração de Senha**: Campos para Senha Atual, Nova Senha Segura e Confirmação de Senha.
- **Botão Principal de Salvamento**: *"Salvar Alterações"* fixo no rodapé com feedback via Toast.

### 2. Minha Assinatura (`/perfil/minha-assinatura`)
- **Card de Destaque do Plano**:
  - Nome do plano (ex: *"Membro Fundador Anual"*), badge de status ativo (verde esmeralda) e badge do tier correspondente.
  - Preço formatado (ex: `R$ 1.890 / mês`) e data da próxima renovação automática.
- **Card de Método de Pagamento (`PaymentMethodCard`)**:
  - Ícone da bandeira do cartão (Visa, Mastercard, Amex, Elo).
  - Dígitos finais mascarados (ex: `Mastercard •••• 4242`).
  - Data de validade do cartão (`Expira em 11/2028`).
  - Botão *"Trocar Cartão de Crédito"* $\rightarrow$ Abre modal de inserção de novo cartão.
- **Tabela de Histórico de Faturas (`InvoicesTable`)**:
  - Colunas: Data de Cobrança, Descrição / Competência, Valor Total Pago (BRL), Status de Liquidação e Botão de Download de Recibo / PDF.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface ProfileUpdateRequest {
  firstName: string
  lastName: string
  role: string
  company: string
  city: string
  bio: string
  linkedin?: string
  instagram?: string
  phone?: string
  seeking: string[]
  offering: string[]
  nationality?: "brasileiro" | "estrangeiro"
  cpf?: string
  birthDate?: string
  companyName?: string
  cnpj?: string
  corporateEmail?: string
  openingDate?: string
}

export interface SubscriptionDetails {
  planName: string
  tierBadge: string
  status: "active" | "canceled" | "past_due"
  priceFormatted: string
  nextBillingDate: string
  paymentMethod: {
    brand: "mastercard" | "visa" | "amex" | "elo"
    last4: string
    expiry: string
  }
}

export interface InvoiceItem {
  id: string
  date: string
  description: string
  amount: number
  status: "paid" | "pending" | "refunded"
  invoicePdfUrl: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/profile`
Retorna todos os dados de perfil, preferências de segurança e dados corporativos do membro logado.
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
  "coverImage": "/utils/banners/img_02.png",
  "bio": "Investidor anjo em deep techs e soluções sustentáveis.",
  "membershipTier": "Patrono",
  "tierId": "patrono",
  "memberSince": "2024",
  "seeking": ["Investimentos", "AgroTech", "M&A"],
  "offering": ["Venture Capital", "Mentoria", "Governança"],
  "linkedin": "https://linkedin.com/in/rodrigosalles",
  "instagram": "@rodrigo.salles",
  "phone": "+55 11 99999-9999",
  "nationality": "brasileiro",
  "cpf": "123.456.789-00",
  "birthDate": "1985-04-12",
  "companyName": "Salles Capital Partners Ltda",
  "cnpj": "12.345.678/0001-90",
  "corporateEmail": "contato@venture.com.br",
  "openingDate": "2018-03-01",
  "twoFactorEnabled": true
}
```

### 2. `PUT /api/v1/profile`
Salva as alterações no perfil executivo e tags de networking.
- **Request Body**: Objeto `ProfileUpdateRequest` completo.
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso.",
  "user": {
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "seeking": ["Investimentos", "AgroTech", "M&A"],
    "offering": ["Venture Capital", "Mentoria", "Governança"]
  }
}
```

### 3. `POST /api/v1/profile/avatar`
Upload de nova foto de perfil.
- **Request**: `multipart/form-data` contendo o campo `file` (JPG, PNG ou WEBP até 5MB).
- **Response (200 OK)**:
```json
{
  "avatarUrl": "https://api.clubkey.com.br/uploads/avatars/user-1-avatar.webp"
}
```

### 4. `POST /api/v1/profile/cover`
Upload de nova imagem de capa.
- **Request**: `multipart/form-data` contendo o campo `file` (JPG, PNG ou WEBP até 10MB).
- **Response (200 OK)**:
```json
{
  "coverImageUrl": "https://api.clubkey.com.br/uploads/covers/user-1-cover.webp"
}
```

### 5. `POST /api/v1/profile/2fa/toggle`
Ativa ou desativa a autenticação em dois fatores.
- **Request Body**: `{ "enabled": true, "totpCode": "123456" }`
- **Response (200 OK)**:
```json
{
  "twoFactorEnabled": true,
  "badgeUnlocked": "badge_blindagem_digital",
  "xpAdded": 100
}
```

### 6. `POST /api/v1/profile/password`
Altera a senha do associado.
- **Request Body**:
```json
{
  "currentPassword": "SenhaAntiga123!",
  "newPassword": "NovaSenhaSuperForte456!"
}
```
- **Response (200 OK)**: `{ "success": true, "message": "Senha alterada com sucesso." }`

### 7. `GET /api/v1/profile/subscription`
Retorna os dados detalhados da assinatura e cartão ativo.
- **Response (200 OK)**:
```json
{
  "planName": "Membro Fundador Anual",
  "tierBadge": "Patrono",
  "status": "active",
  "priceFormatted": "R$ 1.890 / mês",
  "nextBillingDate": "14 de Novembro de 2026",
  "paymentMethod": {
    "brand": "mastercard",
    "last4": "4242",
    "expiry": "11/2028"
  }
}
```

### 8. `POST /api/v1/profile/subscription/card`
Atualiza o cartão de crédito da assinatura.
- **Request Body**:
```json
{
  "cardNumber": "4111111111111234",
  "holderName": "RODRIGO SALLES",
  "expiry": "12/29",
  "cvv": "123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "paymentMethod": {
    "brand": "visa",
    "last4": "1234",
    "expiry": "12/2029"
  }
}
```

### 9. `GET /api/v1/profile/invoices`
Lista o histórico de faturas e recibos para download.
- **Response (200 OK)**:
```json
[
  {
    "id": "INV-2026-09",
    "date": "14 Set 2026",
    "description": "Mensalidade ClubKey Fundador",
    "amount": 1890.00,
    "status": "paid",
    "invoicePdfUrl": "https://api.clubkey.com.br/invoices/INV-2026-09.pdf"
  }
]
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Gestão Dinâmica de Tags**:
   - Digitar uma nova tag e pressionar `Enter` adiciona imediatamente a pílula visualmente e a inclui no array `seeking` / `offering`.
   - Clicar no `X` da pílula remove a tag do array.
2. **Toggle 2FA Interativo**:
   - Ao ativar o switch, um modal apresenta a chave secreta e o QR Code. O usuário digita o token de 6 dígitos gerado no app autenticador. Ao validar, o 2FA é ativado com sucesso e a insígnia *"Blindagem Digital"* é concedida.
3. **Salvar Perfil**: Dispara feedback Toast de sucesso: `"Perfil salvo com sucesso!"`.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Sanitização de Tags**: Tags são normalizadas (sem espaços duplos ou caracteres especiais desnecessários).
2. **Validação de CNPJ e CPF**: Os campos de documento aplicam cálculo de dígitos verificadores antes de enviar para o servidor.
3. **Senhas**: A nova senha deve cumprir os requisitos de segurança (mínimo 8 caracteres, maiúscula, número e símbolo).

