<template>
  <div id="settings">
    <span class="mb-10 acenter" style="color:#475467 ;font-size: 16px; font-weight: 700;">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" style="width: 20px;">
      <v-icon>mdi-chevron-right</v-icon> 
      <span style="color: #00555B;">Settings</span>
    </span>
    <h3>Settings</h3>
    <span class="mb-16" style="color:#475467">Lorem ipsum dolor sit amet.</span>

    <v-row>
      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <v-icon class="mb-10">mdi-information-outline</v-icon>
          <h5 class="mb-6">Company information</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogCompany = true">
            Edit personal information <v-icon>mdi-account-edit-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col>

      <!-- <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <img class="mb-10" src="@/assets/sources/icons/wallet.svg" alt="Wallet">
          <h5 class="mb-6">Connect your wallet</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogConect = true">
            Connect +
          </v-btn>
        </v-card>
      </v-col> -->

      <!-- <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <v-icon class="mb-10" color="#000">mdi-lock-outline</v-icon>
          <h5 class="mb-6">2FA Authentification</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialog2fa = true">
            Setup <v-icon>mdi-lock-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col> -->

      <!-- <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <v-icon class="mb-10" color="#000">mdi-check-decagram-outline</v-icon>
          <h5 class="mb-6">Veirfy as participant</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogParticipant = true">
            Veirfy as participant <v-icon>mdi-check-decagram-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col> -->

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <img class="mb-10" src="@/assets/sources/icons/ring-belt.svg" alt="Wallet" style="width: 21px; height: 21px;">
          <h5 class="mb-6">Notification</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogNotification = true">
            Setup <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col>

      <!-- <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <img class="mb-10" src="@/assets/sources/icons/password-resset.svg" alt="Password reset" style="width: 21px; height: 21px;">
          <h5 class="mb-6">Reset password</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogResetPassword = true">
            Reset your password <v-icon>mdi-sync</v-icon>
          </v-btn>
        </v-card>
      </v-col> -->

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <v-icon class="mb-10">mdi-headphones</v-icon>
          <h5 class="mb-6">Support</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="$router.push('support')">
            Contact Support <v-icon>mdi-headphones</v-icon>
          </v-btn>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="background-color: #F9FAFB!important;">
          <img src="@/assets/sources/icons/domain.svg" alt="Domain" class="mb-10" style="width: 25px;">
          <h5 class="mb-6">Beneficiary accounts</h5>
          <span class="tertiary" style="font-weight: 300;">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, Modi voluptate nobis ducimus tempora? Alias.
          </span>
          <v-btn class="btn mt-6" @click="dialogBeneficiary = true">
            Edit accounts <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Notifications -->
    <v-dialog v-model="dialogNotification" persistent>
      <v-card class="card card-dialog-notification">
        <v-icon class="close" @click="dialogNotification = false">mdi-close</v-icon>
        <v-sheet class="mb-10 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/ring-belt.svg" alt="Password reset" style="width: 25px; height: 25px;">
          </v-sheet>
        </v-sheet>
        <h5 class="bold">Notification</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>

        <v-tabs
          v-model="tabsWindow"
          bg-color="transparent"
          color="basil"
          class="mt-5"
        >
          <v-tab :value="1" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            In-app notifications
          </v-tab>
          <v-tab :value="2" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Push notifications
          </v-tab>
        </v-tabs>

        <v-window v-model="tabsWindow">
          <v-window-item :value="1">
            <div class="divrow pl-3 pr-3 mt-6 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 mb-6 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>
          </v-window-item>

          <v-window-item :value="2">
            <div class="divrow pl-3 pr-3 mt-6 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>

            <div class="divrow pl-3 pr-3 mt-3 mb-6 pl0-pr0-mobile" style="gap: 20px;">
                <v-switch density="compact" inset color="#C6F221" hide-details style="max-width: 50px;"></v-switch>
                <div class="divcol astart jcenter">
                  <span class="bold">
                    Lorem Ipsum
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
            </div>
          </v-window-item>
        </v-window>

        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogNotification = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="dialogNotification = false;" style="border: none!important;">Save changes <v-icon>mdi-content-save-outline</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Reset Password -->
    <v-dialog v-model="dialogResetPassword" persistent>
      <v-card class="card card-dialog-reset">
        <v-icon class="close" @click="dialogResetPassword = false">mdi-close</v-icon>
        <v-sheet class="mb-10 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/password-resset.svg" alt="Password reset" style="width: 25px; height: 25px;">
          </v-sheet>
        </v-sheet>
        <h5>Reset Password</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>

        <v-row class="mt-4">
          <v-col cols="12">
            <label for="password">New Password</label>
            <v-text-field
            id="confirm-password" class="input" variant="solo" flat elevation="0" 
            :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show_password ? 'text' : 'password'"
            @click:append-inner="show_password = !show_password"
            placeholder="Enter your password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <label for="confirm-password">Confirm password</label>
            <v-text-field
            id="confirm-password" class="input" variant="solo" flat elevation="0" 
            :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show_password ? 'text' : 'password'"
            @click:append-inner="show_password = !show_password"
            placeholder="Enter your password"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogResetPassword = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="dialogResetPassword = false;" style="border: none!important;">Reset your password <v-icon>mdi-sync</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog information -->
    <v-dialog v-model="dialogCompany" persistent>
      <v-card class="card card-dialog-company">
        <v-icon class="close" @click="dialogCompany = false">mdi-close</v-icon>
        <v-sheet class="mb-10 double-sheet">
          <v-sheet>
            <v-icon style="width: 25px;">mdi-account-multiple-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Company information</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>

        <div class="divrow mt-4 mb-6 acenter" style="gap: 15px;">
          <img src="@/assets/sources/images/company-logo.svg" alt="Logo" style="width: 45px;">

          <span style="color: #667085;"><img src="@/assets/sources/icons/cloud-upload.svg" alt="Logo" style="width: 15px;"> Replace Company Logo</span>
        </div>

        <v-row>
          <v-col xl="6" lg="6" cols="12">
            <label for="company-name">Company name</label>
            <v-text-field id="company-name" class="input" variant="solo" flat elevation="0" placeholder="ABC Company"></v-text-field>
          </v-col>

          <v-col xl="6" lg="6" cols="12">
            <label for="company-id">Company ID</label>
            <v-text-field id="company-id" class="input" variant="solo" flat elevation="0" placeholder="0000000000"></v-text-field>
          </v-col>

          <v-col xl="6" lg="6" cols="12">
            <label for="city">City</label>
            <v-text-field id="city" class="input" variant="solo" flat elevation="0" placeholder="New York"></v-text-field>
          </v-col>

          <v-col xl="6" lg="6" cols="12">
            <label for="country">Country</label>
            <v-select 
            id="country" class="input" variant="solo" flat 
            elevation="0" placeholder="USA"
            menu-icon="mdi-chevron-down"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <label for="address">Company address</label>
            <v-text-field id="address" class="input" variant="solo" flat elevation="0" placeholder="office@abccompany.com"></v-text-field>
          </v-col>
        </v-row>

        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogCompany = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="dialogCompany = false;" style="border: none!important;">Save changes <v-icon>mdi-content-save-outline</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog conect -->
    <v-dialog v-model="dialogConect" persistent>
      <v-card class="card card-dialog-connect">
        <v-icon class="close" @click="dialogConect = false">mdi-close</v-icon>
        <v-sheet class="mb-10 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/wallet.svg" alt="Wallet" style="width: 25px; height: 25px;">
          </v-sheet>
        </v-sheet>
        <h5>Connect wallet</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>
        <v-row class="mt-6">
          <v-col xl="4" lg="4" md="6" cols="12">
            <v-card class="card divcol astart jcenter">
              <div class="divrow mb-4" style="gap: 10px;">
                <img src="@/assets/sources/icons/visa.svg" alt="Visa">
                <img src="@/assets/sources/icons/mastercard.svg" alt="Mastercard">
                <img src="@/assets/sources/icons/mastercard-yellow.svg" alt="Mastercard">
              </div>

              <h6 class="mb-4" style="font-weight: 700;">Credit / Debit cards</h6>

              <v-btn class="btn" @click="dialogConect = false; dialogCreditCrad = true">Connect</v-btn>
            </v-card>
          </v-col>

          <v-col xl="4" lg="4" md="6" cols="12">
            <v-card class="card divcol astart jcenter">
              <div class="divrow mb-4" style="gap: 10px;">
                <img src="@/assets/sources/icons/bticoin.svg" alt="Bitcoin">
                <img src="@/assets/sources/icons/ethereum.svg" alt="Ethereum">
              </div>

              <h6 class="mb-4" style="font-weight: 700;">Payment with cryptocurrency</h6>

              <v-btn class="btn">Connect</v-btn>
            </v-card>
          </v-col>

          <v-col xl="4" lg="4" md="6" cols="12">
            <v-card class="card divcol astart jcenter">
              <div class="divrow mb-4" style="gap: 10px;">
                <img src="@/assets/sources/icons/bank.svg" alt="Bank">
              </div>

              <h6 class="mb-4" style="font-weight: 700;">Bank transfer</h6>

              <v-btn class="btn">Connect</v-btn>
            </v-card>
          </v-col>

          <v-col xl="4" lg="4" md="6" cols="12">
            <v-card class="card divcol astart jcenter">
              <div class="divrow mb-4" style="gap: 10px;">
                <img src="@/assets/sources/icons/tether.svg" alt="Tether">
              </div>

              <h6 class="mb-4" style="font-weight: 700;">Payment with stablecoins</h6>

              <v-btn class="btn">Connect</v-btn>
            </v-card>
          </v-col>

          <v-col xl="4" lg="4" md="6" cols="12">
            <v-card class="card divcol astart jcenter">
              <div class="divrow mb-4" style="gap: 10px;">
                <img src="@/assets/sources/icons/internet-computer-icon.svg" alt="ICP">
              </div>

              <h6 class="mb-4" style="font-weight: 700;">Payment with ICP</h6>

              <v-btn class="btn">Connect</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Dialog Credit Card -->
    <v-dialog v-model="dialogCreditCrad" persistent>
      <v-card class="card card-dialog-credit-card">
        <v-icon class="close" @click="dialogCreditCrad = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Credit card connect</h5>
        <v-row class="mt-6">
          <v-col cols="12">
            <label for="card-name">Card issuer name</label>
            <v-text-field id="card-name" class="input" variant="solo" flat elevation="0" placeholder="Olivia Cero"></v-text-field>
          </v-col>
          <v-col cols="12">
            <label for="card-number">Card number</label>
            <v-text-field
            id="card-number" class="input" variant="solo" flat 
            elevation="0" placeholder="Card number"
            append-inner-icon="mdi-help-circle-outline"
            >
            <template v-slot:prepend-inner>
              <img src="@/assets/sources/icons/mastercard-yellow.svg" alt="Icono" />
            </template>
            </v-text-field>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="expiration">Expiration date</label>
            <v-text-field id="expiration" class="input" variant="solo" flat elevation="0" placeholder="12/24"></v-text-field>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <label for="cvc">Enter CVC</label>
            <v-text-field id="cvc" class="input" variant="solo" flat elevation="0" placeholder="Enter CVC" append-inner-icon="mdi-help-circle-outline"></v-text-field>
          </v-col>
        </v-row>
        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogCreditCrad = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="dialogCreditCrad = false; walletStatus = true">Confirm <v-icon>mdi-check</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog 2fa -->
    <v-dialog v-model="dialog2fa" persistent>
      <v-card class="card card-dialog-2fa">
        <v-icon class="close" @click="dialog2fa = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-shield-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Add 2-factor verification</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
        <v-row class="mt-6">
          <v-col cols="12">
            <label for="card-number">Add mobile phone</label>
            <v-text-field
            id="card-number" class="input" variant="solo" flat 
            elevation="0" placeholder="+1 (555) 000-0000"
            append-inner-icon="mdi-help-circle-outline"
            >
            <v-select
              v-model="selectedLang"
              :items="items"
              variant="solo"
              flat
              menu-icon="mdi-chevron-down"
              class="select"
              bg-color="transparent"
              hide-details
              style="color: #000;z-index: 99;"
            ></v-select>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;" @click="dialog2fa = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="dialog2fa = false; dialogPhone = true">Confirm <v-icon>mdi-check</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog OTP -->
    <v-dialog v-model="dialogPhone" persistent>
      <v-card class="card card-dialog-2fa">
        <v-icon class="close" @click="dialogPhone = false; status2fa = true">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-shield-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Verify your phone</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
        <v-row class="mt-6">
          <v-col cols="12">
            <label for="otp">Secure code</label>
            <v-otp-input id="otp" :length="4"></v-otp-input>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Dialog verify -->
    <v-dialog v-model="dialogParticipant" persistent>
      <v-card class="card card-dialog-participant">
        <v-icon class="close" @click="dialogParticipant = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-check-decagram-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Verify as participant</h5>
        <div class="divrow jspace" style="gap: 30px;">
          <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
          <v-btn class="btn" style="border: none!important;" @click="dialogParticipant = false; dialogParticipantForm = true">Become a participant</v-btn>
        </div>
        <span class="tertiary mt-4" style="font-weight: 700;"><v-icon>mdi-help-circle-outline</v-icon> How to become a participant</span>
        <v-row class="mt-6">
          <v-col xl="6" lg="6" md="6" cols="12">
            <v-card class="card pt-6 pb-6" style="height: 100%!important;"> 
              <h6>Non-participant</h6>
              <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
              <v-divider :thickness="2" class="tertiary mt-4 mb-4" style="height: 1px;width: 150%;position: relative; left: -80px;"></v-divider>
              <div class="divcol astart ml-6" style="gap: 20px;">
                <span><v-icon class="check mr-2">mdi-check</v-icon> Acces to basic features</span>
                <span><v-icon class="check mr-2">mdi-check</v-icon> Basic reporting + analytics</span>
                <span><v-icon class="check mr-2">mdi-check</v-icon> Up to 10 individual users</span>
              </div>
            </v-card>
          </v-col>
          <v-col xl="6" lg="6" md="6" cols="12">
            <v-card class="card pt-6 pb-6"> 
              <h6>Participant</h6>
              <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
              <v-divider :thickness="2" class="tertiary mt-4 mb-4" style="height: 1px;width: 150%;position: relative; left: -80px;"></v-divider>
              <div class="divcol astart ml-6" style="gap: 20px;">
                <span><v-icon class="check-green mr-2">mdi-check</v-icon> Acces to basic features</span>
                <span><v-icon class="check-green mr-2">mdi-check</v-icon> Basic reporting + analytics</span>
                <span><v-icon class="check-green mr-2">mdi-check</v-icon> Up to 10 individual users</span>
                <span><v-icon class="check-green mr-2">mdi-check</v-icon> 20GB individual data</span>
                <span><v-icon class="check-green mr-2">mdi-check</v-icon> Basic chat support</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Dialog participant form -->
    <v-dialog v-model="dialogParticipantForm" persistent>
      <v-card class="card card-dialog-form">
        <v-icon class="close" @click="dialogParticipantForm = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-check-decagram-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h5>Verify as participant</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
        <span class="tertiary mt-4" style="font-weight: 700;"><v-icon>mdi-help-circle-outline</v-icon> How to become a participant</span>
        <v-row class="mt-6">
          <v-col cols="12">
            <label for="credential">Credential ID</label>
            <v-text-field
            id="credential" class="input" variant="solo" flat elevation="0" 
            placeholder="Enter credential ID" append-inner-icon="mdi-help-circle-outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <label for="password">Password</label>
            <v-text-field
            id="password" class="input" variant="solo" flat elevation="0" 
            :append-inner-icon="show_password ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show_password ? 'text' : 'password'"
            placeholder="Enter password"
            @click:append-inner="show_password = !show_password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn class="btn" style="min-width: 100%!important;" @click="dialogParticipantForm = false ;dialogPending = true">
              Verify
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- Dialog pending -->
    <v-dialog v-model="dialogPending" persistent>
      <v-card class="card card-dialog-2fa">
        <v-icon class="close" @click="dialogPending = false; verifyStatus = true">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/loading.svg" alt="loading" style="width: 30px;">
          </v-sheet>
        </v-sheet>
        <h5>Verification pending</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
      </v-card>
    </v-dialog>
    <!-- Dialog Beneficiary Account -->
    <v-dialog v-model="dialogBeneficiary" persistent>
      <v-card class="card card-dialog-notification">
        <v-icon class="close" @click="dialogBeneficiary = false;">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/domain.svg" alt="Domain" style="width: 25px;">
          </v-sheet>
        </v-sheet>
        <h5 class="bold">Beneficiary accounts</h5>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>

        <div class="div-radio-sell mb-0" v-for="(item, index) in dataBanks" :key="index">
          <v-sheet class="double-sheet">
            <v-sheet>
              <v-icon>mdi-bank-outline</v-icon>
            </v-sheet>
          </v-sheet>
          <div class="divcol ml-6">
            <span class="bold">{{ item.account_name }}</span>
            <span>{{ item.address_bank }}</span>
          </div>
        </div>

        <div class="div-radio-sell" @click="dialogNewBeneficiary = true; dialogBeneficiary = false">
          <v-sheet class="double-sheet">
            <v-sheet>
              <v-icon>mdi-plus-box-outline</v-icon>
            </v-sheet>
          </v-sheet>
          <div class="divcol ml-6">
            <span class="bold">Add an account</span>
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- New Beneficiary Account -->
    <v-dialog v-model="dialogNewBeneficiary" persistent>
      <v-card class="card card-dialog-company">
        <v-icon class="close" @click="dialogNewBeneficiary = false">mdi-close</v-icon>
        <v-sheet class="mb-10 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/domain.svg" alt="Domain" style="width: 25px;">
          </v-sheet>
        </v-sheet>
        <h5 class="bold">New beneficiary account</h5>
        <span class="tertiary mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>

        <v-row>
          <v-col cols="12">
            <label for="account-name">Account name</label>
            <v-text-field 
            v-model="account_name"
            id="account-name" class="input" 
            variant="solo" flat elevation="0" placeholder="Insert account name"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label for="address">Address</label>
            <v-text-field 
            v-model="address_bank"
            id="address" class="input" variant="solo" flat 
            elevation="0" placeholder="Insert address"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label for="country">Country</label>
            <v-select
            id="country" class="input" variant="solo" flat elevation="0" 
            placeholder="Choose country"
            menu-icon="mdi-chevron-down"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <label for="location">Location</label>
            <v-text-field 
            id="location" class="input" variant="solo" flat 
            elevation="0" placeholder="Enter location"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label for="address">Company address</label>
            <v-text-field id="address" class="input" variant="solo" flat elevation="0" placeholder="office@abccompany.com"></v-text-field>
          </v-col>
        </v-row>

        <div class="divrow mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogNewBeneficiary = false">Cancel <v-icon>mdi-close</v-icon></v-btn>
          <v-btn class="btn" @click="pushBanks()" style="border: none!important;">Create account <v-icon>mdi-plus-box-outline</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import '@/assets/styles/pages/settings.scss'
