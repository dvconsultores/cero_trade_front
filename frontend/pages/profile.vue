<template>
  <div id="profile">
    <span class="mb-10 acenter" style="color: #475467; font-size: 16px; font-weight: 700;">
      <img src="@/assets/sources/icons/home-layout.svg" alt="Home Icon" style="width: 20px;">
      <v-icon>mdi-chevron-right</v-icon> 
       Profile
    </span>
    <div class="divrow acenter mb-4">
      <div class="div-avatar-asset mr-6">
        <img src="@/assets/sources/icons/CL.svg" alt="Flag" class="flag">
      </div>
      <h3 class="mb-0">Sphere</h3>
    </div>
    <!-- <div class="divrow aend" style="gap: 10px;">
      <h4 class="mb-0">
        $ 124.05
      </h4>
      <span style="color:#475467">per MWh</span>
      <v-chip class="green-chip"><v-icon>mdi-arrow-up</v-icon> 20 %</v-chip>
    </div> -->

    <v-row>
      <v-col xl="8" lg="8" md="8" cols="12">
        <v-row>
          <v-col xl="8" lg="8" cols="12">
            <v-card class="card" style="min-height: 100%!important;">
              <h6>Renewable sources</h6>
              <apexchart type="bar" height="200" :options="chartOptionsRenewable" :series="seriesRenewable"></apexchart>
            </v-card>
          </v-col>
          
          <v-col xl="4" lg="4" cols="12" class="d-flex flex-column justify-space-between" style="gap: 20px">
            <v-card class="card relative d-flex flex-column-jcenter flex-grow-1">
              <span>Offered MWh</span>
              <h5 class="mb-0">10MWh</h5>
            </v-card>
            
            <v-card class="card relative d-flex flex-column-jcenter flex-grow-1">
              <span>Redeemed MWh</span>
              <h5 class="mb-0">10MWh</h5>
            </v-card>
          </v-col>

          <v-col cols="12" class="marketplace-styles">
            <div class="flex-space-center mb-3">
              <h5 class="mb-0 bold">Sellers</h5>

              <v-btn class="btn"><img src="@/assets/sources/icons/redeem-btn.svg" alt="Sell">Buy</v-btn>
            </div>
            
            <div class="divrow jspace">
              <div class="divrow" style="gap: 15px;">

                <v-btn class="btn"><v-icon>mdi-filter-variant</v-icon> Add filter</v-btn>
              </div>

              <div class="divrow jcenter acenter" style="gap: 5px;">
                <v-btn-toggle class="center deletemobile" rounded="1" v-model="toggle">
                  <v-btn class="btn-toggle" @click="windowStep = 1"><img src="@/assets/sources/icons/table-view.svg" alt="Table icon"></v-btn>
                  <v-btn class="btn-toggle" @click="windowStep = 2"><img src="@/assets/sources/icons/card-view.svg" alt="Card icon"></v-btn>
                </v-btn-toggle>
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
              </v-window-item>
              <v-window-item :value="2" class="pa-2">
                <v-row class="mt-6">
                  <v-col v-for="(item,index) in dataMarketplace" :key="index" xl="3" lg="3" md="4" sm="6" cols="12">
                    <v-card class="card cards-marketplace" @click="goDetails(item)">
                      <div class="divrow jspace acenter mb-6">
                        <div class="divcol astart" style="gap: 5px;">
                          <span style="color: #475467;">Asset</span>
                          <h6 class="mb-0 font700">{{ item.asset_id }}</h6>
                          <!-- <v-chip :class="{ 'red-chip': item.icon_arrow === 'mdi-arrow-down', 'green-chip': item.icon_arrow === 'mdi-arrow-up'}"><v-icon>{{ item.icon_arrow }}</v-icon> {{ item.percent }} %</v-chip> -->
                        </div>
                        <v-menu location="start">
                          <template v-slot:activator="{ props }">
                            <v-btn class="btn btn-dots" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                          </template>

                          <v-card class="acenter jstart pt-2 pb-2 pl-1 pr-1 card-menu" style="gap: 25px;">
                            <a @click="$router.push('/rec-single-marketplace')">Buy</a>
                          </v-card>
                        </v-menu>
                      </div>

                      <div class="jspace divrow mb-1">
                        <span>Price</span>
                        <span style="color: #475467;">{{ item.currency }} {{ item.price }}</span>
                      </div>

                      <!-- <div class="jspace divrow mb-1">
                        <span>Facility name</span>
                        <span class="center" style="color: #475467">
                          <img :src="iconMap[item.facility_img]" :alt="item.facility_img" class="mr-1"> {{ item.facility }}
                        </span>
                      </div> -->

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
                        <span>MWh</span>
                        <span style="color: #475467;"><v-icon>mdi-lightbulb-variant-outline</v-icon> {{ item.mwh }}</span>
                      </div>

                      <div class="jspace divrow mb-1">
                        <span>Volume</span>
                        <span style="color: #475467;">{{ item.volume }}</span>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <v-col cols="12" class="pt-0 pl-0">
          <v-card class="card mb-6 divcol astart card-currency">
            <label class="mb-2" for="currency">Choose seller</label>
            <v-select
            :items="['Sphere']"
            variant="outline"
            flat
            menu-icon="mdi-chevron-down"
            class="select mb-4"
            bg-color="#ffffff"
            hide-details
            density="compact"
            style="min-width: 100%;"
            ></v-select>
            <div class="jspace" style="width: 100%;">
              <div class="divcol" style="gap: 10px;">
                <label>Choose quantity (MWh)</label>
                <div class="divrow" style="gap: 5px;">
                  <v-btn class="btn2" style="max-height: 40px!important;">-</v-btn>
                  <v-text-field
                  class="input" variant="outlined" elevation="0"
                  hide-details
                  ></v-text-field>
                  <v-btn class="btn2" style="max-height: 40px!important;">+</v-btn>
                </div>
              </div>
              <div class="divcol" style="gap: 10px;">
                <label>Price</label>
                <h6>$125.04</h6>
              </div>
            </div>
          </v-card>

          <div class="divrow mb-4" style="gap: 10px; flex-wrap: wrap;">
            <v-btn class="btn" @click="dialogPurchaseReview = true" style="min-width: 100%!important;">
              Buy
            </v-btn>

            <!-- <v-btn class="btn" @click="dialogRedeemSure = true" style="min-width: 32%!important;">
              Reedem
            </v-btn>

            <v-btn class="btn btn2" @click="dialogParticipantBenefits = true" style="min-width: 31%!important;">
              Tokenize
            </v-btn>

            <v-btn class="btn btn2" @click="dialogSellOptions = true" style="min-width: 31%!important;">
              Sell token
            </v-btn> -->
          </div>

          <!-- <v-card class="card divcol pt-6">
            <span style="color: #475467;">Inssuance Date</span>
            <span class="mt-2 mb-4">{{ date }}</span>

            <div v-for="(item,index) in dataPdf" :key="index" class="border mb-2 jspace">
              <div class="divrow acenter">
                <img src="@/assets/sources/icons/pdf.svg" alt="PDF">
                <div class="divcol ml-2">
                  <span style="color: #475467; font-weight: 500;">{{ item.name }}</span>
                  <span style="color: #475467;">{{ item.weight }}</span>
                </div>
              </div>

              <v-card class="card center" style="width: max-content!important; border-radius: 10px!important;">
                <v-icon>mdi-tray-arrow-down</v-icon>
              </v-card>
            </div>
          </v-card> -->
        </v-col>
      </v-col>
    </v-row>

    <!-- Dialog purchase review -->
    <v-dialog v-model="dialogPurchaseReview" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogPurchaseReview = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <img src="@/assets/sources/icons/wallet.svg" alt="Wallet" style="width: 20px;">
          </v-sheet>
        </v-sheet>
        <h6>Purchase review</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <span class="bold mt-3">Checkout review</span>

          <v-divider class="mb-3 mt-4"  thickness="2" style="width: 150%; position: relative; left: -50px;"></v-divider>
          
          <div class="jspace divrow mb-2 acenter">
            <h5 class="acenter h5-mobile"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <div class="divrow astart acenter">
              <h5 class="mr-2 h5-mobile">
                $ 124.05
              </h5>
              <span style="color:#475467">per MWh</span>
            </div>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Energy source type</span>
            <span>
              <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
            </span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Region</span>
            <span>{{ item.region }}</span>
          </div>

          <v-divider class="mb-3 mt-4"  thickness="2" style="width: 100%;"></v-divider>

          <div class="jspace divrow mt-4">
            <span>Subtotal</span>
            <span>$124.05</span>
          </div>
          <div class="jspace divrow mt-1">
            <span>Transaction fee (10%)</span>
            <span>$12.41</span>
          </div>
          <div class="jspace divrow mt-1">
            <span class="bold">Total</span>
            <span class="bold">$136.46</span>
          </div>
        </v-card>

        <div class="border-card mt-6">
          <div class="jspace divrow">
            <span class="bold">Payment methods</span>
            <div class="divrow mb-4" style="gap: 10px;">
              <img src="@/assets/sources/icons/visa.svg" alt="Visa">
              <img src="@/assets/sources/icons/mastercard.svg" alt="Mastercard">
              <img src="@/assets/sources/icons/mastercard-yellow.svg" alt="Mastercard">
            </div>
          </div>
          <div class="jspace divrow">
            <v-btn class="btn" style="background-color: #fff!important; width: max-content!important;">Change</v-btn>
            <span class="bold">Credit / Debit cards</span>
          </div>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogPurchaseReview = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogPurchaseReview = false; dialogPaymentConfirm = true" style="border: none!important;">Proceed with payment</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog payment confirm -->
    <v-dialog v-model="dialogPaymentConfirm" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogPaymentConfirm = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-check-decagram-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h6>Payment confirmation</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter h5-mobile"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <div class="divrow astart acenter">
              <h5 class="mr-2 h5-mobile">
                $ 124.05
              </h5>
              <span style="color:#475467">per MWh</span>
            </div>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Energy source type</span>
            <span>
              <v-icon :class="{'blue' : item.energy_source === 'Hydroenergy', 'grey' : item.energy_source === 'Wind energy', 'yellow' : item.energy_source === 'Sun'}">{{ item.icon_source }}</v-icon> {{ item.energy_source }}
            </span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Region</span>
            <span>{{ item.region }}</span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Start date</span>
            <span>{{ item.date }}</span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">End date</span>
            <span>24/12/2023</span>
          </div>
        </v-card>

        <div v-for="(item,index) in dataPdfCofirm" :key="index" class="border mb-4 mt-6 jspace">
          <div class="divrow acenter">
            <img src="@/assets/sources/icons/pdf.svg" alt="PDF">
            <div class="divcol ml-2">
              <span style="color: #475467; font-weight: 500;">{{ item.name }}</span>
              <span style="color: #475467;">{{ item.weight }}</span>
            </div>
          </div>

          <v-card class="card center" style="width: max-content!important;">
            <v-icon>mdi-tray-arrow-down</v-icon>
          </v-card>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="$router.push('/marketplace')">Back to marketplace</v-btn>
          <v-btn class="btn" @click="dialogPaymentConfirm = false; dialogRedeemCertificates = true" style="border: none!important;">View token</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog Redeem Certificates -->
    <v-dialog v-model="dialogRedeemCertificates" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogRedeemCertificates = false">mdi-close</v-icon>
        <v-sheet class="mb-6 double-sheet">
          <v-sheet>
            <v-icon>mdi-check-decagram-outline</v-icon>
          </v-sheet>
        </v-sheet>
        <h6>Do you want to redeem the cerfificates you just bought?</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>
        <span class="tertiary bold mt-2 acenter"><v-icon class="mr-1">mdi-information-outline</v-icon>Learn more</span>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogRedeemCertificates = false">Not Now</v-btn>
          <v-btn class="btn" @click="dialogRedeemCertificates = false;" style="border: none!important;">Yes, redeem</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import '@/assets/styles/pages/profile.scss'
