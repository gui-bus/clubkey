# Especificação de Módulo: Autenticação & Acesso (`/auth`, `/sign-in`, `/sign-up`)

O módulo de **Autenticação & Acesso** gerencia o controle de entrada, adesão ao clube por convite, recuperação segura de credenciais, geração de tokens JWT e ciclo de vida da sessão do associado no ClubKey.

---

## 🗺️ Rotas do Módulo & Hierarquia

| Rota | Descrição | Tipo | Acesso |
| :--- | :--- | :--- | :--- |
| `/sign-in` (ou `/login`) | Tela de autenticação com e-mail corporativo e senha | Client Component | Público |
| `/sign-up` | Solicitação de adesão ao clube com código de convite | Client Component | Público |
| `/forgot-password` | Solicitação de link de redefinição de senha por e-mail | Client Component | Público |
| `/reset-password` | Criação de nova senha através de token de segurança | Client Component | Público |

---

## 🖥️ Arquitetura Visual & Componentes por Tela

### 1. Login de Membro (`/sign-in`)
- **Layout**:
  - Painel dividido: à esquerda, banner institucional escuro com fotografia de alta qualidade; à direita, card minimalista neutro de autenticação.
- **Campos do Formulário (`signInForm.tsx`)**:
  - **E-mail Profissional (`email`)**: Input com validação de formato e sanitização.
  - **Senha (`password`)**: `passwordInput` com botão de revelar/ocultar senha (ícone de olho).
  - **Checkbox "Lembrar-me" (`rememberMe`)**: Mantém refresh token ativo em cookie seguro.
  - **Link "Esqueci minha senha"**: Redireciona para `/forgot-password`.
  - **Botão CTA "Entrar no ClubKey"**: Dispara login com animação de spinner durante processamento.
  - **Rodapé**: Atalho *"Ainda não possui convite? Solicite sua adesão"* $\rightarrow$ `/sign-up`.

### 2. Solicitação de Adesão (`/sign-up`)
- **Campos do Formulário (`signUpForm.tsx` com validação Zod)**:
  - **Identificação**: Primeiro Nome (`firstName`), Sobrenome (`lastName`), E-mail Corporativo (`email`), Telefone / WhatsApp (`phone`).
  - **Posicionamento Profissional**: Empresa (`company`), Cargo Executivo (`role`), Cidade (`city`), Estado (`state`).
  - **Credenciais**: Senha (`password`) com medidor de força (mínimo 8 caracteres, maiúscula, número e símbolo especial) e Confirmação de Senha (`confirmPassword`).
  - **Código de Convite VIP (`referralCode`)**: Código opcional que vincula o novo associado ao membro indicador.
  - **Termos & Conduta**: Checkbox obrigatório de concordância com o Estatuto do Clube.
  - **Botão CTA "Enviar Solicitação de Adesão"**: Exibe tela de confirmação de cadastro e direciona ao portal.

### 3. Recuperação de Senha (`/forgot-password`)
- Input de e-mail corporativo cadastrado.
- Botão *"Enviar Link de Recuperação"*.
- Mensagem de sucesso com instrução de verificação da caixa de entrada e link para retornar ao login.

### 4. Redefinição de Senha (`/reset-password`)
- Valida o parâmetro `token` presente na URL (ex: `/reset-password?token=abc123xyz`).
- Campos: Nova Senha (`newPassword`) e Confirmação (`confirmPassword`).
- Ao submeter, valida no backend, atualiza o hash da senha e redireciona para `/sign-in` com mensagem de sucesso.

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface SignInPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignInResponse {
  token: string
  refreshToken: string
  expiresIn: number
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    company: string
    city: string
    avatar: string
    tierId: string
    membershipTier: string
  }
}

