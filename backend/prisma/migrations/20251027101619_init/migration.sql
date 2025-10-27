-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cpa" REAL NOT NULL,
    "metaVendas" INTEGER NOT NULL,
    "metaReceita" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "metaVendas" INTEGER NOT NULL,
    "metaInvestimento" REAL NOT NULL,
    "metaComparecimentos" INTEGER NOT NULL,
    "vendasRealizadas" INTEGER NOT NULL DEFAULT 0,
    "investimentoReal" REAL NOT NULL DEFAULT 0,
    "comparecimentosReais" INTEGER NOT NULL DEFAULT 0,
    "agendamentos" INTEGER NOT NULL DEFAULT 0,
    "vendasMentoria" INTEGER NOT NULL DEFAULT 0,
    "cpaReal" REAL,
    "percentualMeta" REAL,
    "percentualComparecimento" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Week_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_month_year_key" ON "Campaign"("month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Week_campaignId_weekNumber_key" ON "Week"("campaignId", "weekNumber");
