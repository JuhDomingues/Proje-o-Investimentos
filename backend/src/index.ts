import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campaignRoutes from './routes/campaignRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/campaigns', campaignRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  console.log(`❤️  Health check em http://localhost:${PORT}/health`);
});
