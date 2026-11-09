import React, { useState } from "react";
import { PROP_ACCOUNTS, INITIAL_TRADES } from "./data/mockTrades";
import { calculateAccountMetrics } from "./utils/riskEngine";
import DrawdownSimulator from "./components/DrawdownSimulator";
import WebhookBuilder from "./components/WebhookBuilder";
import "./App.css";

export default function App() {
  const [selectedAccountId, setSelectedAccountId] = useState(PROP_ACCOUNTS[0].id);
  const [trades, setTrades] = useState(INITIAL_TRADES);
  const [newTrade, setNewTrade] = useState({
    symbol: "MGC",
    side: "SHORT",
    contracts: 2,
    pnl: ""
  });

const activeAccount =
    PROP_ACCOUNTS.find((a) => a.id === selectedAccountId) || PROP_ACCOUNTS[0];
  const accountTrades = trades.filter((t) => t.accountId === selectedAccountId);
  const metrics = calculateAccountMetrics(activeAccount, accountTrades);

  const handleAddTrade = (e) => {
    e.preventDefault();
    if (newTrade.pnl === "") return;
    const entry = {
      id: Date.now(),
      accountId: selectedAccountId,
      date: new Date().toISOString().slice(0, 10),
      symbol: newTrade.symbol,
      side: newTrade.side,
      contracts: Number(newTrade.contracts),
      pnl: Number(newTrade.pnl),
      strategy: "Manual / Webhook"
    };
    setTrades([entry, ...trades]);
    setNewTrade({ ...newTrade, pnl: "" });
  };

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <div>
          <h1>QuantProp Analytics</h1>
          <p className="subtitle">Futures Evaluation & Webhook Execution Suite</p>
        </div>
        <div className="account-selector">
          <label>Active Evaluation:</label>
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            {PROP_ACCOUNTS.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} (${acc.startingBalance.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="kpi-row">
        <div className="kpi-card">
          <span>Account Balance</span>
          <h2>${metrics.currentBalance.toLocaleString()}</h2>
          <small className={metrics.netPnl >= 0 ? "pos" : "neg"}>
            Net PnL: ${metrics.netPnl.toFixed(2)}
          </small>
        </div>
        <div className="kpi-card">
          <span>Drawdown Buffer</span>
          <h2>${metrics.drawdownBuffer.toLocaleString()}</h2>
          <small>Floor: ${metrics.trailingThreshold.toLocaleString()}</small>
        </div>
        <div className="kpi-card">
          <span>Target Progress</span>
          <h2>{metrics.targetProgress}%</h2>
          <small>Target: +${activeAccount.profitTarget.toLocaleString()}</small>
        </div>
        <div className="kpi-card">
          <span>Win Rate / PF</span>
          <h2>{metrics.winRate}%</h2>
          <small>Profit Factor: {metrics.profitFactor}</small>
        </div>
      </section>

      <div className="main-grid">
        <DrawdownSimulator account={activeAccount} metrics={metrics} />
        <WebhookBuilder />
      </div>

      <section className="panel trade-log-panel">
        <div className="log-header">
          <h3>Execution Log & Quick Trade Simulator</h3>
          <form className="quick-form" onSubmit={handleAddTrade}>
            <select
              value={newTrade.symbol}
              onChange={(e) => setNewTrade({ ...newTrade, symbol: e.target.value })}
            >
              <option value="MGC">MGC</option>
              <option value="MCL">MCL</option>
              <option value="MNQ">MNQ</option>
            </select>
            <select
              value={newTrade.side}
              onChange={(e) => setNewTrade({ ...newTrade, side: e.target.value })}
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
            <input
              type="number"
              placeholder="PnL ($)"
              value={newTrade.pnl}
              onChange={(e) => setNewTrade({ ...newTrade, pnl: e.target.value })}
            />
            <button type="submit" className="btn-primary">
              + Log Trade
            </button>
          </form>
        </div>

        <table className="trade-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Contract</th>
              <th>Side</th>
              <th>Size</th>
              <th>Strategy</th>
              <th>Net PnL</th>
            </tr>
          </thead>
          <tbody>
            {accountTrades.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td><strong>{t.symbol}</strong></td>
                <td>
                  <span className={`badge ${t.side.toLowerCase()}`}>{t.side}</span>
                </td>
                <td>{t.contracts}</td>
                <td>{t.strategy}</td>
                <td className={t.pnl >= 0 ? "pos" : "neg"}>
                  {t.pnl >= 0 ? `+$${t.pnl.toFixed(2)}` : `-$${Math.abs(t.pnl).toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}