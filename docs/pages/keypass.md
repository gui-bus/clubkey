# Módulo: KeyPass — Tiers & Recompensas (`/keypass`)

O **KeyPass** é o sistema de progressão executiva, reconhecimento de engajamento e bonificação do ClubKey.

> ⚠️ **Nota de Terminologia**: O termo técnico interno *"Gamificação"* **NUNCA** é exibido para o associado final na interface. No frontend, utilizamos os termos **"KeyPass"**, **"Tiers & Recompensas"**, **"Passe Executivo"**, **"Conquistas"** e **"Missões Qualificadoras"**.

---

## 🗺️ Rotas do Módulo

1. **`/keypass`**: Painel Geral do KeyPass (Tier atual com barra de progresso, marcos/milestones desbloqueáveis com recompensas, saldo de Tokens RIB, extrato recente de XP e atalhos rápidos).
2. **`/keypass/missoes`**: Central de Missões Qualificadoras divididas por categoria (`"networking"`, `"events"`, `"stays"`, `"profile"`, `"ranking"`), exibindo barra de progresso, premiação em XP/Tokens e botão para resgate imediato.
3. **`/keypass/ranking`**: Tabela de Classificação global de membros com filtros por período (*Geral / All-time*, *Mês Atual* e *Temporada Trimestral Q4*), card de destaque do Líder #1 e card comparativo com o associado logo acima na pontuação.
4. **`/keypass/regras`**: Manual e diretrizes de pontuação, explicando como acumular XP (presença em eventos, hospedagens, conexões, indicações) e como utilizar Tokens RIB.

---

## 🎖️ Estrutura de Tiers Executivos

| Nível | Tier | XP Mínimo | XP Máximo | Benefícios Principais |
| :--- | :--- | :--- | :--- | :--- |
| **I** | **Aspirante** | 0 XP | 999 XP | Acesso base ao portal e eventos abertos |
| **II** | **Membro** | 1.000 XP | 3.499 XP | Reserva antecipada de acomodações |
| **III** | **Fellow** | 3.500 XP | 7.999 XP | Descontos em cotas de experiências e 1 convite VIP |
| **IV** | **Chanceler** | 8.000 XP | 14.999 XP | Prioridade em jantares privados e 2 convites VIP |
| **V** | **Embaixador**| 15.000 XP | 29.999 XP | Acesso a lounges exclusivos e bonificação em RIB Tokens |
| **VI** | **Patrono** | 30.000+ XP | $\infty$ | Distinção máxima, comitê consultivo e cotas vitalícias |

---

## 🛠️ Regras de Negócio & Interações

- **Resgate de Missão**:
  - Quando `currentProgress >= totalRequired`, o botão "Resgatar" fica ativo.
  - Ao clicar, uma requisição `POST /keypass/missions/:id/claim` credita o XP e Tokens RIB, atualiza o status para `isClaimed: true` e emite um feedback toast de celebração.
- **Drops Semanais (`WeeklyDropCard`)**:
  - Recompensas liberadas periodicamente por ciclo de contagem regressiva.
- **Tabela de Classificação (`LeaderboardTable`)**:
  - Renderiza a lista de associados ordenados por XP no período selecionado, destacando visualmente o usuário logado com uma tag *"Você"*.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/keypass/me`: Dados completos de pontuação do associado (XP total, Tokens RIB, Tier atual, próximo Tier e marcos resgatados).
2. `GET /api/v1/keypass/missions`: Lista de todas as missões qualificadoras e progresso atual do usuário.
3. `POST /api/v1/keypass/missions/:id/claim`: Resgatar recompensa de uma missão concluída.
4. `GET /api/v1/keypass/badges`: Lista de conquistas/insígnias e datas de desbloqueio do associado.
5. `GET /api/v1/keypass/ranking?timeframe=all_time|monthly|quarterly`: Lista de associados ordenada por pontuação.
6. `GET /api/v1/keypass/weekly-drops`: Lista de drops e status de resgate.
7. `POST /api/v1/keypass/weekly-drops/:id/claim`: Resgatar drop semanal disponível.
8. `POST /api/v1/keypass/milestones/:tierId/:milestoneIndex/claim`: Resgate de benefício em marco intermediário de Tier.
