export class NftCanister {
  nft: any
  constructor({ nft }) {
    this.nft = nft
  }

  init(): void {
    console.log("here", this.nft);
  }
}
