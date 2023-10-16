<template>
  <div id="marketplace">
    <span class="mb-10 mbb16" style="font-size: 16px; font-weight: 700;"><v-icon>mdi-home</v-icon> <v-icon>mdi-chevron-right</v-icon> Marketplace</span>
    <h3>Marketplace</h3>
    <span class="mbb16" style="color:#475467;">Lorem ipsum dolor sit amet.</span>

    <v-tabs
      v-model="tabsMobile"
      bg-color="transparent"
      color="basil"
      class="mt-2 mb-2 showmobile"
    >
      <v-tab :value="1" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        My details
      </v-tab>
      <v-tab :value="2" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        My details
      </v-tab>
      <v-tab :value="3" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        My details
      </v-tab>
      <v-tab :value="4" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        My details
      </v-tab>
    </v-tabs>

    <div class="divrow jspace">
      <div class="divrow" style="gap: 15px;">
        <v-select
        v-model="allItems"
        :items="items"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select deletemobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select>

        <v-btn class="btn"><v-icon>mdi-filter-variant</v-icon> Add filter</v-btn>
      </div>

      <div class="divrow jcenter acenter" style="gap: 5px;">
        <v-text-field
        class="input" variant="solo" flat
        elevation="0" placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        ></v-text-field>

        <v-select
        v-model="timeline"
        :items="items_timeline"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select deletemobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select>

        <v-btn-toggle class="center deletemobile" rounded="1" v-model="toggle">
          <v-btn class="btn-toggle" @click="windowStep = 1"><img src="@/assets/sources/icons/table-view.svg" alt="Table icon"></v-btn>
          <v-btn class="btn-toggle" @click="windowStep = 2"><img src="@/assets/sources/icons/card-view.svg" alt="Card icon"></v-btn>
        </v-btn-toggle>

        <v-btn class="btn" icon="mdi-dots-vertical" style="font-size: 20px!important; padding: 15px!important;"></v-btn>
      </div>
    </div>

    <v-window v-model="windowStep">
      <v-window-item :value="1">
        <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="dataMarketplace"
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

          <template #[`item.checkbox`]="{ item }">
            <v-checkbox
            v-model="item.checkbox"
            hide-details
            density="compact"
            style="max-width: 10px!important; min-width: 10px!important;"
            ></v-checkbox>
          </template>

          <template #[`item.facility`]="{ item }">
            <span class="acenter">
              <img :src="iconMap[item.selectable.facility_img]" :alt="item.facility_img" class="mr-1"> {{ item.selectable.facility }} 
            </span>
          </template>

          <template #[`item.energy_source`]="{ item }">
            <span>
              <v-icon :class="{'blue' : item.selectable.energy_source === 'Hydroenergy', 'grey' : item.selectable.energy_source === 'Wind energy', 'yellow' : item.selectable.energy_source === 'Sun'}">{{ item.selectable.icon_source }}</v-icon> {{ item.selectable.energy_source }}
            </span>
          </template>

          <template #[`item.price`]="{ item }">
            <span class="divrow jspace acenter">
              {{ item.selectable.price }} <v-sheet style="color: #475467; ;padding-inline: 5px; border: 1px solid rgba(0,0,0,0.25); border-radius: 5px;">{{ item.selectable.currency }}</v-sheet>
            </span>
          </template>

          <template #[`item.mwh`]="{ item }">
            <span class="divrow acenter">
              {{ item.selectable.mwh }} <v-icon>mdi-lightbulb-variant-outline</v-icon>
            </span>
          </template>

          <template #[`item.volume`]="{ item }">
            <div class="divrow acenter">
              <v-chip style="border-radius: 10px!important;" :class="{ 'red-chip-table': item.selectable.icon_arrow === 'mdi-arrow-down', 'green-chip-table': item.selectable.icon_arrow === 'mdi-arrow-up'}"><v-icon>{{ item.selectable.icon_arrow }}</v-icon> {{ item.selectable.percent }} %</v-chip>
              <span class="ml-2">{{ item.selectable.volume }}</span>
            </div>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-chip @click="goDetails(item)" color="white" class="chip-table mr-1" style="border-radius: 10px!important;">
              <img src="@/assets/sources/icons/wallet.svg" alt="wallet">
            </v-chip>
            <v-chip class="chip-table" color="white" style="border-radius: 10px!important;">
              <v-icon size="default" style="color: #000!important;">mdi-file-chart-outline</v-icon>
            </v-chip>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item :value="2" class="pa-2">
        <v-row class="mt-6">
          <v-col v-for="(item,index) in dataMarketplace" :key="index" xl="3" lg="3" md="4" sm="6" cols="12">
            <v-card class="card cards-marketplace" @click="goDetails(item)">
              <div class="divrow jspace acenter mb-6">
                <div class="divrow center" style="gap: 5px;">
                  <h6 class="mb-0 font700">#{{ item.id }}</h6>
                  <v-chip :class="{ 'red-chip': item.icon_arrow === 'mdi-arrow-down', 'green-chip': item.icon_arrow === 'mdi-arrow-up'}"><v-icon>{{ item.icon_arrow }}</v-icon> {{ item.percent }} %</v-chip>
                </div>
                <v-btn class="btn btn-dots" icon="mdi-dots-vertical"></v-btn>
              </div>

              <div class="jspace divrow mb-1">
                <span>Price</span>
                <span style="color: #475467;">{{ item.currency }} {{ item.price }}</span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Facility name</span>
                <span class="center" style="color: #475467">
                  <img :src="iconMap[item.facility_img]" :alt="item.facility_img" class="mr-1"> {{ item.facility }}
                </span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Energy source</span>
                <span style="color: #475467;">
                  <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
                </span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Region</span>
                <span style="color: #475467;">{{ item.region }}</span>
              </div>

              <div class="jspace divrow mb-1">
                <span>MWh</span>
                <span style="color: #475467;"><v-icon>mdi-lightbulb-variant-outline</v-icon> {{ item.mwh }}</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import '@/assets/styles/pages/marketplace.scss'
import sphere from '@/assets/sources/icons/sphere.svg'

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

       headers: [
        { title: '', key: 'checkbox', sortable: false, align: 'center'},
        { title: 'Facility name', sortable: false, key: 'facility'},
        { title: 'Energy source', key: 'energy_source', sortable: false },
        { title: 'Region', key: 'region', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'MWh', key: 'mwh', sortable: false },
        { title: 'Volume', key: 'volume', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false, align: 'center'},
      ],
      dataMarketplace: [
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
        {
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Santiago, Chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
        },
      ],

      iconMap: {
        sphere,
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
      this.$router.push('rec-single')
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
