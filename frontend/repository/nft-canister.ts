import { useNftCanister } from "@/services/icp-provider";

export class NftCanister {
  canister: any

  constructor() {
    this.canister = useNftCanister()
  }


  init(): void {
    console.log("here", this.canister);
  }
}
