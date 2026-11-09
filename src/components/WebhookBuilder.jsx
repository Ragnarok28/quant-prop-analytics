import React, { useState } from "react";

export default function WebhookBuilder() {
  const [ticker, setTicker] = useState("MGC");
  const [action, setAction] = useState("sell");
  const [quantity, setQuantity] = useState(2);
  const [takeProfit, setTakeProfit] = useState(15);
  const [stopLoss, setStopLoss] = useState(8);
  const [copied, setCopied] = useState(false);

  const payload = {
    ticker,
    action,
    orderType: "market",
    quantity: Number(quantity),
    takeProfit: {
      trailPercent: null,
      limitPrice: `{{plot("TP_${takeProfit}pts")}}`
    },
    stopLoss: {
      type: "stop",
      stopPrice: `{{plot("SL_${stopLoss}pts")}}`
    },
    meta: {
      source: "TradingView_PineScript_v5",
       execution: "TradersPost_Webhook"
    }
  };

  const jsonString = JSON.stringify(payload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="panel">
      <h3>TradingView → TradersPost Webhook Generator</h3>
      <div className="calc-controls">
        <label>
          Ticker
          <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
            <option value="MGC">MGC (Micro Gold)</option>
            <option value="MCL">MCL (Micro Crude Oil)</option>
            <option value="MNQ">MNQ (Micro Nasdaq)</option>
          </select>
        </label>
        <label>
          Signal Action
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="buy">buy (Long Entry)</option>
            <option value="sell">sell (Short Entry)</option>
            <option value="exit">exit (Flatten Position)</option>
          </select>
        </label>
        <label>
          Contracts
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
      </div>

      <pre className="code-block">{jsonString}</pre>
      <button className="btn-primary" onClick={handleCopy}>
        {copied ? "Copied to Clipboard!" : "Copy Alert Payload"}
      </button>
    </div>
  );
}