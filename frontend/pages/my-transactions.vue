<template>
  <div id="my-transactions">
    <span class="mb-4 acenter" style="color:#475467 ;font-size: 16px; font-weight: 700;">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" style="width: 20px;">
      <v-icon>mdi-chevron-right</v-icon> 
      <span>My porfolio</span>
      <v-icon>mdi-chevron-right</v-icon> 
      <span style="color: #00555B;">Transactions</span>
    </span>
    <h3>My Transactions</h3>
    <span class="mbb16 mb-6" style="color:#475467;">Here are your transactions: all your redemptions, sales, and purchases done in the platform.</span>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="basil"
      class="mt-2 mb-2"
    >
      <v-tab
        v-for="(item, i) in tabs" :key="i"
        style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;"
      >{{ item }}</v-tab>
    </v-tabs>

    <div class="divrow jspace flex-wrap" style="row-gap: 10px;">
      <div class="divrow" style="gap: 15px;">
        <!-- <v-select
        v-model="allItems"
        :items="items"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select deletemobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select> -->

        <v-btn class="btn"><v-icon>mdi-filter-variant</v-icon> Add filter</v-btn>
      </div>

      <div class="divrow jcenter acenter" style="gap: 5px;">
        <v-text-field
        class="input" variant="solo" flat
        elevation="0" placeholder="Search by transaction number"
        prepend-inner-icon="mdi-magnify"
        style="min-width: 255px;"
        ></v-text-field>

        <!-- <v-select
        v-model="timeline"
        :items="items_timeline"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select deletemobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select> -->
      </div>
    </div>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="dataTransactions"
      class="mt-6 my-data-table"
      density="compact"
      >
      <template #[`column.checkbox`]="{ column }">
        <span style="display: none;">{{ column.title }}</span>
        <v-checkbox
        hide-details
        density="compact"
        style="max-width: 10px!important; min-width: 10px!important;"
        ></v-checkbox>
      </template>

        <!-- <template #[`item.checkbox`]="{ item }">
          <v-checkbox
          v-model="item.checkbox"
          hide-details
          density="compact"
          style="max-width: 10px!important; min-width: 10px!important;"
          ></v-checkbox>
        </template> -->

        <template #[`item.asset_id`]="{ item }">
          <span class="acenter bold" style="color: #475467;">
            {{ item.asset_id }} 
          </span>
        </template>

        <template #[`item.energy_source`]="{ item }">
          <span>
            <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
          </span>
        </template>

        <template #[`item.price`]="{ item }">
          <span class="divrow jspace acenter">
            {{ item.price }} <v-sheet class="chip-currency bold">{{ item.currency }}</v-sheet>
          </span>
        </template>

        <template #[`item.region`]="{ item }">
          <div class="divrow acenter">
            <img :src="iconMap[item.region_img]" alt="Icon" style="width: 20px;"> <span class="ml-2">{{ item.region }}</span>
          </div>
        </template>

        <template #[`item.mwh`]="{ item }">
          <span class="divrow acenter">
            <v-icon>mdi-lightbulb-variant-outline</v-icon> {{ item.mwh }}
          </span>
        </template>

        <!-- <template #[`item.volume`]="{ item }">
          <div class="divrow acenter">
            <v-chip style="border-radius: 10px!important;" :class="{ 'red-chip-table': item.icon_arrow === 'mdi-arrow-down', 'green-chip-table': item.icon_arrow === 'mdi-arrow-up'}"><v-icon>{{ item.icon_arrow }}</v-icon> {{ item.percent }} %</v-chip>
            <span class="ml-2">{{ item.volume }}</span>
          </div>
        </template> -->

        <template #[`item.actions`]="{ item }">
          <v-chip @click="goDetails(item)" color="white" class="chip-table mr-1" style="border-radius: 10px!important;">
            <img src="@/assets/sources/icons/wallet.svg" alt="wallet">
          </v-chip>
          <!-- <v-chip class="chip-table" color="white" style="border-radius: 10px!important;">
            <v-icon size="default" style="color: #000!important;">mdi-file-chart-outline</v-icon>
          </v-chip> -->
        </template>
      </v-data-table>
  </div>
</template>

<script>
import '@/assets/styles/pages/my-transactions.scss'
import sphere from '@/assets/sources/icons/sphere.svg'
import chile from '@/assets/sources/icons/CL.svg'

export default{
  data() {
    return{
      tabsMobile: 1,
      itemsPerPage: 100,
      windowStep: undefined,
      allItems: 'All items',
      items: ['All items', 'Items'],
      items_timeline: ['Timeline', 'Others'],
      timeline: 'Timeline',
      toggle: 0,

      tab: 0,
      tabs: ["All", "Sale", "Purchase", "Redemption"],

       headers: [
        // { title: '', key: 'checkbox', sortable: false, align: 'center'},
        // { title: 'Facility name', sortable: false, key: 'facility'},
        { title: 'Asset ID', key: 'asset_id', sortable: false },
        { title: 'Energy source', key: 'energy_source', sortable: false },
        { title: 'Region', key: 'region', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'MWh', key: 'mwh', sortable: false },
        { title: 'Volume Produced', key: 'volume', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false, align: 'center'},
      ],
      dataTransactions: [
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          asset_id: '#1234567',
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00 - 223.00",
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
      ],

      iconMap: {
        sphere,
        chile,
      },
    }
  },

  computed: {
    windowStepComputed() {
      if (window.innerWidth > 960) {
        return 1;
      } else {
        return 2;
      }
    }
  },

  methods:{
    goDetails(){
      this.$router.push('/rec-single-my-transactions')
    },
  },
  watch: {
    windowStepComputed(newVal) {
      this.windowStep = newVal;
    }
  },
  created() {
    this.windowStep = this.windowStepComputed;
  }
}
</script>
