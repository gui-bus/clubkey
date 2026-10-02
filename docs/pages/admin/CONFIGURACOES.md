# ⚙️ Configurações da Plataforma — ClubKey Admin

A tela de **Configurações** (`/configuracoes`) permite aos administradores gerenciar o comportamento geral da plataforma, políticas de segurança, integrações e feature flags de módulos White Label.

---

## 🎛️ Módulos do Sistema (Feature Flags White Label)

Permite ligar ou desligar módulos inteiros da plataforma para a marca ativa sem necessidade de novo deploy:
* **Hospedagens (Stays):** Ativa/desativa catálogo, buscas e reservas de vilas e acomodações parceiras.
* **Eventos & KeyPass:** Ativa/desativa listagem de eventos executivos, lotes de ingressos e agenda.
* **Experiências:** Ativa/desativa vivências sob medida gastronômicas e lifestyle.
* **Benefícios & Parcerias:** Ativa/desativa o clube de vantagens e cupons.
* **Gamificação (KeyPass):** Ativa/desativa ranking, missões, XP e saldo de tokens RIB.
* **Conexões & Networking:** Ativa/desativa o diretório de membros e mensageria privada.

---

## 🔐 Segurança & Governança

* **Aprovação Manual de Membros:** Quando ativada, novos cadastros entram como "Pendentes" e exigem aprovação manual de um gestor.
* **2FA para Administradores:** Exigência de segundo fator de autenticação (TOTP) para acesso ao backoffice.
* **Auditoria de Logs:** Registro rastreável de todas as operações sensíveis (aprovações de cadastro, alterações de tarifas, exclusões).
