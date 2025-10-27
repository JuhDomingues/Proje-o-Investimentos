import prisma from './prisma';

export interface CampaignData {
  name: string;
  month: string;
  year: number;
  cpa: number;
  metaVendas: number;
  metaReceita: number;
  weeks: WeekData[];
}

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

export interface WeekComparison {
  weekNumber: number;
  metaVendas: number;
  vendasRealizadas: number;
  deficit: number;
  percentualAtingido: number;
  metaComparecimentos: number;
  comparecimentosReais: number;
  percentualComparecimento: number;
  cpaReal: number | null;
  status: 'acima' | 'na_meta' | 'abaixo';
}

export class CampaignService {
  async createCampaign(data: CampaignData) {
    const campaign = await prisma.campaign.create({
      data: {
        name: data.name,
        month: data.month,
        year: data.year,
        cpa: data.cpa,
        metaVendas: data.metaVendas,
        metaReceita: data.metaReceita,
        weeks: {
          create: data.weeks.map(week => ({
            weekNumber: week.weekNumber,
            metaVendas: week.metaVendas,
            metaInvestimento: week.metaInvestimento,
            metaComparecimentos: week.metaComparecimentos,
            vendasRealizadas: week.vendasRealizadas || 0,
            investimentoReal: week.investimentoReal || 0,
            comparecimentosReais: week.comparecimentosReais || 0,
            agendamentos: week.agendamentos || 0,
            vendasMentoria: week.vendasMentoria || 0,
          }))
        }
      },
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' }
        }
      }
    });

    return campaign;
  }

  async getAllCampaigns() {
    return await prisma.campaign.findMany({
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' }
        }
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' }
      ]
    });
  }

  async getCampaignById(id: string) {
    return await prisma.campaign.findUnique({
      where: { id },
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' }
        }
      }
    });
  }

  async getCampaignByPeriod(month: string, year: number) {
    return await prisma.campaign.findUnique({
      where: {
        month_year: {
          month,
          year
        }
      },
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' }
        }
      }
    });
  }

  async updateCampaignCPA(id: string, cpa: number) {
    return await prisma.campaign.update({
      where: { id },
      data: { cpa },
      include: {
        weeks: {
          orderBy: { weekNumber: 'asc' }
        }
      }
    });
  }

  async updateWeekData(campaignId: string, weekNumber: number, data: Partial<WeekData>) {
    const week = await prisma.week.findUnique({
      where: {
        campaignId_weekNumber: {
          campaignId,
          weekNumber
        }
      }
    });

    if (!week) {
      throw new Error('Semana não encontrada');
    }

    let cpaReal = null;
    const vendasRealizadas = data.vendasRealizadas ?? week.vendasRealizadas;
    const investimentoReal = data.investimentoReal ?? week.investimentoReal;

    if (vendasRealizadas > 0) {
      cpaReal = investimentoReal / vendasRealizadas;
    }

    let percentualMeta = null;
    if (vendasRealizadas > 0) {
      percentualMeta = (vendasRealizadas / week.metaVendas) * 100;
    }

    let percentualComparecimento = null;
    const comparecimentosReais = data.comparecimentosReais ?? week.comparecimentosReais;
    if (comparecimentosReais > 0) {
      percentualComparecimento = (comparecimentosReais / week.metaComparecimentos) * 100;
    }

    return await prisma.week.update({
      where: {
        campaignId_weekNumber: {
          campaignId,
          weekNumber
        }
      },
      data: {
        ...data,
        cpaReal,
        percentualMeta,
        percentualComparecimento
      }
    });
  }

  async getComparison(campaignId: string): Promise<WeekComparison[]> {
    const campaign = await this.getCampaignById(campaignId);

    if (!campaign) {
      throw new Error('Campanha não encontrada');
    }

    return campaign.weeks.map(week => {
      const deficit = week.metaVendas - week.vendasRealizadas;
      const percentualAtingido = week.percentualMeta || 0;
      const percentualComparecimento = week.percentualComparecimento || 0;

      let status: 'acima' | 'na_meta' | 'abaixo' = 'abaixo';
      if (percentualAtingido >= 100) {
        status = 'acima';
      } else if (percentualAtingido >= 90) {
        status = 'na_meta';
      }

      return {
        weekNumber: week.weekNumber,
        metaVendas: week.metaVendas,
        vendasRealizadas: week.vendasRealizadas,
        deficit,
        percentualAtingido,
        metaComparecimentos: week.metaComparecimentos,
        comparecimentosReais: week.comparecimentosReais,
        percentualComparecimento,
        cpaReal: week.cpaReal,
        status
      };
    });
  }

  async getCampaignStats(campaignId: string) {
    const campaign = await this.getCampaignById(campaignId);

    if (!campaign) {
      throw new Error('Campanha não encontrada');
    }

    const totalVendasRealizadas = campaign.weeks.reduce((sum, week) => sum + week.vendasRealizadas, 0);
    const totalInvestimentoReal = campaign.weeks.reduce((sum, week) => sum + week.investimentoReal, 0);
    const totalComparecimentos = campaign.weeks.reduce((sum, week) => sum + week.comparecimentosReais, 0);
    const totalAgendamentos = campaign.weeks.reduce((sum, week) => sum + week.agendamentos, 0);
    const totalVendasMentoria = campaign.weeks.reduce((sum, week) => sum + week.vendasMentoria, 0);

    const cpaRealMedio = totalVendasRealizadas > 0 ? totalInvestimentoReal / totalVendasRealizadas : 0;
    const percentualMetaGeral = (totalVendasRealizadas / campaign.metaVendas) * 100;
    const taxaComparecimento = totalAgendamentos > 0 ? (totalComparecimentos / totalAgendamentos) * 100 : 0;
    const taxaConversao = totalComparecimentos > 0 ? (totalVendasMentoria / totalComparecimentos) * 100 : 0;

    return {
      campaign: {
        id: campaign.id,
        name: campaign.name,
        month: campaign.month,
        year: campaign.year,
        cpaPlanejado: campaign.cpa,
        metaVendas: campaign.metaVendas,
        metaReceita: campaign.metaReceita
      },
      performance: {
        totalVendasRealizadas,
        totalInvestimentoReal,
        cpaRealMedio,
        percentualMetaGeral,
        deficit: campaign.metaVendas - totalVendasRealizadas
      },
      funil: {
        totalAgendamentos,
        totalComparecimentos,
        totalVendasMentoria,
        taxaComparecimento,
        taxaConversao
      },
      weeks: campaign.weeks
    };
  }

  async deleteCampaign(id: string) {
    return await prisma.campaign.delete({
      where: { id }
    });
  }
}
