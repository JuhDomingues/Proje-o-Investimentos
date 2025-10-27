import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../../lib/campaignService';

const campaignService = new CampaignService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { cpa } = req.body;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid campaign ID' });
  }

  if (typeof cpa !== 'number' || cpa <= 0) {
    return res.status(400).json({ error: 'Invalid CPA value' });
  }

  try {
    const campaign = await campaignService.updateCampaignCPA(id, cpa);
    return res.status(200).json(campaign);
  } catch (error: any) {
    console.error('Error updating CPA:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
