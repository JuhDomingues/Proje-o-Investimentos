import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../../../lib/campaignService';

const campaignService = new CampaignService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { month, year } = req.query;

  if (typeof month !== 'string' || typeof year !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const yearNum = parseInt(year);
  if (isNaN(yearNum)) {
    return res.status(400).json({ error: 'Invalid year' });
  }

  try {
    const campaign = await campaignService.getCampaignByPeriod(month, yearNum);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found for this period' });
    }

    return res.status(200).json(campaign);
  } catch (error: any) {
    console.error('Error getting campaign by period:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
