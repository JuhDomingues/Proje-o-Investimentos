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
