# Módulo: Autenticação & Acesso (`/sign-in`, `/sign-up`, etc.)

Este módulo gerencia todos os fluxos de entrada, cadastro, segurança e recuperação de credenciais dos membros do ClubKey.

---

## 🗺️ Rotas do Módulo

1. **`/sign-in` (ou `/login`)**: Tela de autenticação com e-mail corporativo e senha, opção de *Lembrar-me* e atalhos para recuperação de senha e solicitação de convite.
2. **`/sign-up`**: Formulário completo de solicitação de adesão ao clube:
   - Nome completo, E-mail profissional, Telefone/WhatsApp.
   - Empresa, Cargo executivo, Cidade e Estado.
   - Criação de senha segura.
   - Código de convite / indicação opcional (`referralCode`).
3. **`/forgot-password`**: Formulário para inserção do e-mail de cadastro para envio de token/link seguro de redefinição.
4. **`/reset-password`**: Formulário para definição de nova senha com validação de força e confirmação de senha.

---

## 🛠️ Validações & Regras de Formulário (Zod & React Hook Form)

- **Validação de Senha**: Mínimo de 8 caracteres, contendo pelo menos uma letra maiúscula, um número e um caractere especial.
- **Validação de E-mail**: E-mail válido e sanitizado.
- **Código de Indicação**: Se informado, o backend deve vincular o novo associado ao membro que o convidou para creditar bônus de indicação e XP.

---

## 📡 Endpoints de Backend Requeridos

1. `POST /api/v1/auth/sign-in`: Login com retorno de token JWT e perfil do usuário.
2. `POST /api/v1/auth/sign-up`: Cadastro com criação de conta pendente de aprovação ou ativação direta.
3. `POST /api/v1/auth/forgot-password`: Disparo de e-mail transacional (SendGrid / Resend / AWS SES) com token seguro.
4. `POST /api/v1/auth/reset-password`: Validação do token de recuperação e gravação do novo hash de senha.
5. `POST /api/v1/auth/refresh-token`: Renovação do token JWT expirado.
6. `POST /api/v1/auth/logout`: Invalidação de sessão / revogação do refresh token.
