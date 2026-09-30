# 📦 Arquitetura Monorepo ClubKey (Turborepo + pnpm)

O ecossistema **ClubKey** é estruturado como um **Monorepo** gerenciado por **pnpm workspaces** e acelerado pelo **Turborepo**, garantindo reutilização de código, isolamento entre aplicações e deploys independentes.

---

## 🏛️ Estrutura de Pacotes e Aplicações

```
clubkey/
├── apps/
│   ├── web/                          # 🌐 Portal do Membro / Cliente (Next.js 16)
│   └── admin/                        # ⚙️ Painel de Gestão Administrativa (Next.js 16)
│
├── packages/
│   ├── ui/                           # 🎨 Design System Bloom UI, Tokens CVA e CSS Global
│   ├── types/                        # 🏷️ Modelos de Dados e Interfaces TypeScript Compartilhadas
│   ├── schemas/                      # 🛡️ Schemas de Validação Zod Compartilhados
│   └── utils/                        # 🔧 Utilitários Compartilhados (cn, formatters, masks)
│
├── pnpm-workspace.yaml               # Configuração dos Workspaces pnpm
├── turbo.json                        # Pipeline de Build, Typecheck e Cache
└── package.json                      # Scripts Raiz e Orquestração
```

---

## 🚀 Comandos Rápidos de Desenvolvimento

### Desenvolvimento Local
* **Rodar Tudo em Paralelo:** `pnpm dev`
* **Rodar Apenas o Portal do Cliente (porta 3000):** `pnpm dev:web`
* **Rodar Apenas o Painel Admin (porta 3001):** `pnpm dev:admin`

### Builds e Validação
* **Build de Todas as Aplicações:** `pnpm build`
* **Build do Portal:** `pnpm build:web`
* **Build do Admin:** `pnpm build:admin`
* **Checagem de Tipos (Global):** `pnpm typecheck`
* **Testes Unitários:** `pnpm test`

---

## 📦 Como Consumir os Pacotes Compartilhados

Tanto o aplicativo do cliente (`@clubkey/web`) quanto o painel administrativo (`@clubkey/admin`) importam os pacotes internos com zero boilerplate:

```tsx
// 🎨 Componentes Bloom UI e Tokens de Design
import { Button, Card, DataTable, Badge } from "@clubkey/ui"

// 🏷️ Tipagens TypeScript
import type { Member, StayProperty, EventItem } from "@clubkey/types"

// 🛡️ Validações Zod
import { signUpSchema, creditCardPaymentSchema } from "@clubkey/schemas"

// 🔧 Utilitários
import { cn, formatCurrency, maskCpf } from "@clubkey/utils"
```

---

## 🌐 Estratégia de Deploy Independente

Na Vercel ou qualquer provedor em nuvem:
1. **Projeto 1 (Portal do Membro):**
   * **Root Directory:** `apps/web`
   * **Domínio:** `clubkey.com.br` ou `app.clubkey.com.br`
2. **Projeto 2 (Painel Administrativo):**
   * **Root Directory:** `apps/admin`
   * **Domínio:** `admin.clubkey.com.br`
