import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CampaignService } from '../../../../lib/campaignService';

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

  const { id, weekNumber } = req.query;

  if (typeof id !== 'string' || typeof weekNumber !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const weekNum = parseInt(weekNumber);
  if (isNaN(weekNum)) {
    return res.status(400).json({ error: 'Invalid week number' });
  }

  try {
    const week = await campaignService.updateWeekData(id, weekNum, req.body);
    return res.status(200).json(week);
  } catch (error: any) {
    console.error('Error updating week:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
