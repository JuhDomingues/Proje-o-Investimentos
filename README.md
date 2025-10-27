# Dashboard de Projeção de Investimentos

Sistema completo de análise e acompanhamento de campanhas de investimento com backend e banco de dados.

## Funcionalidades

- Dashboard interativo de projeção de investimentos
- Banco de dados SQLite com Prisma ORM
- API RESTful para gerenciamento de campanhas
- Salvamento automático de dados semanais
- Comparação automática de resultados com metas
- Cálculos dinâmicos de CPA, ROI e conversão

## Estrutura do Projeto

```
Proje-o-Investimentos/
├── backend/                 # Backend Node.js + Express
│   ├── prisma/             # Schema do banco de dados
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   ├── prisma.ts       # Cliente Prisma
│   │   ├── types.ts        # Tipos TypeScript
│   │   └── index.ts        # Servidor Express
│   └── package.json
│
├── src/                    # Frontend React
│   ├── hooks/              # Custom hooks
│   │   └── useCampaign.ts
│   ├── services/           # Serviços de API
│   │   └── api.ts
│   └── InvestmentProjection.tsx
│
└── package.json
```

## Instalação

### 1. Instalar dependências do frontend

```bash
npm install
```

### 2. Instalar dependências do backend

```bash
cd backend
npm install
```

### 3. Configurar o banco de dados

```bash
# Ainda no diretório backend/
npm run prisma:generate
npm run prisma:migrate
```

## Executar o Projeto

### 1. Iniciar o backend (Terminal 1)

```bash
cd backend
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 2. Iniciar o frontend (Terminal 2)

```bash
# Na raiz do projeto
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## API Endpoints

### Campanhas

- `GET /api/campaigns` - Listar todas as campanhas
- `GET /api/campaigns/:id` - Buscar campanha por ID
- `GET /api/campaigns/period/:month/:year` - Buscar campanha por período
- `POST /api/campaigns` - Criar nova campanha
- `PUT /api/campaigns/:id/cpa` - Atualizar CPA da campanha
- `DELETE /api/campaigns/:id` - Deletar campanha

### Semanas

- `PUT /api/campaigns/:id/weeks/:weekNumber` - Atualizar dados de uma semana

### Estatísticas

- `GET /api/campaigns/:id/comparison` - Obter comparação com metas
- `GET /api/campaigns/:id/stats` - Obter estatísticas completas da campanha

## Estrutura do Banco de Dados

### Campaign (Campanha)
- `id`: UUID
- `name`: Nome da campanha
- `month`: Mês da campanha
- `year`: Ano da campanha
- `cpa`: CPA médio
- `metaVendas`: Meta total de vendas
- `metaReceita`: Meta total de receita

### Week (Semana)
- `id`: UUID
- `campaignId`: ID da campanha
- `weekNumber`: Número da semana (1-4)
- `metaVendas`: Meta de vendas
- `metaInvestimento`: Meta de investimento
- `metaComparecimentos`: Meta de comparecimentos
- `vendasRealizadas`: Vendas realizadas
- `investimentoReal`: Investimento real
- `comparecimentosReais`: Comparecimentos reais
- `agendamentos`: Total de agendamentos
- `vendasMentoria`: Vendas de mentoria
- `cpaReal`: CPA real calculado
- `percentualMeta`: Percentual de meta atingida
- `percentualComparecimento`: Percentual de comparecimento

## Uso

1. Ao abrir o sistema, uma campanha para "Outubro 2024" será criada automaticamente se não existir
2. Ajuste o CPA usando o slider - os dados são salvos automaticamente no banco
3. Preencha os dados semanais (comparecimentos, vendas realizadas, investimento real)
4. Todos os campos são salvos automaticamente ao serem alterados
5. Os gráficos e estatísticas são atualizados em tempo real
6. O sistema compara automaticamente os resultados com as metas

## Ferramentas Úteis

### Prisma Studio

Para visualizar e editar dados do banco de dados:

```bash
cd backend
npm run prisma:studio
```

Acesse em `http://localhost:5555`

### Health Check

Para verificar se o backend está rodando:

```bash
curl http://localhost:3001/health
```

## Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Recharts (gráficos)
- Lucide React (ícones)
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite

## Desenvolvido por

Claude Code - Sistema de análise financeira para campanhas de mentoria
