<template>
  <Connect2ICProvider :client="client">
    <test-canister />
    <test-login />
    <slot />
  </Connect2ICProvider>
</template>

<script setup>
import TestCanister from '@/components/connect2ic-canister-test.vue'
import TestLogin from '@/components/connect2ic-login-test.vue'
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider } from "@connect2ic/vue"
/*
 * Import canister definitions like this:
 */
import * as market from "../../.dfx/local/canisters/market"
import * as nft from "../../.dfx/local/canisters/nft"
import * as users from "../../.dfx/local/canisters/users"

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
