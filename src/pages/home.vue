<template>
  <div id="home">
    <img src="@/assets/sources/images/side-img-1.png" alt="Side banner" class="side-banner">
    <v-window v-model="windowStep" :show-arrows="false">
      <!-- registration -->
      <v-window-item :value="1">
        <div class="container-windows-step">
          <v-card class="card ml-2 card-register">
            <img src="@/assets/sources/icons/logo.svg" alt="Logo" class="img-logo mb-6">
            <h5 class="mb-1">HELLO</h5>
            <p class="font300 color-grey">Please enter your company details</p>
            <v-row>
              <v-col xl="6" lg="6" md="6" cols="12">
                <label for="companey-name">Company name</label>
                <v-text-field id="company-name" class="input" variant="outlined" elevation="0" placeholder="name@cerotrade.com"></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                <label for="companey-id">Company ID</label>
                <v-text-field id="company-id" class="input" variant="outlined" elevation="0" placeholder="123456789"></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                <label for="city">City</label>
                <v-text-field id="city" class="input" variant="outlined" elevation="0" placeholder="New York"></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                <label for="country">Country</label>
                <v-text-field id="country" class="input" variant="outlined" elevation="0" placeholder="USA"></v-text-field>
              </v-col>
              <v-col cols="12">
                <label for="company-address">Company address</label>
                <v-text-field id="company-address" class="input" variant="outlined" elevation="0" placeholder="Enter your company full address"></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                <label for="password">Password</label>
                <v-text-field
                id="confirm-password" class="input" variant="outlined" elevation="0" 
                :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show_password ? 'text' : 'password'"
                @click:append-inner="show_password = !show_password"
                ></v-text-field>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                <label for="confirm-password">Confirm password</label>
                <v-text-field
                id="confirm-password" class="input" variant="outlined" elevation="0" 
                :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show_password ? 'text' : 'password'"
                @click:append-inner="show_password = !show_password"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn class="center btn" @click="windowStep = 2">Create account <v-icon style="margin-bottom: -3px; margin-left: 5px;">mdi-arrow-right</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-window-item>

      <!-- Verification Email -->
      <v-window-item :value="2">
        <div class="container-windows-step">
          <v-card class="card ml-2 card-register pt-10 pb-10">
            <img src="@/assets/sources/icons/logo.svg" alt="Logo" class="img-logo mb-6">
            <h5 class="mb-1">Please verify your email</h5>
            <p class="font300 color-grey">Please enter security code you received on your email</p>
            
            <v-row>
              <v-col cols="12" class="jstart astart divcol">
                <label for="otp" style="font-weight: 500; color: #000;">Secure Code</label>
                <v-otp-input id="otp"></v-otp-input>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import '@/assets/styles/pages/home.scss'

export default {
  data(){
    return{
      windowStep: 1,
      show_password: false,
    }
  },
}
</script>
