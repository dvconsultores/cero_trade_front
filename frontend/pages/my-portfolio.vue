<template>
  <div id="my-portfolio">
    <span class="mb-4 acenter" style="color:#475467; font-size: 16px; font-weight: 700;">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" style="width: 20px;">
      <v-icon>mdi-chevron-right</v-icon> 
      My portfolio 
      <v-icon>mdi-chevron-right</v-icon>  
      <span style="color: #00555B;">My wallet</span>
    </span>
    <h3>My portfolio</h3>
    <div class="jspace wrap mb-16" style="gap: 10px;">    
      <span style="color:#475467">Lorem ipsum dolor sit amet Lorem, ipsum dolor</span>

      <v-btn class="btn2"><v-icon>mdi-pencil-outline</v-icon> Edit profile information</v-btn>
    </div>

    <v-row>
      <v-col xl="5" lg="5" md="4" sm="6" cols="12">
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

      <v-col xl="2" lg="2" md="4" sm="2" cols="12" class="delete-mobile divcol" style="gap: 20px;">
        <v-card class="card card-mwh">
          <h6>Total MWh</h6>
          <h5 style="position: absolute; bottom: 0; left: 20px;">10MWh</h5>
        </v-card>

        <v-card class="card card-mwh">
          <h6>Tokenized MWh</h6>
          <h5 style="position: absolute; bottom: 0; left: 20px;">10MWh</h5>
        </v-card>

        <v-card class="card card-mwh" >
          <h6>Redeemed MWh</h6>
          <h5 style="position: absolute; bottom: 0; left: 20px;">10MWh</h5>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col xl="6" lg="6" cols="12">
        <v-tabs
          v-model="tabsWindow"
          bg-color="transparent"
          color="basil"
          class="mt-6"
        >
          <v-tab :value="1" class="tab-btn" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            All tokens
          </v-tab>
          <!-- <v-tab :value="6" class="tab-btn show-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            De-tokenize
          </v-tab>
          <v-tab :value="2" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Tokenized
          </v-tab> -->
          <!-- <v-tab :value="3" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Non Tokenized
          </v-tab> -->
          <v-tab :value="2" class="tab-btn" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Redeemed
          </v-tab>
          <v-tab :value="3" class="tab-btn delete-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Sold
          </v-tab>
          <v-tab :value="4" class="tab-btn show-mobile" style="border: none!important; border-bottom: 2px solid rgba(0,0,0,0.25)!important; border-radius: 0px!important;">
            Selling
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col xl="6" lg="6" cols="12" class="divrow aend jend delete-mobile" style="gap: 10px;">
        <v-btn class="btn2"><img src="@/assets/sources/icons/sell-btn.svg" alt="Sell">Sell</v-btn>
        <v-btn class="btn2"><img src="@/assets/sources/icons/sell-btn.svg" alt="Sell">Take of market</v-btn>
        <!-- <v-btn class="btn2"><img src="@/assets/sources/icons/de-tokenize-btn.svg" alt="Sell">De-tokenize</v-btn>
        <v-btn class="btn2"><img src="@/assets/sources/icons/tokenize-btn.svg" alt="Sell">Tokenize</v-btn> -->
        <v-btn class="btn2"><img src="@/assets/sources/icons/redeem-btn.svg" alt="Sell">Redeem</v-btn>
        <v-btn class="btn2"><v-icon>mdi-plus</v-icon>Select</v-btn>
      </v-col>
    </v-row>

    <div class="divrow jspace mt-4">
      <div class="divrow" style="gap: 15px;">
        <!-- <v-select
        v-model="allItems"
        :items="items"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select delete-mobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select> -->

        <v-btn class="btn"><v-icon>mdi-filter-variant</v-icon> Add filter</v-btn>
      </div>

      <div class="divrow jcenter acenter" style="gap: 5px;">
        <v-text-field
        class="input" variant="solo" flat
        elevation="0" placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        style="min-width: 110px;"
        ></v-text-field>

        <!-- <v-select
        v-model="timeline"
        :items="items_timeline"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select delete-mobile"
        bg-color="#EAECF0"
        hide-details
        density="compact"
        ></v-select> -->

        <v-btn-toggle class="center delete-mobile" rounded="1" v-model="toggle">
          <v-btn class="btn-toggle" @click="windowStep = 1"><img src="@/assets/sources/icons/table-view.svg" alt="Table icon"></v-btn>
          <v-btn class="btn-toggle" @click="windowStep = 2"><img src="@/assets/sources/icons/card-view.svg" alt="Card icon"></v-btn>
        </v-btn-toggle>

        <!-- <v-btn class="btn" icon="mdi-dots-vertical" style="font-size: 20px!important; padding: 15px!important;"></v-btn> -->
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

          <template #[`item.id`]="{ item }">
            # {{ item.id }}
          </template>

          <template #[`item.energy_source`]="{ item }">
            <span>
              <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
            </span>
          </template>

          <template #[`item.price`]="{ item }">
            <span class="divrow jspace acenter">
              {{ item.price }} <v-sheet style="color: #475467; ;padding-inline: 5px; border: 1px solid rgba(0,0,0,0.25); border-radius: 5px;">{{ item.currency }}</v-sheet>
            </span>
          </template>

          <template #[`item.mwh`]="{ item }">
            <span class="divrow acenter">
              <v-icon>mdi-lightbulb-variant-outline</v-icon> {{ item.mwh }}
            </span>
          </template>

          <template #[`item.region`]="{ item }">
            <div class="divrow acenter">
              <img :src="iconMap[item.region_img]" alt="Icon" style="width: 20px;"> <span class="ml-2">{{ item.region }}</span>
            </div>
          </template>

          <template #[`item.status`]="{ item }">
            <div class="divrow acenter">
              <img :src="iconMap[item.icon_status]" alt="Icon"> <span class="ml-2">{{ item.status }}</span>
            </div>
          </template>
        </v-data-table>
      </v-window-item>

      <v-window-item :value="2" class="pa-2">
        <v-row class="mt-6">
          <v-col v-for="(item,index) in dataMarketplace" :key="index" xl="3" lg="3" md="4" sm="6" cols="12">
            <v-card class="card cards-marketplace" @click="goDetails(item)">
              <div class="divrow jspace acenter mb-6">
                <div class="divrow center" style="gap: 5px;">
                  <h6 class="mb-0 font700">IREC #{{ item.irec_id }}</h6>
                  <!-- <v-chip :class="{ 'red-chip': item.icon_arrow === 'mdi-arrow-down', 'green-chip': item.icon_arrow === 'mdi-arrow-up'}"><v-icon>{{ item.icon_arrow }}</v-icon> {{ item.percent }} %</v-chip> -->
                </div>
                <v-menu location="start">
                  <template v-slot:activator="{ props }">
                    <v-btn class="btn btn-dots" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                  </template>

                  <v-card class="divcol pt-2 pb-2 pl-1 pr-1 card-menu" style="gap: 25px;">
                    <a @click="$router.push('/rec-single-portfolio')">Sell</a>
                    <a @click="$router.push('/rec-single-portfolio')">Redeem</a>
                    <a @click="$router.push('/rec-single-portfolio')">Take of market</a>
                  </v-card>
                </v-menu>
              </div>

              <div class="jspace divrow mb-1">
                <span>Energy source</span>
                <span style="color: #475467;">
                  <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
                </span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Country</span>
                <span style="color: #475467;" class="acenter">
                  <img :src="iconMap[item.region_img]" alt="icon" class="mr-1" style="width: 20px;"> {{ item.region }}
                </span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Assets ID</span>
                <span style="color: #475467;">#{{ item.id }}</span>
              </div>

              <div class="jspace divrow mb-1">
                <span>MWh</span>
                <span style="color: #475467;"><v-icon>mdi-lightbulb-variant-outline</v-icon> {{ item.mwh }}</span>
              </div>

              <div class="jspace divrow mb-1">
                <span>Status</span>
                <span class="center" style="color: #475467">
                  <img :src="iconMap[item.icon_status]" alt="Icon" class="mr-1"> {{ item.status }}
                </span>
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
import tokenized from '@/assets/sources/icons/tokenized-table.svg'
import redeemed from '@/assets/sources/icons/redeemed-table.svg'
import chile from '@/assets/sources/icons/CL.svg'



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
        labels: ['Redeemed', 'Tokenized', 'Raw'], 
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%',
            },
          },
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
        { title: 'IREC ID', sortable: false, key: 'irec_id'},
        { title: 'Energy source', key: 'energy_source', sortable: false },
        { title: 'Country', key: 'region', sortable: false },
        { title: 'Asset ID', key: 'id', sortable: false },
        { title: 'MWh', key: 'mwh', sortable: false },
        { title: 'Status', key: 'status', sortable: false },
      ],
      dataMarketplace: [
        { 
          irec_id: 1,
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Tokenized',
          icon_status: 'tokenized'
        },
        {
          irec_id: 2,
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Redeemed',
          icon_status: 'redeemed'
        },
        {
          irec_id: 3,
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Tokenized',
          icon_status: 'tokenized'
        },
        {
          irec_id: 4,
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Redeemed',
          icon_status: 'redeemed'
        },
        {
          irec_id: 5,
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Tokenized',
          icon_status: 'tokenized'
        },
        {
          irec_id: 6,
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Redeemed',
          icon_status: 'redeemed'
        },
        {
          irec_id: 7,
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Tokenized',
          icon_status: 'tokenized'
        },
        {
          irec_id: 8,
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Redeemed',
          icon_status: 'redeemed'
        },
        {
          irec_id: 9,
          id: '1234567',
          icon_arrow: 'mdi-arrow-down',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-windy',
          energy_source: 'Wind energy',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Tokenized',
          icon_status: 'tokenized'
        },
        {
          irec_id: 10,
          id: '1234567',
          icon_arrow: 'mdi-arrow-up',
          percent: '20',
          facility_img: 'sphere',
          facility: 'Sphere',
          price: 125.00,
          currency: '$',
          icon_source: 'mdi-weather-sunny',
          energy_source: 'Sun',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
          volume: 7654,
          checkbox: false,
          status: 'Redeemed',
          icon_status: 'redeemed'
        },
      ],

      iconMap: {
        sphere,
        redeemed,
        tokenized,
        chile,
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
        colors: ['#C6F221'],
        
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
      this.$router.push('/rec-single-portfolio')
    }
  }
}

</script>