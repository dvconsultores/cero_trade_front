<template>
  <div id="support">
    <span class="mb-4 acenter span-navigation">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" class="icon-img">
      <v-icon>mdi-chevron-right</v-icon> 
      <span class="green-span">Support</span>
    </span>
    <h3 class="bold">Support</h3>
    <span class="mbb16 mb-6 grey-span">Lorem ipsum dolor sit amet.</span>

    <v-card class="card divcol mb-4 card-bg-diferent">
      <h5>Quick links</h5>
      <span class="mb-2 green-span font12"><v-icon color="#00555B" class="mr-2">mdi-file-document-check-outline</v-icon> Documentation</span>
    </v-card>

    <v-card class="card divcol mb-4" style="min-height: 100px!important; max-width: 300px!important;">
      <h5>Contact information</h5>
      <span class="mb-2 bold green-span font12"><v-icon color="#00555B" class="mr-2">mdi-phone-in-talk-outline</v-icon> +123 45 123 123 4</span>
      <span class="mb-2 bold green-span font12"><v-icon color="#00555B" class="mr-2">mdi-email-open-outline</v-icon> support@officemail.com</span>
    </v-card>
  </div>
</template>

<script>
import '@/assets/styles/pages/support.scss'

export default{
  setup(){


    return{

    }
  },

  methods:{

  }
}
</script>