<template>
  <div
    :class="[open ? 'absolute z-10' : 'hidden']"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      :class="[
        open
          ? 'ease-out duration-300 opacity-100'
          : 'hidden ease-in duration-200 opacity-0',
      ]"
    ></div>

    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      :class="[
        open
          ? 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100'
          : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 hidden',
      ]"
    >
      <div
        class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <div
          class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
        >
          <template v-if="!submitted">
            <div class="bg-[#f9f9f9] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex w-full">
              <form v-if="paymentData" class="grid w-full gap-y-4">
                <div>
                  <h2 v-if="stage === 1" class="font-semibold text-2xl mb-2">
                    Initiate Payment
                  </h2>
                  <h2 v-if="stage === 2" class="font-semibold text-2xl mb-2">
                    Confirm Payment
                  </h2>
                  <!-- <p class="text-xs text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas molestiae eum quia ut nam quis?
                  </p> -->
                </div>
                <template v-if="stage === 1">
                  <div class="grid">
                    <label class="text-[12px] opacity-80 capitalize text-black"
                      >Company Name</label
                    >
                    <input
                      :value="paymentData.company.registered_name"
                      type="text"
                      class="border border-[#999999] rounded-[8px] p-4 cursor-not-allowed"
                      autocomplete="organization-title"
                      disabled
                    />
                  </div>
                  <div class="grid">
                    <label class="text-[12px] opacity-80 capitalize text-black"
                      >Amount</label
                    >
                    <input
                      v-model="form.amount"
                      v-cleave="cleaveOptions"
                      type="text"
                      name="number"
                      class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 pl-4 pr-[4rem] mt-0.5 rounded-xl font-bold"
                      placeholder="GBP|USD 0.00"
                    />
                  </div>
                </template>
                <div v-if="stage === 2" class="tracking-wide">
                  Please confirm that you are about to initiate a payment from
                  <b class="uppercase">{{
                    paymentData.company.registered_name
                  }}</b>
                  for a fee amounting to <strong>{{ form.amount }}</strong> and
                  cannot be reversed.
                </div>
                <div v-if="stage === 2" class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="tc"
                      v-model="checked"
                      name="tc"
                      type="checkbox"
                      class="focus:ring-gray-500 h-4 w-4 text-black border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="tc" class="text-gray-500"
                      >By checking this box, you agree to providing consent for
                      this request to be processed
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div
              v-if="stage === 1"
              class="bg-[#f9f9f9] px-4 py-3 pb-6 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary sm:ml-3 sm:w-auto sm:text-sm bg-theme-primary text-white"
                @click.prevent="handleStageOne"
              >
                Continue
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary bg-transparent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click.prevent="() => $emit('close')"
              >
                Cancel
              </button>
            </div>
            <div
              v-if="stage === 2"
              class="bg-[#f9f9f9] px-4 py-3 pb-6 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary sm:ml-3 sm:w-auto sm:text-sm"
                :class="[
                  checked
                    ? 'bg-theme-primary text-white cursor-pointer'
                    : 'text-gray-600 bg-gray-300 cursor-not-allowed',
                ]"
                :disabled="!checked"
                @click.prevent="authorizeAccount"
              >
                Continue
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary bg-transparent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click.prevent="stage = 1"
              >
                Back
              </button>
            </div>
          </template>
          <div
            v-if="stage === 3"
            class="bg-[#f9f9f9] px-4 pb-4 sm:p-6 sm:pb-4 w-full pt-[31px] grid"
          >
            <img class="h-[6rem] mx-auto" src="/icons/success.svg" />
            <div class="mt-8">
              <h3 class="text-lg font-bold text-center">Successful</h3>
              <p
                class="text-sm mt-4 text-center text-[#667085] text-opacity-80"
              >
                You have successfully initiated payment on this company account.
              </p>
              <button
                class="flex gap-x-4 font-normal px-6 py-3 bg-theme-primary rounded-lg text-xs w-fit mt-4 mb-8 mx-auto items-center text-white"
                @click.prevent="() => $emit('reload')"
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePaymentModalComponent',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    paymentData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      stage: 1,
      mode: 'credentials',
      submitted: false,
      checked: false,
      form: {
        companyName: null,
        amount: null,
        originalAmount: 0,
      },
      cleaveOptions: {
        prefix: '',
        numeral: true,
        numeralPositiveOnly: true,
        noImmediatePrefix: true,
        rawValueTrimPrefix: true,
        numeralIntegerScale: 9,
        numeralDecimalScale: 2,
      },
    }
  },
  beforeMount() {
    this.cleaveOptions.prefix = `${this.paymentData?.currency || 'GBP'} `
  },
  methods: {
    handleStageOne() {
      let amount = this.form.amount
      if (typeof amount !== 'string') {
        return this.$toast({
          text: `Invalid amount supplied.`,
          type: 'error',
        })
      }

      amount = +amount
        .toLowerCase()
        .replaceAll('gbp', '')
        .replaceAll(',', '')
        .trim()
      if (isNaN(amount)) {
        return this.$toast({
          text: `Invalid amount supplied.`,
          type: 'error',
        })
      }
      this.stage = 2
      this.originalAmount = amount
    },
    authorizeAccount() {
      try {
        // const payload = {
        //   ...this.form,
        //   seller_id: this.$store.state.profile.data.sellerId,
        // }

        // await this.$backMarketApi.post('/Credentials', value)
        // await this.$mixpanel.track(`Connect Platform`, {
        //   Platform: 'BackMarket',
        //   'Platform Type': 'ECommerce',
        //   'Connection Status': 'Connected',
        // })
        this.submitted = true
        this.stage = 3
      } catch (error) {
        this.$toast({
          text: `Your BackMarket account could not be connected, please retry.`,
          type: 'error',
        })
      }
    },
  },
}
</script>
