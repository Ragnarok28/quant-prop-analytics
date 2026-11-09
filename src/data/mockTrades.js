export const PROP_ACCOUNTS = [
  {
    id: "fn-100k-flex",
    name: "100k Flex Evaluation",
    startingBalance: 100000,
    profitTarget: 5000,
    maxTrailingDrawdown: 2500,
    dailyLossLimit: 2500,
    drawdownType: "EOD Trailing",
    consistencyRulePercent: 40
  },
  {
    id: "fn-50k-rapid-1",
    name: "50k Rapid Eval #1",
    startingBalance: 50000,
    profitTarget: 3000,
    maxTrailingDrawdown: 2000,
    dailyLossLimit: 1000,
    drawdownType: "EOD Trailing",
    consistencyRulePercent: 0
  },
  {
    id: "fn-50k-rapid-2",
    name: "50k Rapid Eval #2",
    startingBalance: 50000,
    profitTarget: 3000,
    maxTrailingDrawdown: 2000,
    dailyLossLimit: 1000,
    drawdownType: "EOD Trailing",
    consistencyRulePercent: 0
  }
];

export const FUTURES_CONTRACTS = {
  MGC: { symbol: "MGC", name: "Micro Gold", tickSize: 0.10, tickValue: 1.00, pointValue: 10.0 },
  MCL: { symbol: "MCL", name: "Micro Crude Oil", tickSize: 0.01, tickValue: 1.00, pointValue: 100.0 },
  MNQ: { symbol: "MNQ", name: "Micro E-mini Nasdaq", tickSize: 0.25, tickValue: 0.50, pointValue: 2.0 }
};

export const INITIAL_TRADES = [
  { id: 1, accountId: "fn-100k-flex", date: "2026-11-03", symbol: "MGC", side: "SHORT", contracts: 3, entry: 2748.5, exit: 2741.7, pnl: 204.00, strategy: "EMA-VWAP Cross" },
  { id: 2, accountId: "fn-100k-flex", date: "2026-11-04", symbol: "MCL", side: "LONG", contracts: 2, entry: 71.20, exit: 71.65, pnl: 90.00, strategy: "ADX Trend Band" },
  { id: 3, accountId: "fn-100k-flex", date: "2026-11-05", symbol: "MGC", side: "SHORT", contracts: 2, entry: 2755.0, exit: 2758.5, pnl: -70.00, strategy: "EMA-VWAP Cross" },
  { id: 4, accountId: "fn-100k-flex", date: "2026-11-06", symbol: "MGC", side: "LONG", contracts: 4, entry: 2732.0, exit: 2739.5, pnl: 300.00, strategy: "MACD Momentum" },
  { id: 5, accountId: "fn-100k-flex", date: "2026-11-07", symbol: "MCL", side: "SHORT", contracts: 3, entry: 72.10, exit: 71.55, pnl: 165.00, strategy: "EMA-VWAP Cross" }
];