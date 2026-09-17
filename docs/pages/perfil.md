# Módulo: Perfil do Membro & Assinatura (`/perfil`)

Este módulo permite ao associado gerenciar suas informações públicas de negócios, configurações de privacidade, segurança em dois fatores e detalhes de sua assinatura do clube.

---

## 🗺️ Rotas do Módulo

1. **`/perfil`**: Visão e edição do perfil do associado logado:
   - Informações pessoais e profissionais (Nome, Cargo, Empresa, Cidade, Bio).
   - Tags de Networking dinâmicas: *O que Busco* (`seeking`) e *O que Ofereço* (`offering`).
   - Links de contato e redes sociais (Telefone, LinkedIn, Instagram).
   - Configurações de Privacidade (Visibilidade do perfil, recebimento de mensagens, status online).
   - Segurança da Conta (Ativação e desativação de Autenticação em Dois Fatores - 2FA).
2. **`/perfil/minha-assinatura`**: Painel financeiro de membro:
   - Tipo de plano (ex: *Membro Fundador Anual*).
   - Valor e periodicidade de cobrança (ex: `R$ 1.890 / mês`).
   - Próxima data de renovação e status da assinatura (`"active"`).
   - Cartão de crédito cadastrado (Bandeira, últimos 4 dígitos e validade).
   - Histórico de faturas e comprovantes de pagamento.

---

## 🛠️ Regras de Negócio & Interações

- **Edição em Tempo Real**:
  - Formulário com validação onde o usuário pode adicionar/remover tags de busca e oferta.
  - Ao salvar, envia um `PUT /api/v1/profile` e atualiza o estado global.
- **Autenticação em Dois Fatores (2FA)**:
  - Toggle que dispara modal de confirmação para habilitar/desabilitar 2FA com feedback imediato via toast.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/profile`: Retorna todos os dados de perfil e preferências do usuário logado.
2. `PUT /api/v1/profile`: Salva as alterações de perfil e tags de networking.
3. `POST /api/v1/profile/avatar`: Upload de nova foto de perfil (Multipart Form / S3 / Cloudinary).
4. `POST /api/v1/profile/cover`: Upload de banner de capa.
5. `POST /api/v1/profile/2fa/toggle`: Alternar status do 2FA.
6. `GET /api/v1/profile/subscription`: Retorna os dados da assinatura e dados do cartão.
7. `GET /api/v1/profile/invoices`: Lista de faturas anteriores e links de PDF para download.
