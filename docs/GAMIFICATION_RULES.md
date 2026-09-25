# Manual de Regras de Negócio & Algoritmos de Gamificação (KeyPass)

Este documento descreve detalhadamente o funcionamento dos motores de cálculo de **XP**, **Tiers de Associação**, **Tokens RIB**, **Marcos Intermediários**, **Drops Semanais** e **Retenção de Tiers** do ecossistema **ClubKey & White-Label**.

---

## 1. 🌟 Os Pilares do Sistema KeyPass

O KeyPass é estruturado em 3 moedas/patrimônios do membro:
1. **XP (Experience Points)**: Pontos de experiência acumulativos que determinam a posição no ranking e a qualificação para os Tiers. **O saldo total de XP nunca é zerado**.
2. **Tiers (Patamares)**: Níveis hierárquicos institucionais (do Tier 01 Membro ao Tier 06 Patrono) que destravam descontos progressivos em estadias (até 35% OFF), atendimento prioritário, deal flow e acessos VIP.
3. **Tokens RIB**: Moeda premium de recompensa recebida ao subir de tier (+2 RIB), ao completar marcos (+0.5 RIB) ou via drops especiais. Pode ser utilizada para abater valores na compra de experiências ou estadias.

---

## 🛡️ Desacoplamento Modular & White-Label

Em tenants com a flag `modules.keypass: false` (como no **Viverde**):
- O motor de gamificação é **completamente desacoplado da interface visual**.
- Perfis de membros, cards no feed e diretório de conexões **não exibem pontuações de XP, insígnias de tier ou badges de KeyPass**.
- Ações de networking ou estadias continuam funcionando normalmente sem dependência obrigatória de pontuação.

---

## 2. 📊 Tabela Oficial de Ações & Concessão de XP

Sempre que um associado realizar uma ação qualificadora na plataforma, o backend deve criar um registro em `xpTransactions`, somar o XP em `users.xp` e disparar a verificação de subida de nível:

| Ação do Membro | Categoria | XP Concedido | Tokens RIB Bônus | Condição de Disparo |
| :--- | :--- | :--- | :--- | :--- |
| **Cadastro Inicial de Membro** | `onboarding` | `+250 XP` | `0` | Conclusão dos dados de perfil |
| **Ativação do 2FA (Dois Fatores)** | `onboarding` | `+250 XP` | `0` | Primeiro 2FA ativo (+ Insígnia *Blindagem Digital*) |
| **Conexão Bilateral Aceita** | `conexao` | `+50 XP` | `0` | Concedido a **ambos** os participantes |
| **RSVP em Evento Regular** | `evento` | `+200 XP` | `0` | Confirmação de presença em evento |
| **RSVP em Evento Especial/Mesa** | `evento` | `+350 XP` | `0` | Eventos com tag de destaque |
| **Reserva Concluída de Estadia** | `hospedagem`| `+300 XP` | `0` | Confirmação da reserva de acomodação |
| **Compra de Cota de Experiência** | `experiencia`| `+250 XP` | `0` | Checkout aprovado de experiência |
| **Resgate de Missão Cumprida** | `missao` | `+250 a +500 XP` | `0 a 1 RIB` | Conforme definido em `missions.xpReward` |
| **Resgate de Drop Semanal** | `bonus` | `+250 a +500 XP` | `0 a 1 RIB` | Conforme definido em `weeklyDrops.xpReward` |
| **Promoção de Tier (Level Up)** | `bonus` | `0` (XP de base) | `+2 RIB` | Disparado automaticamente ao subir de tier |
| **Desbloqueio de Marco (1 a 4)**| `bonus` | `0` | `+0.5 RIB` | Disparado ao resgatar o marco intermediário |

---

## 3. 🏛️ Progressão dos 6 Tiers Oficiais

