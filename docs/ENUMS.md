# Dicionário Central de Enums & Constantes (Enums & Constants)

Este documento centraliza todos os tipos enumerados (`Enums`), identificadores de domínio e constantes aceitas no ecossistema **ClubKey**.

> [!IMPORTANT]
> Todos os valores de Enums na API RESTful e no banco de dados devem seguir estritamente a convenção **em inglês** e em **`lowercase`** ou **`snake_case`**, garantindo uniformidade entre Backend (PHP/Laravel/PostgreSQL) e Frontend (TypeScript/React Query/Orval).

---

## 1. 🏆 Gamificação & KeyPass

### `TierId`
Identificadores únicos dos 6 patamares executivos de membros:
```typescript
type TierId = 
  | "membro"        // Tier 01: Entrada (0 - 499 XP) [Base Protegida]
  | "associado"     // Tier 02: Membro Verificado (500 - 1.999 XP) [Base Protegida]
  | "titular"       // Tier 03: Engajamento & Influência (2.000 - 4.999 XP)
  | "investidor"    // Tier 04: Liderança & Deal Flow (5.000 - 9.999 XP)
  | "incorporador"  // Tier 05: Patamar Máximo por Pontuação (10.000 - 15.999 XP)
  | "patrono"       // Tier 06: #1 do Ranking Global Singular (> 16.000 XP)
```

### `BadgeColor`
Variantes de cor semânticas para os badges de UI (Design Tokens Bloom UI):
```typescript
type BadgeColor = 
  | "default"    // Neutro / Zinco (Membro)
  | "primary"    // Azul (Associado)
  | "success"    // Esmeralda / Verde (Titular)
  | "warning"    // Âmbar / Laranja (Investidor)
  | "accent"     // Rosa / Magenta (Incorporador)
  | "danger"     // Vermelho / Laranja Vivo (Patrono)
```

### `MissionCategory` & `WeeklyDropCategory`
Categorias de missões e drops semanais:
```typescript
type MissionCategory = 
  | "onboarding"    // Boas-vindas, 2FA, preenchimento de perfil
  | "estadias"      // Reservas de hospedagens no catálogo
  | "eventos"       // Confirmação de presença e participação em encontros
  | "experiencias"  // Aquisição de vivências gastronômicas e roteiros
  | "networking"    // Conexões estabelecidas entre membros
  | "ranking"       // Metas de posicionamento na tabela global
```

### `BadgeCategory`
```typescript
type BadgeCategory = 
  | "onboarding"
  | "estadias"
  | "eventos"
  | "experiencias"
  | "networking"
  | "ranking"
  | "especial"
```

### `XpTransactionCategory`
Tipos de movimentação no extrato histórico de XP:
```typescript
type XpTransactionCategory = 
  | "onboarding"    // Atividades cadastrais e segurança
  | "hospedagem"    // Conclusão de estadias
  | "evento"        // Participação em encontros presenciais
  | "experiencia"   // Participação em vivências
  | "conexao"       // Conexão bilateral aceita (+50 XP)
  | "missao"        // Resgate de recompensas de missões
  | "bonus"         // Subida de tier (+2 RIB), drops ou marcos (+0.5 RIB)
```

### `LeaderboardTimeframe`
Janelas temporais de filtro no ranking geral:
```typescript
type LeaderboardTimeframe = 
  | "all_time"      // Histórico total acumulado
  | "monthly"       // Pontuação obtida no mês vigente
  | "quarterly"     // Pontuação obtida no trimestre
```

---

## 2. 🏨 Hospedagens & Reservas

### `StayReservationStatus`
Status do ciclo de vida de uma reserva de hospedagem:
```typescript
type StayReservationStatus = 
  | "confirmed"     // Reserva confirmada e voucher ativo
  | "pending"       // Aguardando confirmação da equipe / parceiro
  | "completed"     // Estadia concluída com sucesso
  | "cancelled"     // Reserva cancelada
```

### `RoomType`
```typescript
type RoomType = 
  | "master_suite"
  | "presidential_suite"
  | "executive_room"
  | "villa"
  | "bungalow"
  | "chalet"
```

---

