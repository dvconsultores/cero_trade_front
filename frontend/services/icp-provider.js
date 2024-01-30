import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

// canisters
import * as market from "../../.dfx/local/canisters/market"
import * as nft from "../../.dfx/local/canisters/nft"
import * as users from "../../.dfx/local/canisters/users"


export const canisterImpl = {
  // canisterId: '' // <-- prod
  canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai' // <-- develop
}

export const ICP_PROVIDE_COLLECTION = {
  authClient: 'authClient',
  market: 'market',
  nft: 'nft',
  users: 'users'
}

export default async (app) => {
  const
  authClient = await AuthClient.create(),
  identity = authClient.getIdentity(),

  marketActor = Actor.createActor(market.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: market.canisterId,
  }),
  nftActor = Actor.createActor(nft.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: nft.canisterId,
  }),
  usersActor = Actor.createActor(users.idlFactory, {
    agent: new HttpAgent({ identity }),
    canisterId: users.canisterId,
  })

  // provide data to vue
  app
    .provide('authClient', authClient)
    .provide('market', marketActor)
    .provide('nft', nftActor)
    .provide('users', usersActor)
}
