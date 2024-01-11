<template>
  <div id="login">
    <img src="@/assets/sources/images/side-img-2.png" alt="Side banner" class="side-banner">
    <v-window v-model="windowStep" :show-arrows="false">
      <!-- login -->
      <v-window-item :value="1">
        <div class="container-windows-step">
          <v-card class="card ml-2 card-register">
            <v-sheet class="sheet-img mb-6 delete-mobile">
              <img src="@/assets/sources/icons/logo.svg" alt="Logo" class="img-logo">
            </v-sheet>
            <h5 class="mb-4 show-mobile">Login here</h5>
            <!-- <p class="font300 color-grey">Please enter your login details</p> -->
            <v-row>
              <!-- <v-col cols="12">
                <label for="email-address">Email address</label>
                <v-text-field id="email-address" class="input" variant="outlined" elevation="0" placeholder="Enter email address"></v-text-field>
              </v-col> -->

              <!-- <v-col cols="12">
                <label for="password">Password</label>
                <v-text-field
                id="password" class="input" variant="outlined" elevation="0" 
                :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show_password ? 'text' : 'password'"
                placeholder="Enter your password"
                @click:append-inner="show_password = !show_password"
                ></v-text-field>
              </v-col> -->

              <!-- <span style="color: #667085; font-weight: 700;" class="ml-4">
                <img src="@/assets/sources/icons/help-octagon.svg" alt="Help Octagon" class="help-octagon"> Forgot your password
              </span> -->

              <v-col cols="12">
                <ConnectButton />
                <!-- <v-btn class="center btn2" @click="$router.push('/dashboard')">Login with Internet Identity <img src="@/assets/sources/icons/internet-computer-icon.svg" alt="IC icon" class="ic-icon"></v-btn> -->
              </v-col>
              
              <ConnectDialog />

              <!-- <v-col cols="12">
                <v-btn class="center btn" @click="windowStep = 2; $router.push('/dashboard')">Log in <v-icon style="margin-bottom: -3px; margin-left: 5px;">mdi-login</v-icon></v-btn>
              </v-col> -->
            </v-row>
          </v-card>
        </div>
      </v-window-item>

      <!-- Verification Email -->
      <v-window-item :value="2">
        <div class="container-windows-step code">
          <v-card class="card ml-2 card-register pt-10 pb-10">
            <v-sheet class="sheet-img mb-6">
              <img src="@/assets/sources/icons/logo.svg" alt="Logo" class="img-logo">
            </v-sheet>
            <h5 class="mb-1">2-factor verification</h5>
            <p class="font300 color-grey">Please enter security code you received on your email</p>
            
            <v-row>
              <v-col cols="12" class="jstart astart divcol">
                <label for="otp" style="font-weight: 500; color: #000;">Secure Code</label>
                <v-otp-input id="otp"></v-otp-input>
              </v-col>

              <v-col cols="12">
                <v-btn class="btn2">Resend Code</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import '@/assets/styles/pages/login.scss'
import "@connect2ic/core/style.css"
import icIcon from '@/assets/sources/icons/internet-computer-icon.svg'
import { ConnectButton, ConnectDialog, useWallet, useBalance } from "@connect2ic/vue"
import { ref } from 'vue'

const connectButtonRef = '.connect-button'

export default {
  components: { ConnectButton, ConnectDialog },
  setup() {
    const
    [wallet] = useWallet(),
    [assets] = useBalance()

    return{
      windowStep: ref(1),
      show_password: ref(false),
      wallet,
      assets
    }
  },
  mounted() {
    this.connectButtonStyles()

    // FIXME should show these values
    console.log("wallet", this.wallet);
    console.log("assets", this.assets);
  },
  watch: {
    connectButtonListener() {
      this.connectButtonStyles()
    }
  },
  computed: {
    connectButtonListener() {
      const connectButton = document.querySelector(connectButtonRef)
      return connectButton?.textContent.trim()
    }
  },
  methods: {
    connectButtonStyles() {
      const connectButton = document.querySelector(connectButtonRef)

      // update styles
      connectButton.className = "connect-button .v-btn btn2 center"

      // update html
      const innerText = connectButton.textContent.trim() === 'Connect' ? 'Login with Internet Identity' : 'Disconnect'
      connectButton.innerHTML = `<span class="center">${innerText} <img src=${icIcon} alt="IC icon" class="ic-icon"></span>`
    }
  },
}
</script>