# Guia de Deploy na Vercel

Este guia explica como fazer o deploy do projeto completo (frontend + backend) na Vercel.

## Pré-requisitos

- Conta na Vercel (https://vercel.com)
- Git inicializado no projeto
- Repositório no GitHub/GitLab/Bitbucket (recomendado)

## Passo a Passo

### 1. Preparar o repositório Git

```bash
# Na raiz do projeto
git init
git add .
git commit -m "Preparar projeto para deploy na Vercel"

# Criar repositório no GitHub e fazer push
git remote add origin <URL_DO_SEU_REPOSITORIO>
git branch -M main
git push -u origin main
```

### 2. Criar projeto na Vercel

1. Acesse https://vercel.com/new
2. Importe seu repositório do GitHub
3. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (já configurado)
   - **Output Directory**: `dist` (já configurado)

### 3. Configurar Vercel Postgres

1. No dashboard do projeto na Vercel, vá em **Storage**
2. Clique em **Create Database**
3. Selecione **Postgres**
4. Escolha a região mais próxima dos seus usuários
5. Clique em **Create**

A Vercel automaticamente criará a variável de ambiente `DATABASE_URL` e a conectará ao seu projeto.

### 4. Configurar variáveis de ambiente (se necessário)

Se você precisar de variáveis adicionais:

1. Vá em **Settings** > **Environment Variables**
2. Adicione as variáveis necessárias:
   - `DATABASE_URL` (já configurada automaticamente pelo Postgres)
   - Outras variáveis que seu projeto precise

### 5. Fazer deploy das migrations do Prisma

Após o primeiro deploy, você precisa rodar as migrations:

#### Opção 1: Via Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Linkar o projeto local ao projeto Vercel
vercel link

# Puxar as variáveis de ambiente (incluindo DATABASE_URL)
vercel env pull .env

# Rodar as migrations
npx prisma migrate deploy

# Ou criar a primeira migration
npx prisma migrate dev --name init
```

#### Opção 2: Via Prisma Data Platform

1. Crie uma conta em https://cloud.prisma.io
2. Conecte seu banco de dados Vercel Postgres
3. Use o Prisma Studio online para gerenciar migrations

### 6. Verificar o deploy

1. Após o deploy, acesse a URL fornecida pela Vercel
2. O site deve carregar normalmente
3. Teste as funcionalidades:
   - Ajuste o CPA
   - Preencha dados semanais
   - Verifique se os dados são salvos

### 7. Monitoramento

- **Logs**: Vercel > Seu Projeto > Deployments > Logs
- **Functions**: Vercel > Seu Projeto > Functions (para ver logs das API routes)
- **Database**: Vercel > Seu Projeto > Storage > Seu Database

## Estrutura do Projeto na Vercel

```
Frontend (Vite/React)
├── Deploy automático do /dist
└── Servido pela CDN da Vercel

Backend (Serverless Functions)
├── /api/campaigns/index.ts
├── /api/campaigns/[id].ts
├── /api/campaigns/[id]/cpa.ts
├── /api/campaigns/[id]/weeks/[weekNumber].ts
├── /api/campaigns/[id]/stats.ts
├── /api/campaigns/[id]/comparison.ts
└── /api/campaigns/period/[month]/[year].ts

Database (Vercel Postgres)
└── Gerenciado pela Vercel
```

## URLs da API em Produção

Após o deploy, suas APIs estarão disponíveis em:

```
https://seu-projeto.vercel.app/api/campaigns
https://seu-projeto.vercel.app/api/campaigns/:id
https://seu-projeto.vercel.app/api/campaigns/:id/cpa
https://seu-projeto.vercel.app/api/campaigns/:id/weeks/:weekNumber
https://seu-projeto.vercel.app/api/campaigns/:id/stats
https://seu-projeto.vercel.app/api/campaigns/:id/comparison
https://seu-projeto.vercel.app/api/campaigns/period/:month/:year
```

## Desenvolvimento Local com Produção

Se quiser usar o banco de dados de produção localmente:

```bash
# Puxar variáveis de ambiente da Vercel
vercel env pull .env

# Rodar o projeto localmente
npm run dev
```

## Atualizações Futuras

Toda vez que você fizer push para o branch `main`, a Vercel fará deploy automaticamente:

```bash
git add .
git commit -m "Suas alterações"
git push origin main
```

## Domínio Customizado (Opcional)

1. Vercel > Seu Projeto > Settings > Domains
2. Adicione seu domínio customizado
3. Configure os DNS conforme instruções da Vercel

## Problemas Comuns

### API retorna 404
- Verifique se as funções foram deployadas: Vercel > Functions
- Verifique os logs: Vercel > Deployments > Logs

### Erro de conexão com banco de dados
- Verifique se o Postgres está conectado: Vercel > Storage
- Verifique se as migrations foram aplicadas
- Rode `npx prisma migrate deploy`

### Build falha
- Verifique se todas as dependências estão no `package.json`
- Verifique os logs de build na Vercel
- Teste o build localmente: `npm run build`

## Monitoramento de Custos

A Vercel oferece:
- **Free Tier**:
  - Frontend ilimitado
  - 100GB de largura de banda
  - 100 horas de execução de Functions
  - 256MB de Postgres (pode ser suficiente para começar)

- **Pro Tier** ($20/mês):
  - Recursos expandidos
  - Melhor performance
  - Suporte prioritário

## Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Prisma: https://www.prisma.io/docs
- Suporte Vercel: https://vercel.com/support
