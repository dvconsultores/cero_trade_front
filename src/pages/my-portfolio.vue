<template>
  <div id="my-portfolio">
    <span class="mb-10 acenter" style="color:#475467; font-size: 16px; font-weight: 700;">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" style="width: 20px;">
      <v-icon>mdi-chevron-right</v-icon> 
      My portfolio 
      <v-icon>mdi-chevron-right</v-icon>  
      <span style="color: #00555B;">My wallet</span>
    </span>
    <h3>My wallet</h3>
    <span class="mb-16" style="color:#475467">Lorem ipsum dolor sit amet Lorem, ipsum dolor</span>

    <v-row>
      <v-col xl="6" lg="6" md="4" sm="6" cols="12">
        <v-card class="card" style="min-height: 100%!important;">
          <h6>Renewable sources</h6>
          <apexchart type="bar" height="250" :options="chartOptions" :series="series"></apexchart>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card" style="min-height: 100%!important;">
          <h6>My portfolio</h6>
          <apexchart type="donut" :options="donutOptions" :series="donutSeries"></apexchart>
        </v-card>
      </v-col>

      <v-col xl="2" lg="2" md="4" sm="2" cols="12" class="delete-mobile">
        <v-card class="card divcol jspace" style="min-height: 100%!important; position: relative;">
          <h6>Renewable sources</h6>
          <h5 style="position: absolute; bottom: 0; left: 20px;">10MWh</h5>
        </v-card>
      </v-col>
    </v-row>

    <v-tabs
      v-model="tabsWindow"
      bg-color="transparent"
      color="basil"
      class="mt-6"
    >
      <v-tab :value="1" class="tab-btn" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        All tokens
      </v-tab>
      <v-tab :value="6" class="tab-btn show-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        De-tokenize
      </v-tab>
      <v-tab :value="2" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        Tokenized
      </v-tab>
      <v-tab :value="3" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        Non Tokenized
      </v-tab>
      <v-tab :value="4" class="tab-btn" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        Redeemed
      </v-tab>
      <v-tab :value="5" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        Sold
      </v-tab>
      <v-tab :value="7" class="tab-btn show-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
        Selling
      </v-tab>
    </v-tabs>

    <div class="divrow jspace mt-4">
      <div class="divrow" style="gap: 15px;">
        <v-select
        v-model="allItems"
        :items="items"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select delete-mobile"
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
        class="select delete-mobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select>

        <v-btn-toggle class="center delete-mobile" rounded="1" v-model="toggle">
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
import '@/assets/styles/pages/my-portfolio.scss'
import VueApexCharts from "vue3-apexcharts"
import sphere from '@/assets/sources/icons/sphere.svg'


export default{
  components: {
    apexchart: VueApexCharts,
  },
  data(){
    return{
      windowStep: undefined,
      tabsWindow: 1,
      donutSeries: [44, 55, 81],
      donutOptions: {
        chart: {
          type: 'donut',
        },
        colors: ['#00393D', '#00555B', '#C6F221'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 0, 
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            // legend: {
            //   position: 'bottom'
            // }
          }
        }]
      },

      headers: [
        { title: '$', key: 'checkbox', sortable: false, align: 'center'},
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

      allItems: 'All items',
      items: ['All items', 'Items'],
      items_timeline: ['Timeline', 'Others'],
      timeline: 'Timeline',
      toggle: 0,

      series: [{
        name: 'PRODUCT A',
        data: [24, 55, 31, 67, 12, 43]
      },],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 150,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        colors: ['#1D2939'],
        
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              enabled: false,
            }
          },
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          type: 'category',
          categories: ['Wind', 'Solar', 'Biomass', 'Geothermal', 'Hydro', 'Ocean'],
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1
        }
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
  watch: {
    windowStepComputed(newVal) {
      this.windowStep = newVal;
    }
  },
  created() {
    this.windowStep = this.windowStepComputed;
  },
  methods:{
    goDetails(){
      this.$router.push('rec-single')
    }
  }
}

</script>