```mermaid
flowchart LR
    M["01. Membro\n(0 - 499 XP)\n[Base Segura]"] --> A["02. Associado\n(500 - 1.999 XP)\n[Base Segura]"]
    A --> T["03. Titular\n(2.000 - 4.999 XP)\n[Janela 180 Dias]"]
    T --> I["04. Investidor\n(5.000 - 9.999 XP)\n[Janela 180 Dias]"]
    I --> INC["05. Incorporador\n(10.000 - 15.999 XP)\n[Janela 180 Dias]"]
    INC --> P["06. Patrono\n(16.000+ XP)\n[#1 Ranking Global]"]
```

### Detalhamento por Patamar:

1. **Tier 01 — Membro (`membro`)**: 0 a 499 XP. **Base Segura Protegida**. Acesso básico ao catálogo e eventos abertos.
2. **Tier 02 — Associado (`associado`)**: 500 a 1.999 XP. **Base Segura Protegida**. Tarifas com até 20% OFF em estadias, conexões diretas e +2 Tokens RIB.
3. **Tier 03 — Titular (`titular`)**: 2.000 a 4.999 XP. Janela de 180 dias. Tarifas com até 25% OFF, prioridade em experiências e jantares fechados.
4. **Tier 04 — Investidor (`investidor`)**: 5.000 a 9.999 XP. Janela de 180 dias. Tarifas com até 30% OFF, reuniões de deal flow e suporte VIP 24/7.
5. **Tier 05 — Incorporador (`incorporador`)**: 10.000 a 15.999 XP. Patamar máximo por pontuação. Tarifas com até 35% OFF e canal direto com fundadores.
6. **Tier 06 — Patrono (`patrono`)**: #1 no Ranking Geral Global (> 16.000 XP). Título supremo singular recalculado em tempo real.

---

## 4. 🔄 Algoritmo de Cálculo de Tier (`getTierByXp`)

```typescript
function calculateUserTier(params: {
  xp: number,
  isGlobalRankOne: boolean,
  isTierFrozen: boolean,
  claimedMilestones: Record<string, boolean>
}): TierId {
  // 1. Regra do Patrono: se for #1 do ranking global com >= 16.000 XP
  if (params.isGlobalRankOne && params.xp >= 16000) {
    return "patrono"
  }

  // 2. Regra de Congelamento por Inatividade: se inativo há > 180 dias e tiver tier Titular+
  if (params.isTierFrozen && params.xp >= 2000) {
    return "associado" // Opera temporariamente como associado até realizar 1 ação
  }

  // 3. Regra de Progressão Regular por XP e Marcos
  const checkMilestones = (tierId: string) => 
    [1, 2, 3, 4].every(idx => Boolean(params.claimedMilestones[`${tierId}_${idx}`]))

  if (params.xp >= 10000) {
    return checkMilestones("investidor") ? "incorporador" : "investidor"
  }
  if (params.xp >= 5000) {
    return checkMilestones("titular") ? "investidor" : "titular"
  }
  if (params.xp >= 2000) {
    return checkMilestones("associado") ? "titular" : "associado"
  }
  if (params.xp >= 500) {
    return checkMilestones("membro") ? "associado" : "membro"
  }
  return "membro"
}
```

---

## 5. 🎯 Sistema de Marcos Intermediários (Milestones)

- Cada Tier possui **4 marcos intermediários** (25%, 50%, 75% e 100% da faixa de XP).
- Cada marco resgatado concede **`+0.5 Token RIB`** diretamente na carteira do associado.
- Gravados no formato `"${tierId}_${milestoneIndex}"` (ex: `"membro_1"`, `"associado_3"`).

---

## 6. ⏱️ Regra de Retenção de 180 Dias & Descongelamento Imediato

1. **Base Vitalícia Protegida**: Os tiers **Membro (01)** e **Associado (02)** nunca sofrem rebaixamento ou congelamento.
2. **Ciclo de Manutenção (Titular, Investidor, Incorporador)**:
   - Exige ao menos **1 atividade qualificadora** a cada **180 dias**.
   - Se inativo > 180 dias, `isTierFrozen` torna-se `true` e o nível ativo opera como **Associado**.
3. **Descongelamento Instantâneo**: Qualquer nova ação restaura imediatamente o Tier pleno.
