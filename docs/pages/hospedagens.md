# Módulo: Hospedagens & Acomodações (`/hospedagens`)

Este módulo gerencia o catálogo de suítes, acomodações privativas e villas do ClubKey, bem como as reservas e estadias do associado.

---

## 🗺️ Rotas do Módulo

1. **`/hospedagens`**: Catálogo completo de quartos e suítes disponíveis com filtros por tipo, capacidade, preço e clube.
2. **`/hospedagens/[id]/[slug]`**: Detalhes da acomodação (galeria de fotos, comodidades, regras da casa, preço da diária e formulário de reserva).
3. **`/hospedagens/minhas-hospedagens`**: Painel com a lista de reservas ativas e histórico de estadias passadas do associado.
4. **`/hospedagens/minhas-hospedagens/[id]/[slug]`**: Voucher de confirmação da reserva individual, código localizador (`confirmationCode`), QR Code de check-in e botão para cancelamento.

---

## 🛠️ Regras de Negócio & Interações

- **Filtro de Clube**: Ao alterar a cidade/clube no topo, as opções de acomodação devem ser filtradas para refletir a unidade selecionada.
- **Voucher de Confirmação**: O associado pode visualizar datas de Check-in, Check-out, número de hóspedes e código de confirmação.
- **Cancelamento**: O botão "Cancelar Reserva" exibe uma confirmação (`ConfirmActionDialog`) e envia uma requisição `DELETE` para o backend, alterando o status da estadia para cancelada.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/stays`: Lista de acomodações disponíveis com filtros de data, tipo e clube.
2. `GET /api/v1/stays/:id`: Dados completos e galeria da acomodação.
3. `POST /api/v1/stays/book`: Criação de uma nova reserva para o associado autenticado.
4. `GET /api/v1/stays/my-stays`: Lista de reservas do associado autenticado.
5. `GET /api/v1/stays/my-stays/:id`: Detalhes específicos de um voucher de reserva.
6. `DELETE /api/v1/stays/reservations/:id`: Cancelamento de reserva com estorno de cotas/reembolso.
