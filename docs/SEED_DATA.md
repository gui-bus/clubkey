# Dados Iniciais para o Banco de Dados (Seed Data)

Este documento contém os conjuntos de dados essenciais (`Seed Data`) para popular o banco de dados inicial do **ClubKey** (ex: via `php artisan db:seed` no Laravel).

---

## 1. 🏛️ Tabela `tiers` (6 Patamares Oficiais)

```json
[
  {
    "id": "membro",
    "orderIndex": 1,
    "name": "Membro",
    "subtitle": "Boas-vindas ao ecossistema",
    "minXp": 0,
    "maxXp": 499,
    "image": "/utils/gamification/tiers/01_membro.webp",
    "color": "#8E8E93",
    "badgeColor": "default",
    "isProtectedBase": true,
    "isSpecialPinnacle": false,
    "description": "Tier de entrada vitalício e protegido. Complete seu cadastro e ative o 2FA para subir para Associado.",
    "perks": [
      "Acesso ao catálogo de hospedagens parceiras",
      "Visualização de eventos abertos",
      "Diretório básico de membros"
    ]
  },
  {
    "id": "associado",
    "orderIndex": 2,
    "name": "Associado",
    "subtitle": "Membro verificado e protegido",
    "minXp": 500,
    "maxXp": 1999,
    "image": "/utils/gamification/tiers/02_associado.webp",
    "color": "#3B82F6",
    "badgeColor": "primary",
    "isProtectedBase": true,
    "isSpecialPinnacle": false,
    "description": "Base segura de membro ativo. Tier vitalício e protegido: não há rebaixamento a partir deste patamar.",
    "perks": [
      "Tarifas exclusivas com até 20% OFF em estadias",
      "Confirmação de presença em eventos regulares",
      "Conexões diretas com outros membros",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "titular",
    "orderIndex": 3,
    "name": "Titular",
    "subtitle": "Engajamento recorrente e influência",
    "minXp": 2000,
    "maxXp": 4999,
    "image": "/utils/gamification/tiers/03_titular.webp",
    "color": "#10B981",
    "badgeColor": "success",
    "isProtectedBase": false,
    "isSpecialPinnacle": false,
    "description": "Tier intermediário para membros ativos em eventos, viagens e conexões estratégicas.",
    "perks": [
      "Tarifas exclusivas com até 25% OFF em estadias",
      "Prioridade na lista de espera de experiências",
      "Acesso a jantares fechados e rodadas setoriais",
      "Atendimento exclusivo para reservas prioritárias",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "investidor",
    "orderIndex": 4,
    "name": "Investidor",
    "subtitle": "Alta circulação e liderança",
    "minXp": 5000,
    "maxXp": 9999,
    "image": "/utils/gamification/tiers/04_investidor.webp",
    "color": "#F59E0B",
    "badgeColor": "warning",
    "isProtectedBase": false,
    "isSpecialPinnacle": false,
    "description": "Destaque sênior na comunidade com acesso prioritário a deal flow e comitês de investimento.",
    "perks": [
      "Tarifas exclusivas com até 30% OFF em estadias",
      "Acesso a reuniões de deal flow e co-investimento",
      "Suporte VIP dedicado 24/7",
      "Convites para experiências internacionais",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "incorporador",
    "orderIndex": 5,
    "name": "Incorporador",
    "subtitle": "Patamar máximo por pontuação",
    "minXp": 10000,
    "maxXp": 15999,
    "image": "/utils/gamification/tiers/05_incorporador.webp",
    "color": "#EC4899",
    "badgeColor": "accent",
    "isProtectedBase": false,
    "isSpecialPinnacle": false,
    "description": "O mais alto tier regular da plataforma por pontuação contínua e contribuição estratégica.",
    "perks": [
      "Tarifas com desconto máximo de até 35% OFF",
      "Acesso total a todas as experiências e regatas",
      "Canal direto com fundadores do ClubKey",
      "Mesa cativa nos encontros institucionais anuais",
      "2 Tokens RIB ao subir de tier"
    ]
  },
  {
    "id": "patrono",
    "orderIndex": 6,
    "name": "Patrono",
    "subtitle": "Posição #1 no Ranking Geral Global (> 16.000 XP)",
    "minXp": 16000,
    "maxXp": null,
    "image": "/utils/gamification/tiers/06_patrono.webp",
    "color": "#E85535",
    "badgeColor": "danger",
    "isProtectedBase": false,
    "isSpecialPinnacle": true,
    "description": "Título supremo e singular concedido exclusivamente ao membro com a maior pontuação de XP global (acima de 16.000 XP).",
    "perks": [
      "Insígnia dourada suprema em todo o ecossistema",
      "Destaque comemorativo fixo no hall do Patrono",
      "Cota especial de 5 Tokens RIB bônus por trimestre",
      "Acesso irrestrito a todas as cotas e propriedades VIP"
    ]
  }
]
```