import VueApexCharts from "vue3-apexcharts"
import sphere from '@/assets/sources/icons/sphere.svg'
import chile from '@/assets/sources/icons/CL.svg'


export default {
  components:{
    apexchart: VueApexCharts,
  },
  data(){
    return{
      windowStep: undefined,
      toggle: 0,
      headers: [
        // { title: '', key: 'checkbox', sortable: false, align: 'center'},
        { title: 'Company name', sortable: false, key: 'facility'},
        // { title: 'Asset ID', key: 'asset_id', sortable: false },
        // { title: 'Energy source', key: 'energy_source', sortable: false },
        { title: 'Country', key: 'region', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'MWh', key: 'mwh', sortable: false },
        // { title: 'Volume Produced', key: 'volume', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false, align: 'center'},
      ],
      dataMarketplace: [
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
        {
          facility_img: 'sphere',
          facility: 'Sphere',
          price: "125.00",
          currency: '$',
          region: 'Chile',
          region_img: 'chile',
          mwh: 32,
        },
      ],

      iconMap: {
        sphere,
        chile,
      },
      itemsPerPage: 100,
      dialogPaymentConfirm: false,
      dialogPurchaseReview: false,
      dialogParticipantBenefits: false,
      dialogSellingDetailsReview: false,
      dialogDynamicPrice: false,
      itemsCurrency:['USD', 'VES'],
      selectedCurrency: 'USD',
      dialogStaticPrice: false,
      radioSell: null,
      dialogSellOptions: false,
      dialogRedeem: false,
      dialogRedeemSure: false,
      dialogDetokenize: false,
      dialogRedeemCertificates: false,
      tabsSpecifications: null,
      dataDates: [
        {
          registration_date: '2022-01-15',
          commissioning_date: '2022-04-01',
          expire_date: '2042-04-01'
        }
      ],
      dataSpecifications:[
        {
          device_code: 'WT100X',
          capacity: '2.5 Megawatts (MW)',
          location: 'Lorem Ipsum',
          latitude: '52.509865',
          longitude: '-1.964623',
          address: 'Hilltop Farm, Windy Lane, Birmingham, B32 1NN',
          state: 'West Midlands',
          country: 'United Kingdom',
        },
      ],
      dataDeviceDetails:[
        {
          name: 'Wind Turbine T-100X',
          type: 'Wind Turbine',
          device_group: 'Wind energy',
          icon_source: 'mdi-weather-windy',
          description: 'A state-of-the-art wind turbine designed for optimal energy production with minimal environmental impact.'
        }
      ],
      dataPdfRedeem:[
        {
          name: 'Certificate',
          weight: '200 KB'
        }
      ],
      dataPdfCofirm:[
        {
          name: 'Download receipt',
          weight: '200 KB'
        }
      ],
      dataPdf:[
        {
          name: 'Certificate',
          weight: '200 KB'
        },
        {
          name: 'Receipt',
          weight: '148 KB',
        },
      ],
      date: '24/04/23',
      dialogAreYouSure: false,
      tokenBenefits: [
        {
          name:"Lorem, ipsum dolor sit amet consectetur",
        },
        {
          name:"Lorem, ipsum dolor sit amet consectetur",
        },
        {
          name:"Lorem, ipsum dolor sit amet consectetur",
        },
        {
          name:"Lorem, ipsum dolor sit amet consectetur",
        },
        {
          name:"Lorem, ipsum dolor sit amet consectetur",
        },
      ],

      time_selection: 'Year',
      dataCardEnergy: [
        {
          icon_source: 'mdi-waves',
          energy_source: 'Hydroenergy',
          region: 'Valparaiso, Chile',
          date: '24/12/2023',
          date_start: '12/03/2023',
          co2: '0,12%',
          radioactivity: '0,005%',
          // certification: 'Certification type',
        },
      ],

      series: [43],
      seriesRenewable: [{
        name: 'PRODUCT A',
        data: [24, 55, 31, 67, 12, 43]
      },],
      chartOptionsRenewable: {
        chart: {
          type: 'bar',
          height: 200,
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
          labels: {
            show: true,
            style:{
              fontWeight: 700,
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1
        },
      },
      seriesBar: [
        {
        name: 'PRODUCT A',
        data: [11424, 33355, 32431, 21167, 9212, 44543, 11664, 45155, 12841, 45637, 12122, 19443]
        }, 
      ],
      chartOptionsBar: {
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
        colors: ['#00393D'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              enabled: false,
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false
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
    value1(){
      this.radioSell = 1;
    },
    value2(){
      this.radioSell = 2;
    },
    goDetails(){
    },
    goToStaticOrDynamic(){
      if(this.radioSell == 2){
        this.dialogSellOptions = false;
        this.dialogStaticPrice = true;
      }else if(this.radioSell == 1){
        this.dialogSellOptions = false;
        this.dialogDynamicPrice = true;
      }
    },
  }
}

</script>