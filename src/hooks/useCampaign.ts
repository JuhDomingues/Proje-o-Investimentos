import { useState, useEffect } from 'react';
import { api, Campaign, CampaignData, WeekData } from '../services/api';

export function useCampaign(month: string, year: number) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar campanha existente ou criar uma nova
  const loadOrCreateCampaign = async () => {
    try {
      setLoading(true);
      setError(null);

      // Tentar buscar campanha existente
      const existing = await api.getCampaignByPeriod(month, year);

      if (existing) {
        setCampaign(existing);
      } else {
        // Criar nova campanha se não existir
        const newCampaign = await createDefaultCampaign(month, year);
        setCampaign(newCampaign);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar campanha');
      console.error('Erro ao carregar campanha:', err);
    } finally {
      setLoading(false);
    }
  };

  // Criar campanha padrão
  const createDefaultCampaign = async (month: string, year: number): Promise<Campaign> => {
    const receitaTotal = 50000;
    const taxaConversao = 9.4;
    const precoGuia = 27.00;
    const precoMentoria = 4997;
    const cpaDefault = 100;

    const totalVendas = Math.round(receitaTotal / (precoGuia + (taxaConversao / 100 * precoMentoria)));

    const vendaSemana1 = Math.round(totalVendas * 0.20);
    const vendaSemana2 = Math.round(totalVendas * 0.30);
    const vendaSemana3 = Math.round(totalVendas * 0.30);
    const vendaSemana4 = totalVendas - vendaSemana1 - vendaSemana2 - vendaSemana3;

    const weeks: WeekData[] = [
      {
        weekNumber: 1,
        metaVendas: vendaSemana1,
        metaInvestimento: vendaSemana1 * cpaDefault,
        metaComparecimentos: Math.round(vendaSemana1 * 0.5),
      },
      {
        weekNumber: 2,
        metaVendas: vendaSemana2,
        metaInvestimento: vendaSemana2 * cpaDefault,
        metaComparecimentos: Math.round(vendaSemana2 * 0.5),
      },
      {
        weekNumber: 3,
        metaVendas: vendaSemana3,
        metaInvestimento: vendaSemana3 * cpaDefault,
        metaComparecimentos: Math.round(vendaSemana3 * 0.5),
      },
      {
        weekNumber: 4,
        metaVendas: vendaSemana4,
        metaInvestimento: vendaSemana4 * cpaDefault,
        metaComparecimentos: Math.round(vendaSemana4 * 0.5),
      },
    ];

    const campaignData: CampaignData = {
      name: `Campanha ${month} ${year}`,
      month,
      year,
      cpa: cpaDefault,
      metaVendas: totalVendas,
      metaReceita: receitaTotal,
      weeks,
    };

    return await api.createCampaign(campaignData);
  };

  // Atualizar CPA
  const updateCPA = async (newCpa: number) => {
    if (!campaign) return;

    try {
      const updated = await api.updateCampaignCPA(campaign.id, newCpa);
      setCampaign(updated);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar CPA');
      console.error('Erro ao atualizar CPA:', err);
    }
  };

  // Atualizar dados de uma semana
  const updateWeek = async (weekNumber: number, data: Partial<WeekData>) => {
    if (!campaign) return;

    try {
      const updatedWeek = await api.updateWeekData(campaign.id, weekNumber, data);

      // Atualizar a campanha localmente
      setCampaign(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          weeks: prev.weeks.map(week =>
            week.weekNumber === weekNumber ? updatedWeek : week
          ),
        };
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar semana');
      console.error('Erro ao atualizar semana:', err);
    }
  };

  // Recarregar campanha
  const reload = () => {
    loadOrCreateCampaign();
  };

  useEffect(() => {
    loadOrCreateCampaign();
  }, [month, year]);

  return {
    campaign,
    loading,
    error,
    updateCPA,
    updateWeek,
    reload,
  };
}
