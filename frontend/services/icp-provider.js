import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { app as vueApp } from "@/main";

// canisters
import * as market from "../../.dfx/local/canisters/market"
import * as nft from "../../.dfx/local/canisters/nft"
import * as users from "../../.dfx/local/canisters/users"


export const canisterImpl = {
  // canisterId: '' // <-- prod
  canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai' // <-- develop
}

export const ICP_PROVIDE_COLLECTION = {
  authClient: 'authClient'
}

export const useUsersCanister = () => {
  const identity = vueApp._instance.provides.authClient.getIdentity()

  return Actor.createActor(users.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: users.canisterId,
  })
}

export const useNftCanister = () => {
  const identity = vueApp._instance.provides.authClient.getIdentity()

  return Actor.createActor(users.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: nft.canisterId,
  })
}

export const useMarketCanister = () => {
  const identity = vueApp._instance.provides.authClient.getIdentity()

  return Actor.createActor(users.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: market.canisterId,
  })
}

export default async (app) => {
  const authClient = await AuthClient.create()
  app.provide('authClient', authClient)
}
