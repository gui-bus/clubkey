# Módulo: Benefícios & Parcerias (`/beneficios`)

Este módulo apresenta as parcerias estratégicas do ClubKey com marcas de luxo, restaurantes estrelados, aviação executiva, hotéis de alto padrão e serviços de concierge.

---

## 🗺️ Rotas do Módulo

1. **`/beneficios`**: Galeria de benefícios dividida por categorias (`"gastronomy"`, `"mobility"`, `"lifestyle"`, `"wellness"`), com busca e visualização de cupons/regras.

---

## 🛠️ Regras de Negócio & Interações

- **Resgate de Benefício**:
  - Modal com apresentação do código promocional exclusivo (`couponCode`), botão de cópia de cupom para a área de transferência (`Copy`), instrução de uso e link direto para o site ou concierge do parceiro.
  - Exibição da data de validade e condições especiais.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/benefits`: Lista de parceiros e benefícios com filtros de categoria e busca.
2. `GET /api/v1/benefits/:id`: Detalhes específicos de um benefício parceiro.
3. `POST /api/v1/benefits/:id/claim`: Registro opcional de resgate pelo membro para métricas de conversão dos parceiros.
