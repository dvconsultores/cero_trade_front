<template>
</template>

<script setup>
import { useCanister } from "@connect2ic/vue"
const
[market] = useCanister("market"),
[nft] = useCanister("nft"),
[users] = useCanister("users")

console.log("market", market.value);
console.log("nft", nft.value);
console.log("users", users.value);
</script>