import { Router, Request, Response } from 'express';
import { CampaignService } from '../services/campaignService';

const router = Router();
const campaignService = new CampaignService();

// GET /api/campaigns - Listar todas as campanhas
router.get('/', async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    res.status(500).json({ error: 'Erro ao buscar campanhas' });
  }
});

// GET /api/campaigns/:id - Buscar campanha por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);

    if (!campaign) {
      return res.status(404).json({ error: 'Campanha não encontrada' });
    }

    res.json(campaign);
  } catch (error) {
    console.error('Erro ao buscar campanha:', error);
    res.status(500).json({ error: 'Erro ao buscar campanha' });
  }
});

// GET /api/campaigns/period/:month/:year - Buscar por período
router.get('/period/:month/:year', async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const campaign = await campaignService.getCampaignByPeriod(month, parseInt(year));

    if (!campaign) {
      return res.status(404).json({ error: 'Campanha não encontrada para este período' });
    }

    res.json(campaign);
  } catch (error) {
    console.error('Erro ao buscar campanha:', error);
    res.status(500).json({ error: 'Erro ao buscar campanha' });
  }
});

// POST /api/campaigns - Criar nova campanha
router.post('/', async (req: Request, res: Response) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Erro ao criar campanha:', error);
    res.status(500).json({ error: 'Erro ao criar campanha' });
  }
});

// PUT /api/campaigns/:id/cpa - Atualizar CPA da campanha
router.put('/:id/cpa', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cpa } = req.body;

    if (typeof cpa !== 'number' || cpa <= 0) {
      return res.status(400).json({ error: 'CPA inválido' });
    }

    const campaign = await campaignService.updateCampaignCPA(id, cpa);
    res.json(campaign);
  } catch (error) {
    console.error('Erro ao atualizar CPA:', error);
    res.status(500).json({ error: 'Erro ao atualizar CPA' });
  }
});

// PUT /api/campaigns/:id/weeks/:weekNumber - Atualizar dados de uma semana
router.put('/:id/weeks/:weekNumber', async (req: Request, res: Response) => {
  try {
    const { id, weekNumber } = req.params;
    const week = await campaignService.updateWeekData(id, parseInt(weekNumber), req.body);
    res.json(week);
  } catch (error: any) {
    console.error('Erro ao atualizar semana:', error);
    res.status(500).json({ error: error.message || 'Erro ao atualizar semana' });
  }
});

// GET /api/campaigns/:id/comparison - Obter comparação com metas
router.get('/:id/comparison', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comparison = await campaignService.getComparison(id);
    res.json(comparison);
  } catch (error: any) {
    console.error('Erro ao obter comparação:', error);
    res.status(500).json({ error: error.message || 'Erro ao obter comparação' });
  }
});

// GET /api/campaigns/:id/stats - Obter estatísticas da campanha
router.get('/:id/stats', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stats = await campaignService.getCampaignStats(id);
    res.json(stats);
  } catch (error: any) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ error: error.message || 'Erro ao obter estatísticas' });
  }
});

// DELETE /api/campaigns/:id - Deletar campanha
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await campaignService.deleteCampaign(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar campanha:', error);
    res.status(500).json({ error: 'Erro ao deletar campanha' });
  }
});

export default router;
