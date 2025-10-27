const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface WeekData {
  weekNumber: number;
  metaVendas: number;
  metaInvestimento: number;
  metaComparecimentos: number;
  vendasRealizadas?: number;
  investimentoReal?: number;
  comparecimentosReais?: number;
  agendamentos?: number;
  vendasMentoria?: number;
}

export interface CampaignData {
  name: string;
  month: string;
  year: number;
  cpa: number;
  metaVendas: number;
  metaReceita: number;
  weeks: WeekData[];
}

export interface Campaign {
  id: string;
  name: string;
  month: string;
  year: number;
  cpa: number;
  metaVendas: number;
  metaReceita: number;
  createdAt: string;
  updatedAt: string;
  weeks: Week[];
}

export interface Week {
  id: string;
  campaignId: string;
  weekNumber: number;
  metaVendas: number;
  metaInvestimento: number;
  metaComparecimentos: number;
  vendasRealizadas: number;
  investimentoReal: number;
  comparecimentosReais: number;
  agendamentos: number;
  vendasMentoria: number;
  cpaReal: number | null;
  percentualMeta: number | null;
  percentualComparecimento: number | null;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // Buscar todas as campanhas
  async getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(`${API_BASE_URL}/campaigns`);
    if (!response.ok) throw new Error('Erro ao buscar campanhas');
    return response.json();
  },

  // Buscar campanha por ID
  async getCampaignById(id: string): Promise<Campaign> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`);
    if (!response.ok) throw new Error('Campanha não encontrada');
    return response.json();
  },

  // Buscar campanha por período
  async getCampaignByPeriod(month: string, year: number): Promise<Campaign | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/period/${month}/${year}`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      return null;
    }
  },

  // Criar nova campanha
  async createCampaign(data: CampaignData): Promise<Campaign> {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar campanha');
    return response.json();
  },

  // Atualizar CPA da campanha
  async updateCampaignCPA(id: string, cpa: number): Promise<Campaign> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}/cpa`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpa }),
    });
    if (!response.ok) throw new Error('Erro ao atualizar CPA');
    return response.json();
  },

  // Atualizar dados de uma semana
  async updateWeekData(campaignId: string, weekNumber: number, data: Partial<WeekData>): Promise<Week> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/weeks/${weekNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar semana');
    return response.json();
  },

  // Obter comparação com metas
  async getComparison(campaignId: string) {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/comparison`);
    if (!response.ok) throw new Error('Erro ao obter comparação');
    return response.json();
  },

  // Obter estatísticas da campanha
  async getCampaignStats(campaignId: string) {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/stats`);
    if (!response.ok) throw new Error('Erro ao obter estatísticas');
    return response.json();
  },

  // Deletar campanha
  async deleteCampaign(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar campanha');
  },
};
