import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, Users, Zap } from 'lucide-react';

const InvestmentProjection = () => {
  const [cpa, setCpa] = useState(100);

  // Cálculos dinâmicos baseados no CPA
  const receitaTotal = 50000; // Meta de faturamento fixo
  const taxaConversao = 9.4; // Taxa de conversão fixa em 9,4%
  const precoGuia = 29.90;
  const precoMentoria = 4997;

  // Calculando quantidade de vendas necessárias para atingir R$ 50k
  // Fórmula: receitaTotal = (vendas × precoGuia) + (vendas × taxaConversao/100 × precoMentoria)
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
  const cacMentoria = investimentoTotal / clientesMentoria;
  
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
              <p className="text-3xl font-bold">Guia 12 Passos - R$ 29,90</p>
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
            value={formatCurrency(receitaTotal)}
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
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">% do Total</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Investimento Tráfego</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">CPA</th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((week, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{week.semana}</td>
                    <td className="text-center py-4 px-4 text-gray-700">{week.vendas} guias</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {week.percentual}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-green-600">{formatCurrency(week.investimento)}</td>
                    <td className="text-center py-4 px-4 text-gray-700">{formatCurrency(cpa)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="py-4 px-4 text-gray-900">TOTAL</td>
                  <td className="text-center py-4 px-4 text-gray-900">{totalVendas} guias</td>
                  <td className="text-center py-4 px-4 text-gray-900">100%</td>
                  <td className="text-right py-4 px-4 text-green-700 text-lg">{formatCurrency(investimentoTotal)}</td>
                  <td className="text-center py-4 px-4 text-gray-700">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>💡 Dica:</strong> As semanas 2 e 3 concentram 60% das vendas ({weeklyData[1].vendas + weeklyData[2].vendas} guias).
              Considere alocar verba extra nessas semanas para maximizar resultados e aproveitar o momento de pico da campanha.
            </p>
          </div>
        </div>

        {/* Estratégia Sugerida */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Estratégia Recomendada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-lg mb-2">1. Perpétuo como Funil de Qualificação</h3>
              <p className="text-gray-600">O guia funciona como filtro inicial. O valor simbólico de R$29,90 separa curiosos de quem realmente tem intenção de compra.</p>
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
              <p className="text-4xl font-bold">{((lucroLiquido/receitaTotal)*100).toFixed(1)}%</p>
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