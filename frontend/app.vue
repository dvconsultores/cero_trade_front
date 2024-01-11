<template>
  <Connect2ICProvider :client="client">
    <loader />
    <test-canister />
    <test-login />
    <router-view />
  </Connect2ICProvider>
</template>

<script setup>
import Loader from '@/components/modals/loader.vue'
/*
 * Connect2ic provides essential utilities for IC app development
 */
import TestCanister from '@/components/test-canister.vue'
import TestLogin from '@/components/test-login.vue'
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider } from "@connect2ic/vue"
/*
 * Import canister definitions like this:
 */
import * as market from "../.dfx/local/canisters/market"
import * as nft from "../.dfx/local/canisters/nft"
import * as users from "../.dfx/local/canisters/users"

const client = createClient({
  canisters: {
    market,
    nft,
    users
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})
</script>
