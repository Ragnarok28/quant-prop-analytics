import React, { useState } from "react";
import { calculatePositionSize } from "../utils/riskEngine";
import { FUTURES_CONTRACTS } from "../data/mockTrades";

export default function DrawdownSimulator({ account, metrics }) {
  const [symbol, setSymbol] = useState("MGC");
  const [riskDollars, setRiskDollars] = useState(150);
  const [stopPoints, setStopPoints] = useState(5.0);

  const posSize = calculatePositionSize(symbol, Number(riskDollars), Number(stopPoints));
  const consistencyStatus =
    account.consistencyRulePercent === 0
      ? "None (Rapid Model)"
      : `${account.consistencyRulePercent}% Max Single Day`;

  return (
    <div className="panel">
      <h3>Account Rules & Position Sizer ({account.name})</h3>
      <div className="rules-grid">
        <div className="rule-box">
          <span className="label">Drawdown Type</span>
          <strong>{account.drawdownType} (${account.maxTrailingDrawdown})</strong>
        </div>
        <div className="rule-box">
          <span className="label">Daily Loss Limit</span>
          <strong>${account.dailyLossLimit}</strong>
        </div>
        <div className="rule-box">
          <span className="label">Liquidation Floor</span>
          <strong className="danger-text">${metrics.trailingThreshold.toLocaleString()}</strong>
        </div>
        <div className="rule-box">
          <span className="label">Consistency Rule</span>
          <strong>{consistencyStatus}</strong>
        </div>
      </div>

      <h4 style={{ marginTop: "18px" }}>Micro Futures Contract Calculator</h4>
      <div className="calc-controls">
        <label>
          Contract
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            {Object.keys(FUTURES_CONTRACTS).map((sym) => (
              <option key={sym} value={sym}>
                {sym} ({FUTURES_CONTRACTS[sym].name})
              </option>
            ))}
          </select>
        </label>
        <label>
          Dollar Risk ($)
          <input
            type="number"
            value={riskDollars}
            onChange={(e) => setRiskDollars(e.target.value)}
          />
        </label>
        <label>
          Stop Distance (Points)
          <input
            type="number"
            step="0.5"
            value={stopPoints}
            onChange={(e) => setStopPoints(e.target.value)}
          />
        </label>
      </div>

      <div className="calc-result">
        <span>Recommended Size: <strong>{posSize.recommendedContracts} Contracts</strong></span>
        <span>Risk / Contract: <strong>${posSize.dollarRiskPerContract}</strong></span>
        <span>Total Actual Risk: <strong>${posSize.totalActualRisk}</strong></span>
      </div>
    </div>
  );
}