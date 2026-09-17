# Módulo: Experiências (`/experiencias`)

Este módulo gerencia as experiências gastronômicas de alta culinária, degustações de vinhos raros, passeios e vivências exclusivas organizadas para os membros.

---

## 🗺️ Rotas do Módulo

1. **`/experiencias`**: Catálogo de experiências com filtros de categoria (`"gastronomy"`, `"wine"`, `"lifestyle"`, `"art"`), ordenação e busca.
2. **`/experiencias/[id]/[slug]`**: Página de apresentação com galeria, chef/sommelier responsável, detalhes do menu/itinerário, cota por pessoa e botão de compra.
3. **`/experiencias/[id]/[slug]/checkout`**: Fluxo de pagamento com seleção de vagas, método de pagamento (PIX ou Cartão de Crédito), aplicação de desconto com Tokens RIB e confirmação imediata.
4. **`/experiencias/[id]/[slug]/quem-vai`**: Lista de associados que já garantiram suas cotas para a experiência.

---

## 🛠️ Regras de Negócio & Interações

- **Checkout de Experiência**:
  - Permite selecionar a quantidade de convidados/cotas.
  - Opção de abater parte do valor financeiro utilizando o saldo de **Tokens RIB** acumulados pelo associado.
  - Ao finalizar com sucesso, emite comprovante com QR Code e credita XP de participação na conta do membro.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/experiences`: Listagem de experiências ativas.
2. `GET /api/v1/experiences/:id`: Dados completos da experiência.
3. `GET /api/v1/experiences/:id/attendees`: Lista de compradores/participantes.
4. `POST /api/v1/experiences/:id/checkout`: Processamento do pagamento (Gateway de pagamento / PIX / Cartão) e criação do pedido.
