# ⚙️ Configurações da Plataforma — ClubKey Admin

A tela de **Configurações** (`/configuracoes`) permite gerenciar o comportamento geral do sistema, segurança e feature flags.

---

## 🎛️ Módulos do Sistema (Feature Flags)

Permite ligar ou desligar módulos inteiros da plataforma sem necessidade de novo deploy:
* **Hospedagens (Stays):** Ativa/desativa buscas e reservas de vilas e quartos.
* **Eventos & KeyPass:** Ativa/desativa listagem de eventos e compra de ingressos.
* **Benefícios & Parcerias:** Ativa/desativa o clube de vantagens.
* **Gamificação:** Ativa/desativa ranking, missões e saldo de pontos.

---

## 🔐 Segurança & Governança

* **Aprovação Manual de Membros:** Quando ativada, novos cadastros entram como "Pendentes" e exigem aprovação de um gestor.
* **2FA para Administradores:** Exigência de segundo fator de autenticação para acessos à área administrativa.
* **Auditoria de Logs:** Registro em banco de dados de todas as operações sensíveis (aprovações, alterações de preços, exclusões).
