<template>
  <div id="rec-single">
    <span class="mb-10" style="color: #00555B; font-size: 16px; font-weight: 700;"><v-icon>mdi-home</v-icon> <v-icon>mdi-chevron-right</v-icon> Marketplace <v-icon>mdi-chevron-right</v-icon> #123455667</span>
    <h3 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2"> #123455667</h3>
    <div class="divrow aend" style="gap: 10px;">
      <h4 class="mb-0">
        $ 124.05
      </h4>
      <span style="color:#475467">per MWh</span>
      <v-chip class="green-chip"><v-icon>mdi-arrow-up</v-icon> 20 %</v-chip>
    </div>

    <v-row class="mt-10">
      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card cards-rec" v-for="(item, index) in dataCard" :key="index">
          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Energy source</span>
            <span>
              <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
            </span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Region</span>
            <span>{{ item.region }}</span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Date of Inssuance</span>
            <span>{{ item.date }}</span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Certification type</span>
            <span>{{ item.certification }}</span>
          </div>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card">
          <span><v-icon style="color:#475467">mdi-lightbulb-variant-outline</v-icon> Tokens sold</span>
          <div id="chart">
            <apexchart type="radialBar" :options="chartOptions" :series="series"></apexchart>
          </div>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="4" sm="6" cols="12">
        <v-card class="card mb-6 divcol astart card-currency">
          <div class="divrow acenter mb-4" style="gap: 5px;"> 
            <label for="currency">Currency</label>
            <v-select
            :items="['$ - USD', 'Bs - VES']"
            variant="outline"
            flat
            menu-icon="mdi-chevron-down"
            class="select"
            bg-color="#ffffff"
            hide-details
            density="compact"
            ></v-select>
          </div>
          <div class="jspace" style="width: 100%;">
            <div class="divcol" style="gap: 10px;">
              <label>Buy</label>
              <h6>1 MWh</h6>
            </div>
            <div class="divcol" style="gap: 10px;">
              <label>Price</label>
              <h6>$125.04</h6>
            </div>
          </div>
        </v-card>

        <div>
          <v-btn class="btn" style="min-width: 100%!important;">
            Buy
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import '@/assets/styles/pages/rec-single.scss'
import VueApexCharts from "vue3-apexcharts"

export default {
  components:{
    apexchart: VueApexCharts,
  },
  data(){
    return{
      dataCard: [
        {
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Valparaiso, Chile',
          date: '24/12/2023',
          certification: 'Certification type',
        },
      ],

      series: [43],
      chartOptions: {
        colors: ['#C6F221'],
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#F2F4F7",
              rounded: true,
              opacity: 1.0,
              strokeWidth: '97%',
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#fff',
                opacity: 1,
                blur: 2
              },
              strokeLinecap: 'round',
            },
            dataLabels: {
              name: {
                show: true,
                color: '#475467',
                position: 'bottom',
                fontSize: '14px',
                offsetY: -35
              },
              value: {
                fontSize: '28px',
                color: 'black',
                fontWeight: '700',
                position: 'top',
                offsetY: -20
              }
            }
          }
        },
        grid: {
          padding: {
            top: 0,
            bottom: 30,
          }
        },
        fill: {
          type: 'solid',
        },
        labels: ['Available'],
      },
    }
  }
}

</script>