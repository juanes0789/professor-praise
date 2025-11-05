# Professor Praise — Monorepo (backend + frontend)

Este repositorio contiene dos carpetas principales:
<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0f29144c-b694-4e55-b21d-e27693d01b4c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0f29144c-b694-4e55-b21d-e27693d01b4c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**


**Use GitHub Codespaces**


## What technologies are used for this project?

This project is built with:


## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0f29144c-b694-4e55-b21d-e27693d01b4c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======

Este repositorio contiene dos carpetas principales:
- `prof-rate-backend/` — servidor Node.js (API, DB, servicios)
- `prof-rate-frontend/` — cliente (Vite + React/TypeScript)

Instrucciones rápidas para preparar y subir a GitHub:

1) Inicializar repo local (si aún no está):

   git init
   git add .
   git commit -m "Initial commit: backend + frontend"

2) Crear repo en GitHub y empujar (opciones):

- Opción A (CLI `gh`, recomendada si la tienes configurada):

   gh repo create NOMBRE_DEL_REPO --public --source=. --remote=origin --push

- Opción B (manual):

   - Crea un nuevo repositorio en https://github.com
   - Añade el remote y empuja:

     git remote add origin git@github.com:TU_USUARIO/NOMBRE_DEL_REPO.git
     git branch -M main
     git push -u origin main

3) Ejecutar localmente:

- Backend (desde `prof-rate-backend`):

  cd prof-rate-backend
  npm install
  npm run start (o npm run dev según el proyecto)

- Frontend (desde `prof-rate-frontend`):

  cd prof-rate-frontend
  npm install
  npm run dev

Si quieres, puedo:

- Inicializar el repo git localmente y hacer el commit inicial ahora.
- Intentar crear el repo en GitHub por ti (usando `gh`) si me indicas el nombre y si debe ser público o privado.

Dime cómo prefieres que proceda.
>>>>>>> 4ec9c94 (Initial commit: backend + frontend)
