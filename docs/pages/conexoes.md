# Módulo: Conexões & Networking (`/conexoes`)

Este módulo é o coração social e profissional do ClubKey, permitindo a descoberta de associados, envio de solicitações de networking, visualização de perfis aprofundados e troca de mensagens diretas via chat integrado.

---

## 🗺️ Rotas do Módulo

1. **`/conexoes`**: Diretório completo de membros com busca inteligente por nome, cargo, empresa e tags cruzadas de *O que Busco* (`seeking`) e *O que Ofereço* (`offering`).
2. **`/conexoes/[id]/[slug]`**: Perfil público detalhado do associado (foto, cargo, empresa, bio, tags, links de redes sociais, histórico de eventos participados e conquistas/insígnias desbloqueadas).
3. **`/conexoes/minhas-conexoes`**: Painel de gerenciamento das conexões ativas do associado, solicitações de conexão recebidas (para aceitar ou recusar) e convites enviados.

---

## 💬 Chat / Mensageiro Flutuante (`MemberMessengerWidget`)

Presente em todo o portal no canto inferior direito:
- Permite abrir uma janela de bate-papo rápida com qualquer associado conectado.
- Suporta minimização, expansão, envio de mensagens e histórico de conversas.
- Notificações de mensagens não lidas.

---

## 🛠️ Regras de Negócio & Interações

- **Ciclo de Vida de uma Conexão**:
  1. `none`: Membro não conectado $\rightarrow$ Exibe botão "Conectar".
  2. `pending`: Solicitação enviada $\rightarrow$ Exibe botão "Pendente / Cancelar Convite".
  3. `received`: Solicitação recebida $\rightarrow$ Exibe botões "Aceitar" ou "Recusar".
  4. `connected`: Membros conectados $\rightarrow$ Exibe status "Conectado", atalho para abrir o Chat direto e opção de remover conexão.
- **Visualização de Insígnias**:
  - No perfil público do membro, o bloco *Insígnias Desbloqueadas* exibe todas as conquistas do sistema em grid; as conquistas bloqueadas ficam em tom atenuado com cadeado, e as desbloqueadas revelam detalhes e data de conquista via tooltip no desktop e modal no mobile.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/members`: Busca e listagem de associados com filtros (`search`, `seeking`, `offering`, `clubId`, `page`, `limit`).
2. `GET /api/v1/members/:id`: Perfil público completo do membro.
3. `GET /api/v1/connections/my-connections`: Conexões ativas e solicitações recebidas/enviadas.
4. `POST /api/v1/connections/:memberId/request`: Enviar pedido de conexão.
5. `PATCH /api/v1/connections/:memberId/accept`: Aceitar pedido de conexão.
6. `DELETE /api/v1/connections/:memberId`: Recusar pedido, cancelar envio ou desfazer conexão.
7. `GET /api/v1/chat/conversations`: Listagem de conversas ativas.
8. `GET /api/v1/chat/:memberId/messages`: Histórico de mensagens com o associado.
9. `POST /api/v1/chat/messages`: Envio de nova mensagem de chat.
10. `PATCH /api/v1/chat/:memberId/read`: Marcar mensagens como lidas.
