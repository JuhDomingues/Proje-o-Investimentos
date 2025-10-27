import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../../lib/campaignService';

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

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid campaign ID' });
  }

  try {
    const comparison = await campaignService.getComparison(id);
    return res.status(200).json(comparison);
  } catch (error: any) {
    console.error('Error getting comparison:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
