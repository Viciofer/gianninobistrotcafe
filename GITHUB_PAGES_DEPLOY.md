# Guia de Deploy - GitHub Pages (TanStack Start + Lovable)

Este documento explica a solução técnica aplicada para permitir que este projeto, originalmente estruturado para TanStack Start (Fullstack/Cloudflare), funcione corretamente no GitHub Pages (Estático).

## O Problema Original
O framework TanStack Start, configurado pelo Lovable, espera um ambiente com servidor para realizar a "Hidratação" (Hydration) do React. Ao tentar rodar isso no GitHub Pages:
1. O build não gerava um arquivo `index.html` estático.
2. Ao forçar um `index.html`, o site quebrava com o erro `Invariant failed` porque não encontrava o estado do servidor (`window.__TSR__`).

## A Solução Aplicada
Para manter a compatibilidade com o editor da Lovable e ainda assim funcionar no GitHub Pages, a correção foi implementada **exclusivamente no pipeline de CI/CD** (.github/workflows/deploy.yml).

### O que o processo de deploy faz agora:
No momento do build no GitHub Actions, o projeto é temporariamente transformado em um **SPA (Single Page Application) puro**:

1. **Injeção de Entrypoints**: Cria um `index.html` e um `src/main.tsx` temporários para servir como ponto de entrada padrão do Vite.
2. **Configuração de Build**: Substitui o `vite.config.ts` original (que forçava o modo Cloudflare) por uma configuração de SPA estática.
3. **Limpeza de Componentes**: O arquivo `src/routes/__root.tsx` é modificado via script (`sed`) para remover as tags `<html>`, `<head>` e `<body>`, que o React não permite renderizar dentro de um `div#root` em modo SPA.
4. **Build e Deploy**: O Vite compila o projeto como uma aplicação estática comum, que o GitHub Pages entende perfeitamente.

## Como o GitHub Pages deve estar configurado
Para que esta automação funcione, as configurações no painel do seu repositório no GitHub devem estar assim:

1. Vá em **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, selecione: **GitHub Actions**.
   - *Nota: Não use a opção "Deploy from a branch", pois nosso script customizado faz o deploy direto via API do Actions.*
3. O endereço do site será: `https://vinfer-max.github.io/gianninobistrotcafe/`

## Como replicar no futuro
Se você criar um novo projeto no Lovable e quiser movê-lo para o GitHub Pages:
1. Copie o conteúdo do arquivo `.github/workflows/deploy.yml` deste projeto.
2. Certifique-se de que o `basepath` no `router.tsx` e o `base` no `vite.config.ts` (dentro da action) correspondam ao nome do seu repositório (ex: `/nome-do-repo/`).

---
*Este arquivo foi gerado automaticamente para servir como documentação técnica do processo de correção realizado em 30/04/2026.*
