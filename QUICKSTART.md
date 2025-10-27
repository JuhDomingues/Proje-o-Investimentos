# Guia Rápido de Início

## Passo a Passo para rodar o projeto

### 1. Instalar dependências

```bash
# Dependências do frontend (na raiz do projeto)
npm install

# Dependências do backend
cd backend
npm install
```

### 2. Configurar o banco de dados

```bash
# Ainda no diretório backend/
npx prisma generate
npx prisma migrate dev
```

### 3. Iniciar o backend

```bash
# No diretório backend/
npm run dev
```

Você verá:
```
🚀 Servidor rodando na porta 3001
📊 API disponível em http://localhost:3001/api
❤️  Health check em http://localhost:3001/health
```

### 4. Iniciar o frontend (em outro terminal)

```bash
# Na raiz do projeto
npm run dev
```

Acesse: `http://localhost:5173`

## Testar a API (opcional)

Com o backend rodando, em outro terminal:

```bash
cd backend
./test-api.sh
```

## Visualizar dados do banco (opcional)

```bash
cd backend
npm run prisma:studio
```

Acesse: `http://localhost:5555`

## Como usar o sistema

1. Ao abrir o sistema, uma campanha para "Outubro 2024" é criada automaticamente
2. Ajuste o CPA usando o slider - salva automaticamente
3. Preencha os dados semanais nos campos:
   - Comparecimentos por semana
   - Vendas realizadas
   - Investimento real
4. Todos os dados são salvos automaticamente no banco de dados
5. Os gráficos e comparações são atualizados em tempo real

## Estrutura dos dados salvos

### Campanha
- Nome, mês, ano
- CPA médio
- Metas de vendas e receita

### Semanas (1 a 4)
- Meta de vendas
- Meta de investimento
- Meta de comparecimentos
- Dados realizados (vendas, investimento, comparecimentos)
- Agendamentos e vendas de mentoria
- Cálculos automáticos (CPA real, percentuais)

## Problemas comuns

### Backend não inicia
- Verifique se a porta 3001 está livre
- Rode: `lsof -ti:3001 | xargs kill` para liberar a porta

### Frontend não conecta
- Certifique-se que o backend está rodando
- Verifique o console do browser para erros de CORS

### Dados não salvam
- Verifique se o backend está rodando
- Abra o console do browser (F12) para ver erros
- Verifique os logs do backend no terminal
