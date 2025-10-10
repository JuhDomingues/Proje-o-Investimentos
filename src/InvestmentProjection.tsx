import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, Users, Zap } from 'lucide-react';

const InvestmentProjection = () => {
  const [cpa, setCpa] = useState(100);
  const [agendamentos, setAgendamentos] = useState(0);
  const [comparecimentos, setComparecimentos] = useState(0);
  const [vendasMentoria, setVendasMentoria] = useState(0);

  // Estados para comparecimentos semanais
  const [comparecimentosSemana1, setComparecimentosSemana1] = useState(0);
  const [comparecimentosSemana2, setComparecimentosSemana2] = useState(0);
  const [comparecimentosSemana3, setComparecimentosSemana3] = useState(0);
  const [comparecimentosSemana4, setComparecimentosSemana4] = useState(0);

  // Estados para vendas realizadas e investimento real por semana
  const [vendasRealizadasSemana1, setVendasRealizadasSemana1] = useState(0);
  const [vendasRealizadasSemana2, setVendasRealizadasSemana2] = useState(0);
  const [vendasRealizadasSemana3, setVendasRealizadasSemana3] = useState(0);
  const [vendasRealizadasSemana4, setVendasRealizadasSemana4] = useState(0);

  const [investimentoRealSemana1, setInvestimentoRealSemana1] = useState(0);
  const [investimentoRealSemana2, setInvestimentoRealSemana2] = useState(0);
  const [investimentoRealSemana3, setInvestimentoRealSemana3] = useState(0);
  const [investimentoRealSemana4, setInvestimentoRealSemana4] = useState(0);

  // Cálculos dinâmicos baseados no CPA
  const receitaTotal = 50000; // Meta de faturamento fixo
  const taxaConversao = 9.4; // Taxa de conversão fixa em 9,4%
  const precoGuia = 27.00;
  const precoMentoria = 4997;

  // Calculando quantidade de vendas necessárias para atingir R$ 50k
  // Fórmula: receitaTotal = (vendas × precoGuia) + (vendas × taxaConversao/100 × precoMentoria)
  // Resolvendo para vendas: vendas = receitaTotal / (precoGuia + (taxaConversao/100 × precoMentoria))
  const totalVendas = Math.round(receitaTotal / (precoGuia + (taxaConversao / 100 * precoMentoria)));

  // Cálculo das vendas semanais baseado no total
  const vendaSemana1 = Math.round(totalVendas * 0.20);
  const vendaSemana2 = Math.round(totalVendas * 0.30);
  const vendaSemana3 = Math.round(totalVendas * 0.30);
  const vendaSemana4 = totalVendas - vendaSemana1 - vendaSemana2 - vendaSemana3;

  // Dados semanais
  const weeklyData = [
    { semana: 'Semana 1', vendas: vendaSemana1, investimento: vendaSemana1 * cpa, percentual: '20%' },
    { semana: 'Semana 2', vendas: vendaSemana2, investimento: vendaSemana2 * cpa, percentual: '30%' },
    { semana: 'Semana 3', vendas: vendaSemana3, investimento: vendaSemana3 * cpa, percentual: '30%' },
    { semana: 'Semana 4', vendas: vendaSemana4, investimento: vendaSemana4 * cpa, percentual: '20%' }
  ];

  const investimentoTotal = cpa * totalVendas;
  const receitaGuias = totalVendas * precoGuia;
  const clientesMentoria = Math.round(totalVendas * (taxaConversao / 100));
  const receitaMentoria = clientesMentoria * precoMentoria;
  const receitaTotalReal = receitaGuias + receitaMentoria;
  const lucroLiquido = receitaTotalReal - investimentoTotal;
  const roi = receitaTotalReal / investimentoTotal;
  const cacMentoria = clientesMentoria > 0 ? investimentoTotal / clientesMentoria : 0;

  // Cálculo da meta de agendamento
  const metaAgendamento = Math.round(totalVendas * 0.5); // 50% das vendas do guia

  // Metas de comparecimento semanais (50% das vendas de cada semana)
  const metaComparecimentoSemana1 = Math.round(vendaSemana1 * 0.5);
  const metaComparecimentoSemana2 = Math.round(vendaSemana2 * 0.5);
  const metaComparecimentoSemana3 = Math.round(vendaSemana3 * 0.5);
  const metaComparecimentoSemana4 = Math.round(vendaSemana4 * 0.5);

  // Percentuais de meta atingida por semana
  const percentualSemana1 = metaComparecimentoSemana1 > 0 ? (comparecimentosSemana1 / metaComparecimentoSemana1) * 100 : 0;
  const percentualSemana2 = metaComparecimentoSemana2 > 0 ? (comparecimentosSemana2 / metaComparecimentoSemana2) * 100 : 0;
  const percentualSemana3 = metaComparecimentoSemana3 > 0 ? (comparecimentosSemana3 / metaComparecimentoSemana3) * 100 : 0;
  const percentualSemana4 = metaComparecimentoSemana4 > 0 ? (comparecimentosSemana4 / metaComparecimentoSemana4) * 100 : 0;

  // Dados para gráfico de comparecimentos semanais
  const weeklySchedulingData = [
    {
      semana: 'Semana 1',
      meta: metaComparecimentoSemana1,
      realizado: comparecimentosSemana1,
      percentual: percentualSemana1.toFixed(1)
    },
    {
      semana: 'Semana 2',
      meta: metaComparecimentoSemana2,
      realizado: comparecimentosSemana2,
      percentual: percentualSemana2.toFixed(1)
    },
    {
      semana: 'Semana 3',
      meta: metaComparecimentoSemana3,
      realizado: comparecimentosSemana3,
      percentual: percentualSemana3.toFixed(1)
    },
    {
      semana: 'Semana 4',
      meta: metaComparecimentoSemana4,
      realizado: comparecimentosSemana4,
      percentual: percentualSemana4.toFixed(1)
    }
  ];

  // Cálculo de CPA real por semana
  const cpaRealSemana1 = vendasRealizadasSemana1 > 0 ? investimentoRealSemana1 / vendasRealizadasSemana1 : 0;
  const cpaRealSemana2 = vendasRealizadasSemana2 > 0 ? investimentoRealSemana2 / vendasRealizadasSemana2 : 0;
  const cpaRealSemana3 = vendasRealizadasSemana3 > 0 ? investimentoRealSemana3 / vendasRealizadasSemana3 : 0;
  const cpaRealSemana4 = vendasRealizadasSemana4 > 0 ? investimentoRealSemana4 / vendasRealizadasSemana4 : 0;

  // Cálculo de déficit/superávit de vendas
  const deficitSemana1 = vendaSemana1 - vendasRealizadasSemana1;
  const deficitSemana2 = vendaSemana2 - vendasRealizadasSemana2;
  const deficitSemana3 = vendaSemana3 - vendasRealizadasSemana3;

  // Projeção cumulativa de metas
  const metaCumulativaSemana2 = vendaSemana2 + (deficitSemana1 > 0 ? deficitSemana1 : 0);
  const metaCumulativaSemana3 = vendaSemana3 + (deficitSemana1 > 0 ? deficitSemana1 : 0) + (deficitSemana2 > 0 ? deficitSemana2 : 0);
  const metaCumulativaSemana4 = vendaSemana4 + (deficitSemana1 > 0 ? deficitSemana1 : 0) + (deficitSemana2 > 0 ? deficitSemana2 : 0) + (deficitSemana3 > 0 ? deficitSemana3 : 0);
  
  // Dados de ROI por cenário
  const scenarioData = [
    { cenario: 'Atual', cpa: 100, roi: 5.0 },
    { cenario: 'Reduzido', cpa: 70, roi: 7.5 },
    { cenario: 'Otimizado', cpa: 50, roi: 10.0 }
  ];
  
  // Dados de distribuição de receita
  const revenueData = [
    { name: 'Guias (Front)', value: receitaGuias, color: '#3b82f6' },
    { name: 'Mentorias', value: receitaMentoria, color: '#10b981' }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const StatCard = ({ icon: Icon, title, value, subtitle, color }: {
    icon: React.ComponentType<any>;
    title: string;
    value: string;
    subtitle?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5" style={{ color }} />
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Projeção de Investimento - Outubro 2024</h1>
          <p className="text-lg text-gray-600">Sistema de análise financeira para campanha de mentoria</p>
        </div>
        
        {/* Contexto do Produto */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">📊 Contexto da Campanha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-blue-100 mb-2">Produto Front-End (Perpétuo)</p>
              <p className="text-3xl font-bold">Guia 12 Passos - R$ 27,00</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Meta de Vendas - Outubro</p>
              <p className="text-3xl font-bold">{totalVendas} Guias</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Conversão para Mentoria</p>
              <p className="text-3xl font-bold">{taxaConversao.toFixed(1)}% (≈{clientesMentoria} clientes)</p>
            </div>
            <div>
              <p className="text-blue-100 mb-2">Ticket Mentoria</p>
              <p className="text-3xl font-bold">R$ 4.997,00</p>
            </div>
          </div>
        </div>
        
        {/* Controle de CPA */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎛️ Simulador de CPA</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custo por Aquisição (CPA): {formatCurrency(cpa)}
            </label>
            <input
              type="range"
              min="30"
              max="150"
              value={cpa}
              onChange={(e) => setCpa(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>R$ 30</span>
              <span>R$ 150</span>
            </div>
          </div>
        </div>

        {/* Metas de Comparecimento Semanais */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Metas de Comparecimento Semanais</h2>

          {/* Inputs de comparecimentos semanais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semana 1
              </label>
              <input
                type="number"
                value={comparecimentosSemana1}
                onChange={(e) => setComparecimentosSemana1(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Meta: {metaComparecimentoSemana1}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semana 2
              </label>
              <input
                type="number"
                value={comparecimentosSemana2}
                onChange={(e) => setComparecimentosSemana2(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Meta: {metaComparecimentoSemana2}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semana 3
              </label>
              <input
                type="number"
                value={comparecimentosSemana3}
                onChange={(e) => setComparecimentosSemana3(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Meta: {metaComparecimentoSemana3}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semana 4
              </label>
              <input
                type="number"
                value={comparecimentosSemana4}
                onChange={(e) => setComparecimentosSemana4(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Meta: {metaComparecimentoSemana4}</p>
            </div>
          </div>

          {/* Gráfico de Comparecimentos Semanais */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySchedulingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meta" fill="#94a3b8" name="Meta" />
              <Bar dataKey="realizado" fill="#10b981" name="Realizado" />
            </BarChart>
          </ResponsiveContainer>

          {/* Barras de progresso semanais */}
          <div className="mt-6 space-y-4">
            {weeklySchedulingData.map((week, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">{week.semana}</p>
                  <p className="text-sm text-gray-600">{week.realizado} / {week.meta}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(Number(week.percentual), 100)}%` }}
                  >
                    {Number(week.percentual) > 10 && (
                      <span className="text-xs text-white font-bold">{week.percentual}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metas de Agendamento - Conversão */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Funil de Conversão</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agendamentos
              </label>
              <input
                type="number"
                value={agendamentos}
                onChange={(e) => setAgendamentos(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comparecimentos
              </label>
              <input
                type="number"
                value={comparecimentos}
                onChange={(e) => setComparecimentos(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendas de Mentoria
              </label>
              <input
                type="number"
                value={vendasMentoria}
                onChange={(e) => setVendasMentoria(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Taxa de Comparecimento</p>
              <p className="text-2xl font-bold text-blue-600">
                {agendamentos > 0 ? ((comparecimentos / agendamentos) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Taxa de Conversão em Venda</p>
              <p className="text-2xl font-bold text-green-600">
                {comparecimentos > 0 ? ((vendasMentoria / comparecimentos) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Conversão Total</p>
              <p className="text-2xl font-bold text-purple-600">
                {agendamentos > 0 ? ((vendasMentoria / agendamentos) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
          </div>
        </div>
        
        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Investimento Total"
            value={formatCurrency(investimentoTotal)}
            subtitle={`${totalVendas} vendas × ${formatCurrency(cpa)}`}
            color="#ef4444"
          />
          <StatCard
            icon={TrendingUp}
            title="Receita Total"
            value={formatCurrency(receitaTotalReal)}
            subtitle="Guias + Mentorias"
            color="#10b981"
          />
          <StatCard
            icon={Target}
            title="Lucro Líquido"
            value={formatCurrency(lucroLiquido)}
            subtitle={`ROI: ${roi.toFixed(1)}x`}
            color="#8b5cf6"
          />
          <StatCard
            icon={Users}
            title="CAC Mentoria"
            value={formatCurrency(cacMentoria)}
            subtitle={`${clientesMentoria} clientes mentorias`}
            color="#f59e0b"
          />
        </div>
        
        {/* Gráfico de Investimento Semanal */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Distribuição Semanal de Investimento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'Vendas esperadas') return value;
                  return formatCurrency(Number(value));
                }}
                labelStyle={{ color: '#000' }}
              />
              <Legend />
              <Bar dataKey="investimento" fill="#3b82f6" name="Investimento (R$)" />
              <Bar dataKey="vendas" fill="#10b981" name="Vendas esperadas" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {weeklyData.map((week, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{week.semana}</p>
                <p className="text-xl font-bold text-gray-900">{week.percentual}</p>
                <p className="text-xs text-gray-500">{week.vendas} vendas</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gráfico de Receita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Distribuição de Receita</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Receita Guias:</span>
                <span className="font-bold text-blue-600">{formatCurrency(receitaGuias)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Receita Mentorias:</span>
                <span className="font-bold text-green-600">{formatCurrency(receitaMentoria)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔮 Cenários de ROI</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cenario" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="roi" stroke="#8b5cf6" strokeWidth={3} name="ROI (x)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {scenarioData.map((scenario, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">{scenario.cenario} (CPA: {formatCurrency(scenario.cpa)})</span>
                  <span className="font-bold text-purple-600">ROI: {scenario.roi}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projeção de Investimento Semanal */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💳 Projeção de Investimento em Tráfego por Semana</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Semana</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Meta de Vendas</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Investimento Projetado</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Vendas Realizadas</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Investimento Real</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">CPA Real</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Meta Cumulativa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Semana 1</td>
                  <td className="text-center py-4 px-4 text-gray-700">{vendaSemana1} guias</td>
                  <td className="text-center py-4 px-4 font-bold text-green-600">{formatCurrency(vendaSemana1 * cpa)}</td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={vendasRealizadasSemana1}
                      onChange={(e) => setVendasRealizadasSemana1(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={investimentoRealSemana1}
                      onChange={(e) => setInvestimentoRealSemana1(Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4 text-blue-600 font-semibold">
                    {cpaRealSemana1 > 0 ? formatCurrency(cpaRealSemana1) : '-'}
                  </td>
                  <td className="text-center py-4 px-4 text-gray-700">{vendaSemana1}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Semana 2</td>
                  <td className="text-center py-4 px-4 text-gray-700">{vendaSemana2} guias</td>
                  <td className="text-center py-4 px-4 font-bold text-green-600">{formatCurrency(vendaSemana2 * cpa)}</td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={vendasRealizadasSemana2}
                      onChange={(e) => setVendasRealizadasSemana2(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={investimentoRealSemana2}
                      onChange={(e) => setInvestimentoRealSemana2(Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4 text-blue-600 font-semibold">
                    {cpaRealSemana2 > 0 ? formatCurrency(cpaRealSemana2) : '-'}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={deficitSemana1 > 0 ? "text-orange-600 font-bold" : "text-gray-700"}>
                      {metaCumulativaSemana2}
                      {deficitSemana1 > 0 && <span className="text-xs ml-1">(+{deficitSemana1})</span>}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Semana 3</td>
                  <td className="text-center py-4 px-4 text-gray-700">{vendaSemana3} guias</td>
                  <td className="text-center py-4 px-4 font-bold text-green-600">{formatCurrency(vendaSemana3 * cpa)}</td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={vendasRealizadasSemana3}
                      onChange={(e) => setVendasRealizadasSemana3(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={investimentoRealSemana3}
                      onChange={(e) => setInvestimentoRealSemana3(Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4 text-blue-600 font-semibold">
                    {cpaRealSemana3 > 0 ? formatCurrency(cpaRealSemana3) : '-'}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={(deficitSemana1 > 0 || deficitSemana2 > 0) ? "text-orange-600 font-bold" : "text-gray-700"}>
                      {metaCumulativaSemana3}
                      {(deficitSemana1 + deficitSemana2 > 0) && <span className="text-xs ml-1">(+{deficitSemana1 + deficitSemana2})</span>}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">Semana 4</td>
                  <td className="text-center py-4 px-4 text-gray-700">{vendaSemana4} guias</td>
                  <td className="text-center py-4 px-4 font-bold text-green-600">{formatCurrency(vendaSemana4 * cpa)}</td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={vendasRealizadasSemana4}
                      onChange={(e) => setVendasRealizadasSemana4(Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={investimentoRealSemana4}
                      onChange={(e) => setInvestimentoRealSemana4(Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-center py-4 px-4 text-blue-600 font-semibold">
                    {cpaRealSemana4 > 0 ? formatCurrency(cpaRealSemana4) : '-'}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className={(deficitSemana1 > 0 || deficitSemana2 > 0 || deficitSemana3 > 0) ? "text-orange-600 font-bold" : "text-gray-700"}>
                      {metaCumulativaSemana4}
                      {(deficitSemana1 + deficitSemana2 + deficitSemana3 > 0) && <span className="text-xs ml-1">(+{deficitSemana1 + deficitSemana2 + deficitSemana3})</span>}
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50 font-bold">
                  <td className="py-4 px-4 text-gray-900">TOTAL</td>
                  <td className="text-center py-4 px-4 text-gray-900">{totalVendas} guias</td>
                  <td className="text-center py-4 px-4 text-green-700 text-lg">{formatCurrency(investimentoTotal)}</td>
                  <td className="text-center py-4 px-4 text-gray-900">-</td>
                  <td className="text-center py-4 px-4 text-gray-900">-</td>
                  <td className="text-center py-4 px-4 text-gray-900">-</td>
                  <td className="text-center py-4 px-4 text-gray-900">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>💡 Dica:</strong> A meta cumulativa ajusta automaticamente as semanas seguintes quando há déficit de vendas.
              O investimento projetado é calculado com base no CPA atual ({formatCurrency(cpa)}). Preencha as vendas realizadas e o investimento real para acompanhar o desempenho.
            </p>
          </div>
        </div>

        {/* Estratégia Sugerida */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Estratégia Recomendada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">1. Perpétuo como Funil de Qualificação</h3>
              <p className="text-gray-600">O guia funciona como filtro inicial. O valor simbólico de R$27,00 separa curiosos de quem realmente tem intenção de compra.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg mb-2">2. Atenção no CAC da Mentoria</h3>
              <p className="text-gray-600">Com CAC de {formatCurrency(cacMentoria)}, ainda é altamente lucrativo considerando o ticket de R$4.997,00.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg mb-2">3. Aproveitar Sazonalidade</h3>
              <p className="text-gray-600">Semanas 2 e 3 são picos (30% cada). Escalar campanhas com maior verba e iniciar aquecimento para conversão em mentoria.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold text-lg mb-2">4. Upsell Estruturado</h3>
              <p className="text-gray-600">Após compra do guia, direcionar para jornada de pré-venda da mentoria com nutrição + prova social + CTA direta.</p>
            </div>
          </div>
        </div>
        
        {/* Resumo Executivo */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Resumo Executivo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-green-100 text-sm mb-1">Para cada R$1 investido</p>
              <p className="text-4xl font-bold">R$ {roi.toFixed(2)}</p>
              <p className="text-green-100 text-sm mt-1">de retorno</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-green-100 text-sm mb-1">Margem de Lucro</p>
              <p className="text-4xl font-bold">{((lucroLiquido/receitaTotalReal)*100).toFixed(1)}%</p>
              <p className="text-green-100 text-sm mt-1">sobre receita total</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-green-100 text-sm mb-1">Eficiência do Funil</p>
              <p className="text-4xl font-bold">{taxaConversao.toFixed(1)}%</p>
              <p className="text-green-100 text-sm mt-1">conversão para mentoria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentProjection;