import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../lib/campaignService';

const campaignService = new CampaignService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid campaign ID' });
  }

  try {
    if (req.method === 'GET') {
      const campaign = await campaignService.getCampaignById(id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      return res.status(200).json(campaign);
    }

    if (req.method === 'DELETE') {
      await campaignService.deleteCampaign(id);
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in campaign handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
