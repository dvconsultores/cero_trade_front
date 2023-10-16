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
        <v-card class="card cards-rec" v-for="(item, index) in dataCardEnergy" :key="index">
          <div class="jspace divrow mt-6 mb-1">
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

        <div class="divrow" style="gap: 10px;">
          <v-btn class="btn" @click="dialogAreYouSure = true">
            Buy
          </v-btn>

          <v-btn class="btn" @click="dialogRedeemSure = true">
            Reedem
          </v-btn>

          <v-btn class="btn btn2" @click="dialogParticipantBenefits = true">
            Tokenize
          </v-btn>

          <v-btn class="btn btn2" @click="dialogSellOptions = true">
            Sell token
          </v-btn>
        </div>
      </v-col>

      <v-col xl="8" lg="8" md="6" cols="12">
        <v-card class="card">
          <h5 class="mb-10">Trading Volume</h5>
          <div class="jspace acenter divrow mb-6">
            <div>
              <h5 class="mb-2">219.10</h5>
              <span style="color: #00555B;">+16.87 (8.12%) <v-icon>mdi-triangle-small-up</v-icon></span>
            </div>

            <v-select
            v-model="time_selection"
            :items="['Year', 'Month']"
            variant="outline"
            flat
            menu-icon="mdi-chevron-down"
            class="select"
            bg-color="#ffffff"
            hide-details
            density="compact"
            style="max-width: 120px;"
            ></v-select>
          </div>
          <apexchart type="candlestick" height="350" :options="chartOptionsCandle" :series="seriesCandle"></apexchart>
        </v-card>
      </v-col>

      <v-col xl="4" lg="4" md="6" cols="12">
        <v-card class="card mb-6">
          <h6>Token benefits</h6>
          <span style="color: #475467;">
            Certifications that accept this type of IREC
          </span>

          <v-divider :thickness="2" class="tertiary mt-4 mb-4" style="height: 1px;width: 150%;position: relative; left: -80px;"></v-divider>

          <div class="divcol">
            <span v-for="(item, index) in tokenBenefits" :key="index" style="color: #475467;" class="center mt-1 mb-1">
              <img src="@/assets/sources/icons/check.svg" alt="Check" style="width: 20px;" class="mr-2"> {{ item.name }}
            </span>
          </div>
        </v-card>

        <v-card class="card divcol">
          <span style="color: #475467;">Inssuance Date</span>
          <span class="mt-2 mb-4">{{ date }}</span>

          <div v-for="(item,index) in dataPdf" :key="index" class="border mb-4 jspace">
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
        </v-card>
      </v-col>

      <v-col xl="8" lg="8" md="12" cols="12">
        <v-card class="card">
          <v-row>
            <v-col xl="7" lg="7" md="6" cols="12">
              <h5 class="mb-6">About facility</h5>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at deleniti expedita, cumque quod esse veniam eveniet commodi 
                similique? Quis voluptate quas ea? Alias, nisi consequuntur. Excepturi, at laborum nemo, harum placeat ea natus sunt, 
                provident id obcaecati a quod, Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempore laborum quod 
                doloremque ducimus, consequatur neque atque nesciunt ex aliquam debitis commodi itaque, enim natus laboriosam hic? Explicabo,
                consequatur corrupti.
                <br><br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quisquam error, totam voluptatum fugiat harum, Lorem ipsum 
                dolor sit amet consectetur adipisicing elit. Eligendi, laudantium.
              </span>
            </v-col>

            <v-col xl="5" lg="5" md="6" cols="12">
              <v-card class="card divcol" style="min-height: 100%!important;">
                <span style="color: #475467;">
                  Company name
                </span>
                <span class="mb-4">
                  Facility Name Ltd
                </span>
                <span style="color: #475467;">
                  Company address
                </span>
                <span class="mb-4">
                  Fake address 123, Santiago, Chile
                </span>

                <v-sheet class="divrow" style="gap: 10px; background-color: transparent;">
                  <img src="@/assets/sources/images/avatar-company.svg" alt="Avatar">
                  <div class="divcol">
                    <span style="font-weight: 700;">Sysnus</span>
                    <span>olivia@cerotrade.com</span>
                  </div>
                </v-sheet>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Tokenize Are your sure? -->
    <v-dialog v-model="dialogAreYouSure" persistent>
      <v-card class="card dialog-card-tokenize">
        <v-icon class="close" @click="dialogAreYouSure = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-check-decagram-outline</v-icon>
        <h6>Are you sure you want to de-tokenize your I-REC?</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <div class="div-check-items mt-4 mb-2">
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogAreYouSure = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogAreYouSure = false;dialogDetokenize = true" style="border: none!important;">Yes I am sure</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog Detokenize -->
    <v-dialog v-model="dialogDetokenize" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogDetokenize = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-check-decagram-outline</v-icon>
        <h6>De-tokenization details</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <v-icon>mdi-arrow-right</v-icon>
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
          </div>

          <div class="divrow mb-10 astart">
            <h5 class="mb-0 mr-2">
              $ 124.05
            </h5>
            <span style="color:#475467">per MWh</span>
          </div>

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

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogDetokenize = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogDetokenize = false;" style="border: none!important;">De-Tokenize</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog redeem sure -->
    <v-dialog v-model="dialogRedeemSure" persistent>
      <v-card class="card dialog-card-tokenize">
        <v-icon class="close" @click="dialogRedeemSure = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-sync</v-icon>
        <h6>Are you sure you want to redeem your I-REC?</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <div class="div-check-items mt-4 mb-2">
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
          <span class="tertiary center">
            <img src="@/assets/sources/icons/check-grey.svg" alt="Check icon" class="mr-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae. 
          </span>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogRedeemSure = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogRedeemSure = false;  dialogRedeem = true" style="border: none!important;">Yes I am sure</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog Redeem -->
    <v-dialog v-model="dialogRedeem" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogRedeem = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-check-decagram-outline</v-icon>
        <h6>Token redemption details</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <v-icon>mdi-arrow-right</v-icon>
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
          </div>

          <div class="divrow mb-10 astart">
            <h5 class="mb-0 mr-2">
              $ 124.05
            </h5>
            <span style="color:#475467">per MWh</span>
          </div>

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

        <div v-for="(item,index) in dataPdfRedeem" :key="index" class="border mb-4 mt-6 jspace">
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
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogRedeem = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogRedeem = false;" style="border: none!important;">De-Tokenize</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog sell options -->
    <v-dialog v-model="dialogSellOptions" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogSellOptions = false">mdi-close</v-icon>
        <img src="@/assets/sources/icons/sell.svg" alt="Sell icon" class="mb-6" style="width: 30px;">
        <h6>Choose price option to sell</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <div class="div-radio-sell" @click="value1()">
          <img src="@/assets/sources/icons/dynamic-price.svg" alt="Dynamic Sell" style="width: 15px;">
          <div class="divcol ml-6">
            <span><b>Dynamic price</b> range</span>
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
          </div>
          <v-radio v-model="radioSell" :value="1" density="compact" class="radio-right" @click="value1()"></v-radio>
        </div>

        <div class="div-radio-sell" @click="value2()">
          <img src="@/assets/sources/icons/static-price.svg" alt="Dynamic Sell" style="width: 20px;">
          <div class="divcol ml-6">
            <span><b>Static price</b> MWh</span>
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
          </div>
          <v-radio v-model="radioSell" :value="2" density="compact" class="radio-right" @click="value2()"></v-radio>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogSellOptions = false">Cancel</v-btn>
          <v-btn class="btn" @click="goToStaticOrDynamic()" style="border: none!important;">Next <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog static price -->
    <v-dialog v-model="dialogStaticPrice" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogStaticPrice = false">mdi-close</v-icon>
        <img class="mb-6" src="@/assets/sources/icons/static-price.svg" alt="Dynamic Sell" style="width: 20px;">
        <h6>Static price</h6>
        <span class="tertiary mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <label for="sale_amount">Sale amount</label>

        <div class="div-textfield-select mt-3 mb-2">
          <v-text-field
          id="card-number" class="input" variant="solo"  flat
          elevation="0" placeholder="$ 1,000.00"
          append-inner-icon="mdi-help-circle-outline"
          hide-details
          ></v-text-field>
          <v-select
            v-model="selectedCurrency"
            :items="itemsCurrency"
            variant="solo"
            flat
            density="compact"
            menu-icon="mdi-chevron-down"
            class="select"
            bg-color="transparent"
            hide-details
            style="color: #000;z-index: 99;"
          ></v-select>
        </div>

        <span>Amount per 1 MWh</span>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogStaticPrice = false; dialogSellOptions= true"><v-icon class="mr-2">mdi-arrow-left</v-icon> Back</v-btn>
          <v-btn class="btn" @click="dialogStaticPrice = false; dialogSellingDetailsReview = true" style="border: none!important;">Confirm</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog dynamic price -->
    <v-dialog v-model="dialogDynamicPrice" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogDynamicPrice = false">mdi-close</v-icon>
        <img class="mb-6" src="@/assets/sources/icons/dynamic-price.svg" alt="Dynamic Sell" style="width: 20px;">
        <h6>Dynamic price</h6>
        <span class="tertiary mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <div class="border-card jspace acenter mb-4">
          <div class="divrow"> 
            <img class="mr-4" src="@/assets/sources/icons/alert.svg" alt="Alert" style="width: 20px;">
            <span class="bold">Average selling price</span>
          </div>
          <span>124.00 € / per MWh</span>
        </div>

        <div class="border-card jspace acenter">
          <div class="divrow"> 
            <img class="mr-4" src="@/assets/sources/icons/static-price.svg" alt="Price Range" style="width: 20px;">
            <span class="bold">Price range</span>
          </div>
          <span>min. 100.00 € - max. 148.00 € / per MWh</span>
        </div>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogDynamicPrice = false; dialogSellOptions = true"><v-icon class="mr-2">mdi-arrow-left</v-icon> Back</v-btn>
          <v-btn class="btn" @click="dialogDynamicPrice = false; dialogSellingDetailsReview = true" style="border: none!important;">Confirm</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog selling details review -->
    <v-dialog v-model="dialogSellingDetailsReview" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogSellingDetailsReview = false">mdi-close</v-icon>
        <img class="mb-6" src="@/assets/sources/icons/wallet.svg" alt="Wallet" style="width: 20px;">
        <h6>Selling details review</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <span class="bold mt-3">Checkout review</span>

          <v-divider class="mb-3 mt-4"  thickness="2" style="width: 150%; position: relative; left: -50px;"></v-divider>
          
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <v-icon>mdi-arrow-right</v-icon>
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
          </div>

          <div class="divrow mb-10 astart">
            <h5 class="mb-0 mr-2">
              $ 124.05
            </h5>
            <span style="color:#475467">per MWh</span>
          </div>

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

          <v-divider class="mb-3 mt-4"  thickness="2" style="width: 100%;"></v-divider>

          <div class="jspace divrow mt-4">
            <span>Transaction fee (10%)</span>
            <span>2.41€ - 8.24€</span>
          </div>
        </v-card>

        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogSellingDetailsReview = false">Cancel</v-btn>
          <v-btn class="btn" @click="dialogSellingDetailsReview = false;" style="border: none!important;">Put on the market</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog participant benefits -->
    <v-dialog v-model="dialogParticipantBenefits" persistent>
      <v-card class="card card-dialog-participant">
        <v-icon class="close" @click="dialogParticipantBenefits = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-check-decagram-outline</v-icon>
        <h6>Enjoy participant benefits</h6>
        <span class="tertiary">Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias laboriosam iste eum, repellendus.</span>
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
        <div class="divrow center mt-6" style="gap: 10px;">
          <v-btn class="btn" style="background-color: #fff!important;"  @click="dialogParticipantBenefits = false; dialogPurchaseReview = true">Proceed as non-participant</v-btn>
          <v-btn class="btn" @click="dialogParticipantBenefits = false;" style="border: none!important;">Become a participant</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog purchase review -->
    <v-dialog v-model="dialogPurchaseReview" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogPurchaseReview = false">mdi-close</v-icon>
        <img class="mb-6" src="@/assets/sources/icons/wallet.svg" alt="Wallet" style="width: 20px;">
        <h6>Purchase review</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <span class="bold mt-3">Checkout review</span>

          <v-divider class="mb-3 mt-4"  thickness="2" style="width: 150%; position: relative; left: -50px;"></v-divider>
          
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <div class="divrow astart">
              <h5 class="mr-2">
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
            <span style="color: #475467;">Certification type</span>
            <span>{{ item.certification }}</span>
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
          <v-btn class="btn" @click="dialogPurchaseReview = false; dialogPaymentConfirm = true" style="border: none!important;">Put on the market</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Dialog payment confirm -->
    <v-dialog v-model="dialogPaymentConfirm" persistent>
      <v-card class="card dialog-card-detokenize">
        <v-icon class="close" @click="dialogPaymentConfirm = false">mdi-close</v-icon>
        <v-icon class="mb-6">mdi-check-decagram-outline</v-icon>
        <h6>Payment confirmation</h6>
        <span class="tertiary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo illum asperiores eaque perferendis iure nemo.</span>

        <v-card class="card cards-rec mt-6 pa-6" v-for="(item, index) in dataCardEnergy" :key="index">
          <div class="jspace divrow mb-1 acenter">
            <h5 class="acenter"><img src="@/assets/sources/images/avatar-rec.svg" alt="Avatar" class="mr-2" style="width: 40px;"> #123455667</h5>
            <div class="divrow astart">
              <h5 class="mr-2">
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
            <span style="color: #475467;">Date of Inssuance</span>
            <span>{{ item.date }}</span>
          </div>

          <div class="jspace divrow mb-1">
            <span style="color: #475467;">Certification type</span>
            <span>{{ item.certification }}</span>
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
          <v-btn class="btn" style="background-color: #fff!important;"  @click="$router.push('marketplace')">Back to marketplace</v-btn>
          <v-btn class="btn" @click="dialogPaymentConfirm = false;" style="border: none!important;">View token</v-btn>
        </div>
      </v-card>
    </v-dialog>
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

      seriesCandle: [{
        data: [
          {
            x: new Date(1538778600000),
            y: [180, 185, 179, 182]
          },
          {
            x: new Date(1538780400000),
            y: [182, 188, 179, 183]
          },
          {
            x: new Date(1538782200000),
            y: [179, 186, 180, 184]
          },
          {
            x: new Date(1538784000000),
            y: [183, 184, 182, 185]
          },
          {
            x: new Date(1538785800000),
            y: [181, 187, 178, 183]
          },
          {
            x: new Date(1538787600000),
            y: [180, 185, 179, 182]
          },
          {
            x: new Date(1538789400000),
            y: [183, 184, 179, 182] 
          },
          {
            x: new Date(1538791200000),
            y: [179, 187, 181, 184]
          },
          {
            x: new Date(1538793000000),
            y: [181, 185, 179, 182]
          },
          {
            x: new Date(1538794800000),
            y: [183, 184, 179, 182] 
          },
          {
            x: new Date(1538796600000),
            y: [180, 187, 179, 183]
          },
          {
            x: new Date(1538798400000),
            y: [182, 185, 181, 184]
          },
          {
            x: new Date(1538800200000),
            y: [181, 185, 180, 182]
          },
          {
            x: new Date(1538802000000),
            y: [179, 186, 179, 183]
          },
          {
            x: new Date(1538803800000),
            y: [180, 184, 178, 183]
          },
          {
            x: new Date(1538805600000),
            y: [183, 184, 179, 182] 
          },
          {
            x: new Date(1538807400000),
            y: [182, 185, 179, 183]
          },
          {
            x: new Date(1538809200000),
            y: [179, 188, 181, 184]
          },
          {
            x: new Date(1538811000000),
            y: [181, 186, 180, 183]
          },
          {
            x: new Date(1538812800000),
            y: [183, 184, 179, 182] 
          },
          {
            x: new Date(1538814600000),
            y: [180, 185, 179, 182]
          },
          {
            x: new Date(1538816400000),
            y: [182, 187, 180, 183]
          },
          {
            x: new Date(1538818200000),
            y: [179, 186, 181, 184]
          },
          {
            x: new Date(1538820000000),
            y: [183, 184, 179, 182] 
          },
          {
            x: new Date(1538821800000),
            y: [183, 184, 181, 185]
          },
          {
            x: new Date(1538823600000),
            y: [182, 186, 178, 183]
          },
          {
            x: new Date(1538825400000),
            y: [180, 187, 180, 184]
          },
          {
            x: new Date(1538827200000),
            y: [182, 185, 179, 183]
          },
          {
            x: new Date(1538829000000),
            y: [179, 186, 180, 182]
          },
          {
            x: new Date(1538830800000),
            y: [181, 185, 179, 183]
          },
        ]
      }],
      chartOptionsCandle: {
        chart: {
          type: 'candlestick',
          height: 350,
          toolbar: {
            show: false
          },
        },
        title: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: false
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#00555B',
              downward: '#F97066'
            },
          },
        },
      },
    }
  },


  methods:{
    value1(){
      this.radioSell = 1;
    },
    value2(){
      this.radioSell = 2;
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