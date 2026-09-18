# Especificação de Módulo: Central de Notificações (`NotificationsDropdown`)

A **Central de Notificações** é o componente global presente no cabeçalho (*Header*) de todas as páginas do portal do ClubKey. Ela consolida em tempo real todas as interações sociais, convites de networking pendentes, mensagens não lidas de chat e avisos do ecossistema.

---

## 🗺️ Localização & Escopo

- **Componente**: `src/components/portal/NotificationsDropdown.tsx`
- **Exibição**: Barra de navegação superior global (`Header.tsx`), ao lado do perfil e do switch de tema.
- **Acesso**: Privado (requer autenticação JWT).

---

## 🖥️ Arquitetura Visual & Componentes do Dropdown

O menu de notificações é ativado pelo ícone de sino (`Bell`) e possui as seguintes seções integradas:

1. **Gatilho de Sino & Badge de Contagem (`NotificationTrigger`)**:
   - Ícone Phosphor `Bell` com efeito hover.
   - Badge flutuante circular vermelho com a quantidade total de notificações pendentes (`totalCount = pendingInvitesCount + unreadMessagesCount + systemNotificationsCount`).
   - Caso `totalCount === 0`, o sino não exibe o badge vermelho.
2. **Cabeçalho do Dropdown**:
   - Título `"Notificações"`.
   - Contador visual (ex: `"3 novas"`).
   - Botão de ação rápida *"Marcar todas como lidas"*.
3. **Seção: Solicitações de Conexão Pendentes (`receivedPendingInvites`)**:
   - Para cada solicitação de networking recebida:
     - Avatar do membro remetente com fallback de iniciais.
     - Nome completo (`firstName` + `lastName`), cargo executivo e empresa.
     - Botão *"Aceitar"* (verde): Aceita a conexão, credita +50 XP imediatamente com feedback via Toast e remove o item da lista de pendências.
     - Botão *"Recusar"* (cinza/vermelho): Recusa o convite e remove da lista.
4. **Seção: Mensagens de Chat Não Lidas (`unreadMessageThreads`)**:
   - Para cada conversa ativa com mensagens pendentes:
     - Avatar do associado e indicador de status.
     - Nome e empresa.
     - Trecho da última mensagem (`lastMessage.text`).
     - Horário relativo do envio (ex: `"há 5 min"`, `"14:30"`).
     - Badge numérico de mensagens não lidas naquele chat.
     - Ao clicar: Fecha o dropdown e abre diretamente o chat com o membro no mensageiro flutuante (`openChat(memberId)`).
5. **Seção: Notificações do Sistema & Atividades**:
   - Alertas sobre confirmação de reservas em hospedagens, lembretes de eventos de hoje/amanhã, liberação de Drops Semanais do KeyPass e resgates de missões.
6. **Estado Vazio (Empty State)**:
   - Ilustração/ícone suave com mensagem: `"Tudo limpo! Você não possui notificações pendentes."`

---

## 📊 Interfaces TypeScript Consumidas

```typescript
export interface NotificationItem {
  id: string | number
  type: "connection_request" | "chat_message" | "event_reminder" | "stay_update" | "keypass_drop" | "system"
  title: string
  message: string
  actionUrl?: string
  isRead: boolean
  createdAt: string
  sender?: {
    id: number
    firstName: string
    lastName: string
    avatar: string
    role: string
    company: string
  }
  metadata?: {
    memberId?: number
    eventId?: number
    stayId?: string
    dropId?: string
    unreadCount?: number
  }
}

export interface NotificationsSummaryResponse {
  totalUnread: number
  pendingInvitesCount: number
  unreadMessagesCount: number
  notifications: NotificationItem[]
}
```

---

## 📡 Especificação Completa dos Endpoints de API

### 1. `GET /api/v1/notifications/summary`
Retorna o resumo para alimentar o contador do sino e a listagem inicial do dropdown.
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response (200 OK)**:
```json
{
  "totalUnread": 3,
  "pendingInvitesCount": 1,
  "unreadMessagesCount": 2,
  "notifications": [
    {
      "id": "notif-001",
      "type": "connection_request",
      "title": "Solicitação de Conexão",
      "message": "Carlos Eduardo enviou uma solicitação de networking para você.",
      "isRead": false,
      "createdAt": "2026-09-17T15:30:00Z",
      "sender": {
        "id": 4,
        "firstName": "Carlos",
        "lastName": "Eduardo",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "role": "Managing Partner",
        "company": "Prado Agro Global"
      },
      "metadata": {
        "memberId": 4
      }
    },
    {
      "id": "notif-002",
      "type": "chat_message",
      "title": "Nova Mensagem",
      "message": "Fernanda Camargo: Olá Rodrigo, vamos agendar o almoço na próxima semana?",
      "isRead": false,
      "createdAt": "2026-09-17T16:15:00Z",
      "sender": {
        "id": 2,
        "firstName": "Fernanda",
        "lastName": "Camargo",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
        "role": "Chief Investment Officer",
        "company": "Atlas Asset Management"
      },
      "metadata": {
        "memberId": 2,
        "unreadCount": 2
      }
    },
    {
      "id": "notif-003",
      "type": "event_reminder",
      "title": "Lembrete de Evento",
      "message": "O Private Dinner: Macroeconomia acontece em 24 de Outubro às 19:30.",
      "actionUrl": "/eventos/1/private-dinner-macroeconomia",
      "isRead": true,
      "createdAt": "2026-09-17T10:00:00Z",
      "metadata": {
        "eventId": 1
      }
    }
  ]
}
```

### 2. `PATCH /api/v1/notifications/:id/read`
Marca uma notificação individual como lida.
- **Path Params**: `id` (identificador da notificação).
- **Response (200 OK)**:
```json
{
  "id": "notif-001",
  "isRead": true
}
```

### 3. `POST /api/v1/notifications/read-all`
Marca todas as notificações pendentes do usuário como lidas de uma só vez.
- **Response (200 OK)**:
```json
{
  "success": true,
  "markedCount": 3
}
```

---

## ⚡ Interações & Comportamento do Usuário

1. **Ações Rápidas de Convite**:
   - Clicar em *"Aceitar"* dispara `PATCH /api/v1/connections/:memberId/accept`, credita +50 XP ao usuário e exibe Toast Sonner: `"Conexão aceita com {nome}! +50 XP"`.
   - Clicar em *"Recusar"* dispara `DELETE /api/v1/connections/:memberId` e remove o item com feedback `"Convite recusado."`.
2. **Clique na Notificação de Mensagem**:
   - Fecha o dropdown, abre a janela de chat (`MemberMessengerWidget`) com a conversa do remetente selecionada e dispara a marcação de leitura.
3. **Hover & Fechamento Suave**:
   - O menu suporta abertura por hover com tolerância de 80ms no mouseLeave para navegação fluida sem fechar acidentalmente.

---

## 🛡️ Regras de Negócio & Casos de Borda

1. **Sincronização em Tempo Real**:
   - Pode ser atualizado via polling a cada 30 segundos ou evento Server-Sent Events (SSE) / WebSocket.
2. **Contador no Sino**:
   - Deve refletir a soma exata de convites pendentes recebidos + conversas com mensagens não lidas + notificações de sistema não lidas.
