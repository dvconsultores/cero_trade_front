<template>
  <Connect2ICProvider :client="client">
    <loader></loader>
    <!-- <router-view /> -->
    <Dashboard></Dashboard>
  </Connect2ICProvider>
</template>

<script setup>
import Dashboard from '@/pages/dashboard.vue'
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
import * as counter from "../.dfx/local/canisters/counter"

const client = createClient({
  canisters: {
    counter,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})
</script>
