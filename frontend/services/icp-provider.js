import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { app as vueApp } from "@/main";

// canisters
import * as market from "~market"
import * as nft from "~nft"
import * as users from "~users"


export const canisterImpl = {
  canisterId: process.env.ASSETS_CANISTER_ID
}

export const ICP_PROVIDE_COLLECTION = {
  authClient: 'authClient'
}

export const createActor = (canisterId, idlFactory, options) => {
  const isDevelopment = process.env.DFX_NETWORK !== "ic",
  identity = vueApp._instance.provides.authClient.getIdentity(),
  agent = new HttpAgent({ identity: isDevelopment ? null : identity, ...options?.agentOptions });
  
  // Fetch root key for certificate validation during development
  if (isDevelopment) {
    agent.fetchRootKey().catch(err=>{
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
}

export const useUsersCanister = () => createActor(users.canisterId, users.idlFactory)
export const useNftCanister = () => createActor(nft.canisterId, nft.idlFactory)
export const useMarketCanister = () => createActor(market.canisterId, market.idlFactory)

export default async (app) => {
  const authClient = await AuthClient.create()
  app.provide('authClient', authClient)
}
