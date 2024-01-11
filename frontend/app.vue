<template>
  <Connect2ICProvider :client="client">
    <loader></loader>
    <router-view />
  </Connect2ICProvider>
</template>

<script setup>
import Loader from '@/components/modals/loader.vue'
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider } from "@connect2ic/vue"
import "@connect2ic/core/style.css"
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
