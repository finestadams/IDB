<template>
  <section class="mx-auto pt-12 w-full max-w-[1217px] pb-[100px] px-4 sm:px-0">
    <div class="flex items-center justify-between mb-[50px]">
      <h1 class="text-2xl md:text-3xl capitalize">Create Mandate</h1>
    </div>

    <div class="border border-gray-200 rounded-2xl max-w-[768px] p-8 sm:p-12">
      <form
        class="grid grid-cols-12 gap-8 w-full"
        @submit.prevent="createMandate"
      >
        <div class="col-span-12 grid relative">
          <label
            class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
            >Company Name</label
          >
          <div class="w-full relative">
            <input
              :value="companyName"
              class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 p-4 mt-0.5 rounded-xl font-bold"
              :class="[
                companyNotFound
                  ? 'border-red-400 focus-visible:border-gray-400'
                  : 'border-gray-400 focus-visible:border-theme-primary',
              ]"
              placeholder="Enter company name"
              @keyup.prevent="searchCompanies"
            />
            <span
              class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"
            >
              <svg
                v-if="isRequest"
                class="animate-spin h-5 w-5 text-theme-primary-text mt-1"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="matrix(0.5833333333333334,0,0,0.5833333333333334,0,0)"
                >
                  <path
                    d="M12 0.747L12 4.497"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M12 23.247L12 19.497"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M4.045 4.042L6.697 6.694"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M19.955 19.952L17.303 17.301"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M0.75 11.997L4.5 11.997"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M23.25 11.997L19.5 11.997"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M4.045 19.952L6.697 17.301"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M19.955 4.042L17.303 6.694"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>

              <svg
                v-if="companyNotFound"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </span>
          </div>

          <div
            :class="`absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll ${
              showResults
                ? 'transform opacity-100 scale-100'
                : 'transform opacity-0 scale-95 hidden'
            }`"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="{-1}"
            style="max-height: 300px; z-index: 9999"
          >
            <div class="py-1" role="none">
              <a
                v-for="(r, i) in results"
                :id="i"
                :key="i"
                href="#!"
                class="text-theme-primary-text text-left grid hover:bg-gray-200 w-full px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="{-1}"
                @click.prevent="() => chooseCompany(r)"
              >
                <span class="text-md font-semibold">
                  {{ r.registered_name }}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          v-if="bankAccounts && bankAccounts.length > 0"
          class="grid grid-cols-12 gap-8 col-span-12"
        >
          <div class="col-span-12 grid">
            <label
              for="account"
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Choose Bank Account</label
            >
            <select
              id="account"
              v-model="chosenBankAccountId"
              name="account"
              class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 mt-0.5 rounded-xl font-bold appearance-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(account, index) in bankAccounts"
                :key="index"
                :value="account.id"
              >
                {{ account.display_name }} - {{ account.account_number }}({{
                  account.currency
                }})
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 col-span-12">
          <div class="col-span-12 sm:col-span-6">
            <label
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Valid From</label
            >
            <vc-date-picker
              v-model="mandate.valid_from"
              :min-date="new Date()"
              color="indigo"
              mode="dateTime"
              is24hr
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 mt-0.5 rounded-xl font-bold"
                  :value="inputValue"
                  placeholder="Valid From Date"
                  v-on="inputEvents"
                />
              </template>
            </vc-date-picker>
          </div>

          <div class="col-span-12 sm:col-span-6">
            <label
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Valid To</label
            >
            <vc-date-picker
              v-model="mandate.valid_to"
              :min-date="mandate.valid_from"
              color="indigo"
              mode="dateTime"
              is24hr
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 mt-0.5 rounded-xl font-bold"
                  :value="inputValue"
                  placeholder="Valid To Date"
                  v-on="inputEvents"
                />
              </template>
            </vc-date-picker>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 col-span-12">
          <div class="col-span-12 sm:col-span-6">
            <label
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Maximum Individual Amount</label
            >
            <div class="relative">
              <input
                id="number"
                v-model="mandate.maximum_individual_amount"
                v-cleave="cleaveOptions"
                type="text"
                name="number"
                class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 pl-4 pr-[4rem] mt-0.5 rounded-xl font-bold"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <select
                  id="currency"
                  v-model="mandate.currency"
                  name="currency"
                  class="ring-gray-400 border border-gray-400 h-full py-0 border-transparent bg-transparent text-gray-500 sm:text-sm appearance-none pr-4 pl-2"
                >
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Maximum Periodic Amount</label
            >
            <div class="relative">
              <input
                id="number"
                v-model="mandate.maximum_periodic_amount"
                v-cleave="cleaveOptions"
                type="text"
                name="number"
                class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 pl-4 pr-[4rem] mt-0.5 rounded-xl font-bold"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <select
                  id="currency"
                  v-model="mandate.currency"
                  name="currency"
                  class="ring-gray-400 border border-gray-400 h-full py-0 border-transparent bg-transparent text-gray-500 sm:text-sm appearance-none pr-4 pl-2"
                >
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 col-span-12">
          <div class="col-span-12 sm:col-span-6 grid">
            <label
              for="periodic_limit_type"
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Periodic Limit Type</label
            >
            <select
              id="periodic_limit_type"
              v-model="mandate.periodic_limit_type"
              name="periodic_limit_type"
              class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 mt-0.5 rounded-xl font-bold appearance-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(type, index) in periodicLimitTypes"
                :key="index"
                :value="type.toLowerCase().replaceAll(' ', '_')"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label
              for="periodic_alignment_type"
              class="sm:text-[12px] text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
              >Periodic Alignment Type</label
            >
            <select
              id="periodic_alignment_type"
              v-model="mandate.periodic_alignment_type"
              name="periodic_alignment_type"
              class="w-full placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg sm:text-xl ring-0 border border-gray-400 focus-visible:border-theme-primary p-4 mt-0.5 rounded-xl font-bold appearance-none"
            >
              <option :value="null">Choose</option>
              <option
                v-for="(item, index) in periodicAlignments"
                :key="index"
                :value="item.toLowerCase()"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-8 col-span-12">
          <h5
            v-if="error"
            class="text-red-700 font-medium text-sm mb-4 col-span-12"
          >
            <span class="font-bold">Error</span>: {{ error.message }}
          </h5>
          <div class="col-span-12 grid">
            <p
              class="sm:text-[12px] inline-flex items-center gap-x-4 text-[10px] uppercase text-gray-700 opacity-70 font-semibold"
            >
              <input
                v-model="isConfirmed"
                type="checkbox"
                class="text-theme-primary"
              />
              By ticking this box, you can confirm that the field entries are
              valid for submission
            </p>
            <button
              class="w-fit mt-4 placeholder-shown:font-normal placeholder-shown:opacity-60 text-lg py-4 px-8 rounded-xl font-semibold appearance-none"
              :class="[
                isConfirmed
                  ? 'bg-theme-primary text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed',
              ]"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { debounce } from 'lodash'
import { JoiValidate, CREATE_MANDATE } from '~/schema'
import { MOCK_BANK_ACCOUNTS } from '~/utils/mock'

export default {
  name: 'CreateMandateIndexPage',
  layout: 'auth',
  data() {
    return {
      isConfirmed: false,
      isRequestPending: false,
      debounce,
      idFormChanged: false,
      isRequest: false,
      companyNotFound: false,
      results: [],
      showResults: false,
      cancelToken: undefined,
      company: null,
      companyName: null,
      bankAccounts: [],
      chosenBankAccount: null,
      chosenBankAccountId: null,
      cleaveOptions: {
        numeral: true,
        numeralPositiveOnly: true,
        noImmediatePrefix: true,
        rawValueTrimPrefix: true,
        numeralIntegerScale: 9,
        numeralDecimalScale: 2,
      },
      mandate: {
        valid_from: new Date(),
        valid_to: null,
        currency: 'GBP',
        maximum_individual_amount: null,
        maximum_periodic_amount: null,
        periodic_alignment_type: null,
        periodic_limit_type: null,
      },
      error: null,
    }
  },
  head() {
    return {
      title: 'Create Mandate | Lenkie Internal',
    }
  },
  computed: {
    periodicLimitTypes() {
      return ['Day', 'Week', 'Month', 'Fortnight', 'Half Year', 'Year']
    },
    periodicAlignments() {
      return ['Consent', 'Calendar']
    },
  },
  methods: {
    chooseCompany(company) {
      this.showResults = false
      this.company = company
      this.companyName = company.registered_name
      let bankAccounts = company.bank_accounts
      if (bankAccounts.length < 1 && this.$config.ENV === 'local') {
        bankAccounts = MOCK_BANK_ACCOUNTS
      }

      this.bankAccounts = bankAccounts
    },
    searchCompanies: debounce(async function (evt) {
      try {
        const value = evt.target?.value || ''
        this.companyName = value
        if (value.length < 1) return

        this.companyNotFound = false
        this.isRequest = true

        if (typeof this.cancelToken !== typeof undefined) {
          this.cancelToken.cancel('Operation canceled due to new request.')
        }

        this.cancelToken = axios.CancelToken.source()

        const { data } = await this.$lenkieCompositionApi.get(
          `/Organisations?query=${value}`,
          { cancelToken: this.cancelToken?.token }
        )

        this.isRequest = false

        if (data.length > 0) {
          this.showResults = true
          this.results = data
          return
        } else {
          this.$toast({
            text: 'No company results available.',
            type: 'error',
            time: 3,
          })
          this.results = []
          this.showResults = false
          this.companyNotFound = true
        }
      } catch (error) {
        if (axios.isCancel(error)) return
        this.companyNotFound = true
        this.$toast({
          text:
            error.response?.message ||
            'Failed to retrieve available company results',
          type: 'error',
          time: 3,
        })
      } finally {
        this.isRequest = false
        this.cancelToken = undefined
      }
    }, 800),
    async createMandate() {
      try {
        this.error = null
        const account = this.bankAccounts?.find(
          (a) => a.id === this.chosenBankAccountId
        )
        this.mandate.maximum_individual_amount =
          this.mandate.maximum_individual_amount?.replaceAll(',', '')
        this.mandate.maximum_periodic_amount =
          this.mandate.maximum_periodic_amount?.replaceAll(',', '')

        if (
          this.mandate.maximum_individual_amount <
          this.mandate.maximum_periodic_amount
        ) {
          this.error = {
            message:
              'Maximum Individual Amount must be greater or equal to the maximum Periodic Amount',
          }
          return
        }

        const payload = { ...this.mandate, account, organisation: this.company }
        const values = JoiValidate(CREATE_MANDATE, payload)
        const { error } = values
        if (error) {
          this.error = error
          return
        }

        await this.$lenkieCompositionApi.post(
          `/Mandates/${this.company.id}`,
          payload
        )
      } catch (error) {
        this.errors = Object.values(error.response.data?.errors || {})
      }
    },
  },
}
</script>