## 3. 📅 Eventos & Inscrições

### `EventCategory`
```typescript
type EventCategory = 
  | "networking"    // Jantares, almoços de negócios, rodadas
  | "keynote"       // Painéis, palestras magnas e apresentações
  | "exclusive"     // Encontros fechados para tiers superiores
  | "gastronomy"    // Harmonizações e encontros em alta gastronomia
```

### `EventAttendeeStatus`
```typescript
type EventAttendeeStatus = 
  | "confirmed"     // Presença confirmada no evento
  | "waitlist"      // Lista de espera
  | "attended"      // Presença validada presencialmente (check-in)
  | "cancelled"     // RSVP cancelado pelo membro
```

---

## 4. 🍷 Experiências & Checkout

### `ExperienceCategory`
```typescript
type ExperienceCategory = 
  | "wine"          // Degustações raras, visitas a vinícolas e enologia
  | "gastronomy"    // Jantares autorais e masterclasses com chefs
  | "lifestyle"     // Regatas, passeios de helicóptero, polo
  | "art"           // Vernissages privadas e colecionismo
```

### `ExperienceBookingStatus`
```typescript
type ExperienceBookingStatus = 
  | "confirmed"     // Cota paga e vaga garantida
  | "pending"       // Aguardando liquidação de PIX / Boleto
  | "cancelled"     // Cancelada ou estornada
```

---

## 5. 🤝 Conexões, Mensageria & Notificações

### `ConnectionStatus`
Estado da relação entre dois membros:
```typescript
type ConnectionStatus = 
  | "none"          // Sem vínculo
  | "pending"       // Solicitação enviada aguardando aprovação
  | "received"      // Solicitação recebida aguardando decisão
  | "connected"     // Conexão bilateral ativa (permite chat)
  | "declined"      // Convite recusado
  | "blocked"       // Usuário bloqueado
```

### `NotificationType`
```typescript
type NotificationType = 
  | "connection_request"  // Novo convite de networking recebido
  | "chat_message"        // Nova mensagem direta não lida
  | "event_reminder"      // Lembrete de evento próximo
  | "stay_update"         // Atualização de status da estadia
  | "keypass_drop"        // Novo drop semanal liberado
  | "system"              // Comunicado institucional do clube
```

---

## 6. 💳 Assinaturas & Financeiro

### `PaymentMethod`
```typescript
type PaymentMethod = 
  | "credit_card"   // Cartão de crédito
  | "pix"           // Pagamento instantâneo via PIX
  | "rib_tokens"    // Resgate / Desconto com saldo de Tokens RIB
```

### `SubscriptionStatus`
```typescript
type SubscriptionStatus = 
  | "active"        // Assinatura vigente e adimplente
  | "past_due"      // Falha na cobrança / aguardando retentativa
  | "canceled"      // Assinatura cancelada
  | "trialing"      // Período de cortesia institucional
```

### `BillingCycle`
```typescript
type BillingCycle = 
  | "monthly"       // Cobrança mensal recorrente
  | "annual"        // Cobrança anual recorrente
```

### `InvoiceStatus`
```typescript
type InvoiceStatus = 
  | "paid"          // Fatura liquidada com recibo disponível
  | "pending"       // Aguardando processamento
  | "failed"        // Cobrança recusada pela operadora
  | "refunded"      // Estorno total ou parcial
```

---

## 7. 🎁 Benefícios & Parcerias

### `BenefitCategory`
```typescript
type BenefitCategory = 
  | "gastronomy"    // Restaurantes, adegas e bistrôs
  | "mobility"      // Aluguel de veículos premium, aviação privada
  | "lifestyle"     // Moda de luxo, joalherias, clubes esportivos
  | "wellness"      // Spas, clínicas de longevidade e resorts
```

### `BenefitRedemptionType`
```typescript
type BenefitRedemptionType = 
  | "coupon"        // Código promocional copiável
  | "qr_code"       // QR Code para leitura presencial
  | "direct_show"   // Apresentação da credencial digital de membro
```

---

## 8. 👤 Usuários & Cadastro

### `Nationality`
```typescript
type Nationality = 
  | "brasileiro"
  | "estrangeiro"
```
