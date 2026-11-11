<div align="center">

# SOUL Dashboard

**Plataforma de gestão empresarial: site institucional com planos de assinatura + dashboard administrativo**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## Sobre o projeto

O **SOUL** é uma solução de gestão para pequenas e médias empresas, desenvolvida como projeto educacional no curso técnico de **Análise e Desenvolvimento de Sistemas do SENAI**. Ele é dividido em duas aplicações:

| Módulo | Pasta | Descrição |
|---|---|---|
| **Site + Planos** | [`web_SOUL`](./web_SOUL) | Landing page, apresentação da equipe, portfólio, planos de assinatura, login/recuperação de senha, checkout e área do cliente. |
| **Dashboard** | [`dash_soul`](./dash_soul) | Painel administrativo com módulos de **agenda, estoque, financeiro, relacionamentos, relatórios e transporte**. |

## Funcionalidades

- Autenticação com Supabase (login, cadastro, recuperação e redefinição de senha)
- Rotas protegidas e contexto de usuário
- Sistema de planos com checkout obrigatório e upgrade de plano
- Geração de PDF (jsPDF) e alertas com SweetAlert2
- Dashboard com gráficos (Recharts) e componentes acessíveis (Radix UI)
- Tema claro/escuro

## Como rodar

```bash
# Site + Planos
cd web_SOUL
cp .env.example .env   # preencha as chaves do Supabase
npm install
npm run dev

# Dashboard
cd dash_soul
npm install
npm run dev
```

## Estrutura

```
projeto-soul-dashboard/
├── web_SOUL/     # Site institucional, planos e checkout (React + Vite + Express)
├── dash_soul/    # Dashboard administrativo (React + TypeScript + Tailwind)
├── Exemplos/     # Protótipos e testes de layout
└── Outros/       # Vídeo pitch do projeto
```

## Equipe

Projeto desenvolvido em equipe por alunos do SENAI, incluindo [Luiz Paulo Pereira](https://github.com/luixppereira) e [Mxthxzy000](https://github.com/Mxthxzy000).

> Projeto educacional, sem fins comerciais.
