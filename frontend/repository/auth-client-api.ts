// @ts-nocheck
import { app } from "@/main";
import { AuthClient } from "@dfinity/auth-client";
import { UsersCanister } from '@/repository/users-canister'

export class ClientAuthApi {
  authClient: AuthClient

  constructor() {
    this.authClient = app._instance.provides.authClient
  }


  signOut(returnTo?: string): void {
    this.authClient.logout({ returnTo })
  }

  signIn(onComplete: Function): void {
    this.authClient.login({
      // 7 days in nanoseconds
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: () => this.onSignedIdentity(onComplete),
    });
  }

  async onSignedIdentity(onComplete: Function): void {
    const usersCanister = new UsersCanister()
    console.log(await usersCanister.getWallet())

    onComplete()
  }
}

export const useAuthClient = () => new ClientAuthApi().authClient