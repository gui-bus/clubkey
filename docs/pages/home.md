# Página: Home / Feed Principal (`/`)

A página inicial do portal de membros atua como o **centro de comando e feed executivo do associado**.

---

## 🎯 Objetivo da Tela
Apresentar uma visão panorâmica e em tempo real de tudo o que está acontecendo no clube e na rede de relacionamentos:
- Seletor de Clube / Sede ativa no topo.
- Resumo do KeyPass (Tier atual, progresso de XP, saldo de Tokens RIB e atalho para missões).
- Eventos de destaque nos próximos dias com botão de confirmação rápida (RSVP).
- Recomendações de membros sugeridos para networking com base em afinidades de tags (Seeking / Offering).
- Experiências exclusivas e gastronomia em alta.
- Histórico recente de atividades de XP.

---

## 🖥️ Componentes Visuais Utilizados
- `PortalHero`: Banner de boas-vindas personalizado com o nome do membro, clube ativo e cotação de status.
- `KeyPassStatCard` / `KeyPassNav`: Cards de indicadores rápidos de XP e Tokens RIB.
- `EventCard`: Cards de eventos com tag de categoria, data, local, vagas restantes e botão de RSVP.
- `MemberCard`: Cards de associados com foto, cargo, empresa, tags de negócios e botão de conectar.
- `ExperienceCard`: Cards de experiências com precificação em BRL / RIB e botão de reserva.
- `KeyPassMissionsWidget`: Widget lateral mostrando missões diárias/semanais para resgate de pontos.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/clubs` & `GET /api/v1/clubs/:id`: Dados do clube selecionado.
2. `GET /api/v1/keypass/me`: XP, Tokens RIB, Tier e progresso do associado logado.
3. `GET /api/v1/events?clubId=:clubId&limit=4`: Próximos eventos em destaque.
4. `GET /api/v1/members?clubId=:clubId&limit=6`: Membros sugeridos para conexão.
5. `GET /api/v1/experiences?clubId=:clubId&limit=3`: Experiências disponíveis.
6. `GET /api/v1/keypass/missions?limit=3`: Missões pendentes mais relevantes.
7. `POST /api/v1/events/:id/rsvp`: Confirmação ou cancelamento rápido de presença em evento.
8. `POST /api/v1/connections/:memberId/request`: Solicitação rápida de conexão.
