import { useMarketCanister } from "@/services/icp-provider";

export class MarketCanister {
  canister: any

  constructor() {
    this.canister = useMarketCanister()
  }


  async init(): Promise<void> {
    console.log("here", this.canister);
  }
}
