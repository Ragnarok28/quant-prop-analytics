import { FUTURES_CONTRACTS } from "../data/mockTrades";

export function calculateAccountMetrics(account, trades) {
  let currentBalance = account.startingBalance;
  let highWaterMark = account.startingBalance;
  let wins = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  let largestWinningTrade = 0;

  trades.forEach((t) => {
    currentBalance += t.pnl;
    if (currentBalance > highWaterMark) {
      highWaterMark = currentBalance;
    }
    if (t.pnl > 0) {
      wins += 1;
      grossProfit += t.pnl;
      if (t.pnl > largestWinningTrade) largestWinningTrade = t.pnl;
    } else {
      grossLoss += Math.abs(t.pnl);
    }
  });

  const netPnl = currentBalance - account.startingBalance;
  const trailingThreshold = Math.min(
    account.startingBalance,
    highWaterMark - account.maxTrailingDrawdown
  );
  const drawdownBuffer = currentBalance - trailingThreshold;
  const winRate = trades.length ? ((wins / trades.length) * 100).toFixed(1) : "0.0";
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? "99.9" : "0.00";
  const targetProgress = Math.min(100, Math.max(0, (netPnl / account.profitTarget) * 100)).toFixed(1);

  return {
    currentBalance,
    highWaterMark,
    netPnl,
    trailingThreshold,
    drawdownBuffer,
    winRate,
    profitFactor,
    targetProgress,
    largestWinningTrade
  };
}

export function calculatePositionSize(symbol, riskDollars, stopLossPoints) {
  const spec = FUTURES_CONTRACTS[symbol] || FUTURES_CONTRACTS.MGC;
  if (!stopLossPoints || stopLossPoints <= 0 || !riskDollars || riskDollars <= 0) {
    return { recommendedContracts: 0, dollarRiskPerContract: 0, totalActualRisk: 0 };
  }
  const dollarRiskPerContract = stopLossPoints * spec.pointValue;
  const recommendedContracts = Math.floor(riskDollars / dollarRiskPerContract);
  const totalActualRisk = recommendedContracts * dollarRiskPerContract;

  return {
    recommendedContracts,
    dollarRiskPerContract: dollarRiskPerContract.toFixed(2),
    totalActualRisk: totalActualRisk.toFixed(2)
  };
}