---

## 2. 🎖️ Tabela `badges` (Insígnias Oficiais)

```json
[
  {
    "id": "badge_early_adopter",
    "name": "Membro Fundador",
    "description": "Ingressou no Clube na temporada inaugural de 2026 com passe VIP vitalício.",
    "iconName": "ShieldStar",
    "category": "especial",
    "xpBonus": 500,
    "tokensBonus": 1,
    "maxProgress": 1
  },
  {
    "id": "badge_blindagem_digital",
    "name": "Blindagem Digital",
    "description": "Ativou autenticação em dois fatores (2FA) protegendo sua credencial de membro.",
    "iconName": "ShieldCheck",
    "category": "onboarding",
    "xpBonus": 250,
    "tokensBonus": 0,
    "maxProgress": 1
  },
  {
    "id": "badge_pioneiro_estadias",
    "name": "Pioneiro das Estadias",
    "description": "Realizou e concluiu as primeiras reservas de acomodações no catálogo ClubKey.",
    "iconName": "Buildings",
    "category": "estadias",
    "xpBonus": 300,
    "tokensBonus": 0,
    "maxProgress": 2
  },
  {
    "id": "badge_globe_trotter",
    "name": "Globe Trotter",
    "description": "Hospede-se em 3 destinos diferentes para desbloquear a insígnia de viajante global.",
    "iconName": "Compass",
    "category": "estadias",
    "xpBonus": 600,
    "tokensBonus": 1,
    "maxProgress": 3
  },
  {
    "id": "badge_sommelier_clube",
    "name": "Sommelier do Clube",
    "description": "Participe de 2 degustações guiadas ou experiências exclusivas de enologia.",
    "iconName": "Wine",
    "category": "experiencias",
    "xpBonus": 400,
    "tokensBonus": 0,
    "maxProgress": 2
  },
  {
    "id": "badge_super_conector",
    "name": "Super Conector",
    "description": "Estabeleça 10 conexões diretas na rede executiva de membros.",
    "iconName": "UsersThree",
    "category": "networking",
    "xpBonus": 750,
    "tokensBonus": 1,
    "maxProgress": 10
  },
  {
    "id": "badge_presenca_vip",
    "name": "Presença VIP",
    "description": "Confirme presença em 5 encontros presenciais, jantares ou fóruns do clube.",
    "iconName": "Sparkle",
    "category": "eventos",
    "xpBonus": 500,
    "tokensBonus": 0,
    "maxProgress": 5
  },
  {
    "id": "badge_top_ranking",
    "name": "Aspirante ao Top 5",
    "description": "Alcance o seleto Top 5 do ranking geral global de associados.",
    "iconName": "Crown",
    "category": "ranking",
    "xpBonus": 1200,
    "tokensBonus": 2,
    "maxProgress": 1
  }
]
```

---

## 3. 🎯 Tabela `missions` (Missões Iniciais)

