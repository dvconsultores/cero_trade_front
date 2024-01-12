export class MarketCanister {
  market: any
  constructor({ market }) {
    this.market = market
  }

  init(): void {
    console.log("here", this.market);
  }
}
