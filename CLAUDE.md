# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file React application that provides an investment projection dashboard for a mentorship business campaign. The application calculates ROI, revenue projections, and cost analysis for a sales funnel involving a front-end product (guide) that converts to higher-value mentorship services.

## Architecture

**File Structure:**
- `investment_projection.tsx` - Complete React component with all functionality

**Key Dependencies:**
- React with hooks (useState)
- Recharts library for data visualization (BarChart, LineChart, PieChart)
- Lucide React for icons
- Tailwind CSS for styling (className-based styling throughout)

**Component Architecture:**
- Single `InvestmentProjection` component with embedded sub-components
- `StatCard` component for KPI display cards
- Reactive calculations based on adjustable CPA (Cost Per Acquisition) slider

## Business Logic

**Core Metrics:**
- Fixed sales target: 180 guides at R$ 29.90 each
- Variable CPA (R$ 30-150) affects total investment and ROI
- Mentorship conversion rate: 9.4% of guide buyers
- Mentorship price: R$ 4,997.00

**Data Flow:**
1. CPA input drives all calculations
2. Weekly sales distribution (20%, 30%, 30%, 20%)
3. Revenue split between guides and mentorship conversions
4. ROI scenarios with different CPA values

**Calculations:**
- Total investment = CPA × total sales (180)
- Revenue = (guide sales × R$ 29.90) + (mentorship conversions × R$ 4,997)
- CAC for mentorship = total investment ÷ mentorship clients

## Key Components

**Interactive Elements:**
- CPA slider (range: R$ 30-150) in `investment_projection.tsx:101-107`
- Real-time calculation updates based on CPA changes

**Visualizations:**
- Weekly investment distribution (Bar Chart)
- Revenue breakdown pie chart (Guides vs Mentorship)
- ROI scenarios line chart

**Data Structures:**
- `weeklyData` - Static weekly sales distribution
- `scenarioData` - ROI scenarios for different CPA values
- `revenueData` - Revenue breakdown for pie chart

## Development Notes

This is a standalone React component that can be integrated into larger applications. The component uses Brazilian Portuguese for labels and currency formatting (BRL). All styling is done with Tailwind CSS utility classes.

The business model represents a two-tier sales funnel where a low-cost guide serves as lead qualification for high-value mentorship services, typical of Brazilian digital marketing funnels.