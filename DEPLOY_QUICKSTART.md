# Deploy Rápido na Vercel - Passo a Passo Simplificado

## Resumo em 5 minutos

### 1. Instalar dependências atualizadas

```bash
# Na raiz do projeto
npm install
npx prisma generate
```

### 2. Fazer push para o GitHub

```bash
git init
git add .
git commit -m "Deploy inicial na Vercel"

# Criar repositório no GitHub e depois:
git remote add origin <URL_DO_SEU_REPO>
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel

1. Acesse https://vercel.com/new
2. Importe seu repositório do GitHub
3. Clique em **Deploy** (as configurações já estão prontas!)

### 4. Adicionar Banco de Dados

1. No dashboard do projeto > **Storage** > **Create Database**
2. Selecione **Postgres**
3. Escolha a região e clique em **Create**

### 5. Aplicar Migrations

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login e link do projeto
vercel login
vercel link

# Puxar variáveis de ambiente (incluindo DATABASE_URL)
vercel env pull .env

# Aplicar migrations
npx prisma migrate deploy
```

### 6. Pronto!

Acesse a URL fornecida pela Vercel e seu sistema estará no ar! 🚀

## Desenvolvimento Local com Backend na Vercel

Se quiser desenvolver localmente mas usando o backend de produção:

1. Crie um arquivo `.env.local`:
```env
VITE_API_URL=https://seu-projeto.vercel.app/api
```

2. Rode o frontend:
```bash
npm run dev
```

## Desenvolvimento Local Completo (Frontend + Backend Local)

Se quiser desenvolver tudo localmente (como antes):

1. Crie um arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
```

2. Rode o backend local:
```bash
cd backend
npm run dev
```

3. Em outro terminal, rode o frontend:
```bash
npm run dev
```

## Atualizações

Para atualizar o site após mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

A Vercel fará deploy automaticamente! ✨

## Links Úteis

- Guia completo: `DEPLOY_VERCEL.md`
- Documentação Vercel: https://vercel.com/docs
- Dashboard Vercel: https://vercel.com/dashboard