import { ref } from 'vue'

export default{
  setup(){
      const tabsWindow = ref(1);
      const dialogNotification = ref(false);
      const show_password= ref(false);
      const dialogResetPassword= ref(false);
      const dialogCompany= ref(false);
      const walletStatus= ref(false);
      const status2fa= ref(false);
      const verifyStatus= ref(false);
      const dialogParticipantForm= ref(false);
      const dialogPending= ref(false);
      const dialogParticipant= ref(false);
      const dialogPhone= ref(false);
      const items= ["US", "UK"];
      const selectedLang= ref('USA');
      const dialogConect= ref(false);
      const dialogCreditCrad= ref(false);
      const dialog2fa= ref(false);
      const dialogBeneficiary= ref(false);
      const dialogNewBeneficiary= ref(false);

      const dataBanks = ref([]);
      const address_bank = ref('');
      const account_name = ref('');

    return{
      tabsWindow,
      dialogNotification,
      show_password,
      dialogResetPassword,
      dialogCompany,
      walletStatus,
      status2fa,
      verifyStatus,
      dialogParticipantForm,
      dialogPending,
      dialogParticipant,
      dialogPhone,
      items,
      selectedLang,
      dialogConect,
      dialogCreditCrad,
      dialog2fa,
      dialogBeneficiary,
      dialogNewBeneficiary,
      dataBanks,
      address_bank,
      account_name,
    }
  },

  methods:{
    pushBanks() {
      if (this.address_bank && this.account_name) {
        this.dataBanks.push({
          address_bank: this.address_bank,
          account_name: this.account_name
        });

        this.address_bank = '';
        this.account_name = '';
        this.dialogNewBeneficiary = false;
        this.dialogBeneficiary = true;
        this.dialog
      } else {
        console.error('Ambos campos deben ser llenados.');
      }
    }
  }
}

</script>