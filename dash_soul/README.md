# dash_soul — React + Vite

Projeto migrado de Next.js 15 para React + Vite.

## Setup

```bash
npm install
npm run dev
```

## Alterações feitas

- Removido `next`, `next-themes`, `next/link`, `next/font`, `next/navigation`
- Adicionado `react-router-dom` — roteamento client-side
- Adicionado `recharts` como dependência explícita
- `next/link` → `<Link to="...">` (react-router-dom)
- `usePathname()` → `useLocation()` (react-router-dom)
- Criado `src/main.tsx` — entry point com `<BrowserRouter>` e `<Routes>`
- Criado `index.html` — entry HTML do Vite
- Criado `lib/utils.ts` — utilitário `cn()` (estava faltando)
- `vite.config.ts` atualizado com alias `@/` via `path.resolve`
- `tsconfig.json` limpo — removidas referências Next.js, adicionado `"jsx": "react-jsx"`
- `theme-provider.tsx` reescrito sem `next-themes`
- `tailwind.config.js` atualizado para incluir `src/` e `index.html`
- Todas as diretivas `"use client"` removidas
