export class UsersCanister {
  canister: any
  constructor({ users }) {
    this.canister = users
  }

  getWallet() {
    this.canister.getWallet()
  }

  // addAdmin(level: Nat, user: Principal) {
  // }

  // removeAdmin(user: Principal) {
  // }

  // createUser(data: Types.InputDataUser) {
  // }

  // addRedention(irecId: Types.IrecId, tokenId: Nat, operator: Types.User) {
  // }

  // tokenizeIrec(irecId: Types.IrecId, metadata: TypesNft.MetadataDesc) {
  // }

  // getAdmin(user : Types.User) {
  // }

  // getUser(user : Types.User) {
  // }

  // getIrecTokens(user : Types.User) {
  // }

  // getRedentions(user : Types.User) {
  // }
}
