<template>
  <nav id="navbar" class="flex-center">
    <div id="navbar__wrapper">
      <div class="center divrow displaynone" style="gap: 15px;">
        <img src="@/assets/sources/logos/logo-navbar.svg" alt="Logo" class="mr-14">
        <span v-for="(item,index) in dataNavbar" class="center" :key="index" style="color: #fff; font-weight: 300!important; cursor: pointer;" @click="$router.push(item.link)">
          <img :src="iconMap[item.img]" :alt="item.img" class="mr-2"> {{ item.name }}
        </span>
      </div>

      <div class="center divrow displaynone" style="gap: 20px;">
        <v-icon color="#fff">mdi-bell-outline</v-icon>
        <v-sheet class="center divrow" style="gap: 10px; background-color: transparent;">
          <img src="@/assets/sources/images/avatar-online.svg" alt="Avatar">
          <div class="divcol">
            <span style="font-weight: 700; color: #fff;">Sysiphus</span>
            <span style="color: #98A2B3;">olivia@cerotrade.com</span>
          </div>
        </v-sheet>
      </div>

      <!-- Mobile Nav -->
      <img src="@/assets/sources/logos/logo-mobile.svg" alt="Logo" class="logo-mobile show-mobile">

      <div class="right-mobile" style="gap: 20px;">
        <img src="@/assets/sources/images/avatar-online.svg" alt="Avatar" style="width: 35px;">
        <v-icon color="#fff" style="font-size: 25px;">mdi-bell-outline</v-icon>
        <img src="@/assets/sources/icons/menu-bars-mobile.svg" alt="Menu Bars" class="menu-bars show-mobile">
      </div>
    </div>

    <!-- Menu Mobile -->
    
  </nav>
</template>

<script>
import home from '@/assets/sources/icons/home-white.svg'
import wallet from '@/assets/sources/icons/wallet-white.svg'
import marketplace from '@/assets/sources/icons/marketplace.svg'
import market_trends from '@/assets/sources/icons/market-trends.svg'
import config from '@/assets/sources/icons/config.svg'

export default {
  data(){
    return{
      dataNavbar:[
        {img: 'home', name: 'Home', link:'/dashboard'},
        {img: 'wallet', name: 'My portfolio', link: '/my-portfolio' },
        {img: 'marketplace', name: 'Marketplace', link:'marketplace'},
        // {img: 'market_trends', name:'Market trends', link: '/market-trends'},
        {img: 'config', name:'Settings', link: '/settings'}
      ],

      iconMap: {
        home,
        wallet,
        marketplace,
        market_trends,
        config,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/main.scss' as *;

#navbar {
  background-color: #101828;
  animation: movedown .5s $ease-return;
  transition: transform 0.4s ease-in-out;
  // @extend .margin-global;
  padding-inline: 30px;
  @extend .full-screen;
  height: var(--h-navbar);
  position: sticky;
  top: 0;
  z-index: 999;
  animation: none;
  transition: none;

  @include media(max, 960px){
    position: static;
    padding-inline: 20px;
  }

  .displaynone{
    @include media(max, 960px){
      display: none;
    }
  }

  .right-mobile{
    display: none;
    @include media(max, 960px){
      display: flex!important;
      flex-direction: row!important;;
      width: max-content;
      justify-content: center!important;
      align-items: center!important;
    }
  }

  .show-mobile{
    display: none!important;
    @include media(max, 960px){
      display: block!important;
    }
  }

  &__wrapper {
    @extend .parent;
    display: flex;
    justify-content: space-between;

    .chip-mobile{
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.25);
      display: grid;
      place-items: center;
      width: 50px;
      height: 50px;
      .logo-mobile{
        padding: 5px;
        width: 45px;
      }
    }
  }
}
</style>
