export class MarketCanister {
  market: any
  constructor({ market }) {
    this.market = market
  }

  async init(): Promise<void> {
    console.log("here", this.market);
  }
}