export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  city: string
  state: string
  password: string
  referralCode?: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  newPassword: string
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `POST /api/v1/auth/sign-in`
Autentica o membro e retorna os tokens de sessão.
- **Request Body**:
```json
{
  "email": "associado@empresa.com.br",
  "password": "MinhaSenhaForte123!",
  "rememberMe": true
}
```
- **Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "d8f7e6a5-2983-4912-9842-fa0184b8a721",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "email": "associado@empresa.com.br",
    "role": "Founder & Managing Partner",
    "company": "Venture Capital",
    "city": "São Paulo, SP",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    "tierId": "patrono",
    "membershipTier": "Patrono"
  }
}
```
- **Tratamento de Erros**:
  - `401 Unauthorized`: `"Credenciais inválidas. Verifique seu e-mail e senha."`
  - `403 Forbidden`: `"Conta pendente de aprovação pela diretoria do Clube."`

### 2. `POST /api/v1/auth/sign-up`
Cria uma nova conta de associado ou submete solicitação de adesão.
- **Request Body**:
```json
{
  "firstName": "Rodrigo",
  "lastName": "Salles",
  "email": "rodrigo.salles@venture.com.br",
  "phone": "+55 11 99999-9999",
  "company": "Venture Capital Partners",
  "role": "Founder & Managing Partner",
  "city": "São Paulo",
  "state": "SP",
  "password": "MinhaSenhaForte123!",
  "referralCode": "CONVITE-VIP-2026"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Cadastro realizado com sucesso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "user": {
    "id": 1,
    "firstName": "Rodrigo",
    "lastName": "Salles",
    "email": "rodrigo.salles@venture.com.br",
    "tierId": "membro",
    "membershipTier": "Membro"
  }
}
```

### 3. `POST /api/v1/auth/forgot-password`
Envia e-mail transacional com link de redefinição contendo token criptografado.
- **Request Body**: `{ "email": "associado@empresa.com.br" }`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Se o e-mail estiver cadastrado, você receberá as instruções em instantes."
}
```

### 4. `POST /api/v1/auth/reset-password`
Grava a nova senha a partir do token de recuperação.
- **Request Body**:
```json
{
  "token": "reset-token-valid-60-min",
  "newPassword": "NovaSenhaSegura456!"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Senha redefinida com sucesso. Faça login com suas novas credenciais."
}
```

### 5. `POST /api/v1/auth/refresh-token`
Renova o token JWT de acesso utilizando o Refresh Token.
- **Request Body**: `{ "refreshToken": "d8f7e6a5-2983-4912-9842-fa0184b8a721" }`
- **Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "nova-string-uuid-refresh-token",
  "expiresIn": 86400
}
```

### 6. `POST /api/v1/auth/logout`
Invalida o refresh token no backend e encerra a sessão ativa.
- **Response (200 OK)**: `{ "success": true, "message": "Sessão encerrada com sucesso." }`

---

## ⚡ Interações & Comportamento do Usuário

1. **Persistência de Sessão**: O token retornado pelo `/sign-in` é salvo em cookie seguro (`HttpOnly` em produção) e sincronizado com os headers de requisição do frontend.
2. **Feedback de Validação com Zod**: Erros de formulário (ex: senha curta, e-mail inválido, senhas não coincidentes) são indicados inline abaixo de cada input em tempo real.
3. **Redirecionamento Automático**:
   - Login bem-sucedido redireciona automaticamente para `/`.
   - Cadastro bem-sucedido direciona para o onboarding de boas-vindas.

---

## 🛡️ Regras de Segurança & Casos de Borda

1. **Proteção contra Brute Force**: O backend deve bloquear temporariamente (Rate Limit de 5 tentativas) após falhas consecutivas de login.
2. **Expiração do Token de Reset**: Links de redefinição de senha expiram após 60 minutos do disparo.
3. **Bônus de Indicação (`referralCode`)**: Caso um código válido seja fornecido no cadastro, tanto o novo membro quanto o autor do convite recebem +250 XP e +2 Tokens RIB no momento da ativação da conta.

