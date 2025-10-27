import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../lib/campaignService';

const campaignService = new CampaignService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const campaigns = await campaignService.getAllCampaigns();
      return res.status(200).json(campaigns);
    }

    if (req.method === 'POST') {
      const campaign = await campaignService.createCampaign(req.body);
      return res.status(201).json(campaign);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in campaigns handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