```json
[
  {
    "id": "profile_completion",
    "title": "Primeiro Passo",
    "description": "Complete todos os dados cadastrais do seu perfil profissional.",
    "category": "onboarding",
    "xpReward": 250,
    "tokensReward": 0,
    "totalRequired": 1,
    "actionUrl": "/perfil",
    "actionLabel": "Ver Perfil"
  },
  {
    "id": "two_factor_auth",
    "title": "Blindagem Digital",
    "description": "Ative a autenticação de dois fatores (2FA) para proteger sua conta.",
    "category": "onboarding",
    "xpReward": 250,
    "tokensReward": 0,
    "totalRequired": 1,
    "actionUrl": "/perfil",
    "actionLabel": "Configurar 2FA"
  },
  {
    "id": "first_stay",
    "title": "Pioneiro das Estadias",
    "description": "Faça sua primeira reserva de hospedagem exclusiva no portal.",
    "category": "estadias",
    "xpReward": 300,
    "tokensReward": 0,
    "totalRequired": 1,
    "actionUrl": "/hospedagens",
    "actionLabel": "Explorar Hospedagens"
  },
  {
    "id": "events_attendee",
    "title": "Habitué dos Encontros",
    "description": "Confirme presença em pelo menos 3 eventos fechados do clube.",
    "category": "eventos",
    "xpReward": 400,
    "tokensReward": 0,
    "totalRequired": 3,
    "actionUrl": "/eventos",
    "actionLabel": "Ver Agenda"
  },
  {
    "id": "experiences_collector",
    "title": "Colecionador de Experiências",
    "description": "Adquira ou participe de 2 experiências e roteiros exclusivos.",
    "category": "experiencias",
    "xpReward": 500,
    "tokensReward": 0,
    "totalRequired": 2,
    "actionUrl": "/experiencias",
    "actionLabel": "Ver Experiências"
  },
  {
    "id": "connections_5",
    "title": "Networking Starter",
    "description": "Estabeleça conexão bilateral com 5 membros do clube.",
    "category": "networking",
    "xpReward": 250,
    "tokensReward": 0,
    "totalRequired": 5,
    "actionUrl": "/conexoes",
    "actionLabel": "Conectar Membros"
  },
  {
    "id": "connections_10",
    "title": "Conector de Elite",
    "description": "Alcance a marca de 10 conexões diretas na comunidade.",
    "category": "networking",
    "xpReward": 500,
    "tokensReward": 0,
    "totalRequired": 10,
    "actionUrl": "/conexoes",
    "actionLabel": "Conectar Membros"
  }
]
```

---

## 4. 🎁 Tabela `weeklyDrops` (Drops Semanais de Exemplo)

```json
[
  {
    "id": "drop_founders_coffee",
    "title": "Café com Fundadores",
    "description": "Inicie uma conversa no Messenger com 2 membros que são Founders, Sócios ou C-Level.",
    "category": "networking",
    "xpReward": 250,
    "tokensReward": 0,
    "totalRequired": 2,
    "actionUrl": "/conexoes",
    "actionLabel": "Conectar Membros",
    "expiresAt": "2026-09-24T23:59:59Z"
  },
  {
    "id": "drop_weekend_stay",
    "title": "Escapada de Primavera",
    "description": "Faça uma reserva de hospedagem no catálogo para estadias com tarifa exclusiva de membro.",
    "category": "estadias",
    "xpReward": 500,
    "tokensReward": 1,
    "totalRequired": 1,
    "actionUrl": "/hospedagens",
    "actionLabel": "Ver Acomodações",
    "expiresAt": "2026-09-24T23:59:59Z"
  },
  {
    "id": "drop_rsvp_summit",
    "title": "Vaga VIP no Painel Global",
    "description": "Garanta seu assento presencial no Painel Estratégico de Atração de Capital Global.",
    "category": "eventos",
    "xpReward": 350,
    "tokensReward": 0,
    "totalRequired": 1,
    "actionUrl": "/eventos",
    "actionLabel": "Confirmar Presença",
    "expiresAt": "2026-09-21T23:59:59Z"
  }
]
```

---

## 5. 🛍️ Tabela `benefits` (Parcerias & Vantagens)

```json
[
  {
    "id": 1,
    "partnerName": "Adega Santiago",
    "partnerLogo": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    "category": "gastronomy",
    "title": "Menu Degustação & Isenção de Rolha",
    "discountBadge": "15% OFF",
    "description": "15% de desconto no menu autoral e isenção de taxa de rolha para a primeira garrafa em todas as unidades.",
    "redemptionType": "coupon",
    "couponCode": "CLUBKEY-SANTIAGO15",
    "validUntil": "31 de Dezembro de 2026"
  },
  {
    "id": 2,
    "partnerName": "Flapper Aviation",
    "partnerLogo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    "category": "mobility",
    "title": "Crédito VIP em Fretamento de Jatos",
    "discountBadge": "R$ 1.500 OFF",
    "description": "Crédito exclusivo de R$ 1.500 no primeiro voo executivo privativo ou empty leg compartilhado.",
    "redemptionType": "coupon",
    "couponCode": "CLUBKEY-FLAPPER",
    "validUntil": "31 de Dezembro de 2026"
  },
  {
    "id": 3,
    "partnerName": "Spa Fasano",
    "partnerLogo": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    "category": "wellness",
    "title": "Upgrade de Massagem & Day Spa",
    "discountBadge": "20% OFF",
    "description": "Desconto exclusivo de 20% em todos os rituais corporais e tratamentos de bem-estar.",
    "redemptionType": "direct_show",
    "validUntil": "31 de Dezembro de 2026"
  }
]
```
