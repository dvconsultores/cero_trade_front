import { useUsersCanister } from "@/services/icp-provider"

export class UsersCanister {
  canister: any

  constructor() {
    this.canister = useUsersCanister()
  }


  async getWallet(): Promise<any> {
    try {
      const res = await this.canister.getWallet()
      console.log(res)
      return res
    } catch (error) {
      console.error(error);
    }
  }

  // addAdmin(level: Nat, user: Principal) {
  // }

  // removeAdmin(user: Principal) {
  // }

  // async createUser(data: {
  //   nombre: string;
  //   typeUser: string;
  //   uid?: string;
  // }): Promise<any> {
  //   try {
  //     const result = await this.canister.createUser(data)
  //     console.log(result);

  //     return result
  //   } catch (error) {
  //     console.error(error);
  //   }
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
