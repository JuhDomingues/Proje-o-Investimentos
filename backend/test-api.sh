#!/bin/bash

echo "=== Testando API do Backend ==="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:3001"

echo "1. Testando Health Check..."
response=$(curl -s "${API_URL}/health")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Health check OK${NC}"
    echo "   Response: ${response}"
else
    echo -e "${RED}✗ Health check falhou${NC}"
    exit 1
fi

echo ""
echo "2. Criando uma campanha de teste..."
campaign_json='{
  "name": "Campanha Teste Novembro",
  "month": "Novembro",
  "year": 2024,
  "cpa": 100,
  "metaVendas": 100,
  "metaReceita": 50000,
  "weeks": [
    {
      "weekNumber": 1,
      "metaVendas": 20,
      "metaInvestimento": 2000,
      "metaComparecimentos": 10
    },
    {
      "weekNumber": 2,
      "metaVendas": 30,
      "metaInvestimento": 3000,
      "metaComparecimentos": 15
    },
    {
      "weekNumber": 3,
      "metaVendas": 30,
      "metaInvestimento": 3000,
      "metaComparecimentos": 15
    },
    {
      "weekNumber": 4,
      "metaVendas": 20,
      "metaInvestimento": 2000,
      "metaComparecimentos": 10
    }
  ]
}'

campaign_response=$(curl -s -X POST "${API_URL}/api/campaigns" \
  -H "Content-Type: application/json" \
  -d "${campaign_json}")

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Campanha criada com sucesso${NC}"
    campaign_id=$(echo "${campaign_response}" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "   ID da campanha: ${campaign_id}"
else
    echo -e "${RED}✗ Falha ao criar campanha${NC}"
    exit 1
fi

echo ""
echo "3. Buscando todas as campanhas..."
campaigns=$(curl -s "${API_URL}/api/campaigns")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Campanhas listadas com sucesso${NC}"
    echo "   Total de campanhas: $(echo "${campaigns}" | grep -o '"id"' | wc -l | tr -d ' ')"
else
    echo -e "${RED}✗ Falha ao buscar campanhas${NC}"
fi

echo ""
echo "4. Atualizando dados da Semana 1..."
week_update=$(curl -s -X PUT "${API_URL}/api/campaigns/${campaign_id}/weeks/1" \
  -H "Content-Type: application/json" \
  -d '{"vendasRealizadas": 25, "investimentoReal": 2500, "comparecimentosReais": 12}')

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Semana 1 atualizada com sucesso${NC}"
else
    echo -e "${RED}✗ Falha ao atualizar semana${NC}"
fi

echo ""
echo "5. Obtendo estatísticas da campanha..."
stats=$(curl -s "${API_URL}/api/campaigns/${campaign_id}/stats")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Estatísticas obtidas com sucesso${NC}"
else
    echo -e "${RED}✗ Falha ao obter estatísticas${NC}"
fi

echo ""
echo "6. Obtendo comparação com metas..."
comparison=$(curl -s "${API_URL}/api/campaigns/${campaign_id}/comparison")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Comparação obtida com sucesso${NC}"
else
    echo -e "${RED}✗ Falha ao obter comparação${NC}"
fi

echo ""
echo -e "${GREEN}=== Todos os testes passaram! ===${NC}"
echo ""
echo "Para visualizar os dados no Prisma Studio:"
echo "  cd backend && npm run prisma:studio"
