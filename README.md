# quant-prop-analytics

Personal React dashboard for tracking prop firm evaluation rules (50k Rapid / 100k Flex), drawdown buffers, and TradersPost webhook payloads for MGC and MCL futures.

### Features
- EOD and intraday trailing drawdown calculator
- Position sizing by tick value (MGC, MCL, MNQ)
- JSON payload generator for TradingView -> TradersPost alerts
- Basic trade log and expectancy tracker

### To-Do / Roadmap
- [ ] CSV import for Tradovate trade exports
- [ ] Add consistency rule % warnings
- [ ] Slippage calculator for webhook market orders

### Run locally
npm install
npm run dev