<template>
  <section class="mx-auto pt-12 w-full max-w-[1217px] pb-[100px] px-4 sm:px-0">
    <div class="flex items-center justify-between mb-[50px]">
      <h1 class="text-2xl md:text-3xl capitalize font-bold">View Mandates</h1>

      <nuxt-link
        to="/mandates/create"
        class="flex gap-x-4 font-normal px-6 py-3 w-fit bg-theme-primary rounded-lg text-white text-xs items-center opacity-90 hover:opacity-100"
      >
        Create Mandate
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </nuxt-link>
    </div>

    <div class="grid col-span-12 items-center overflow-hidden">
      <h3 class="mb-2">Mandates ({{ tableData.length || 0 }})</h3>
      <ul
        class="text-center md:grid lg:grid grid-cols-12 items-center text-sm p-4 border-t border-l border-r border-gray-200 md:rounded-t-xl lg:rounded-t-xl hidden"
      >
        <li class="col-span-2 hidden text-center md:block lg:block">
          <span class="text-theme-primary-text text-xs cursor-help">
            Company Name
          </span>
        </li>
        <li
          class="col-span-1 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Valid From
          </span>
        </li>
        <li
          class="col-span-1 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Valid Till
          </span>
        </li>
        <li
          class="col-span-2 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Max Individual Amount
          </span>
        </li>
        <li
          class="col-span-2 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Max Periodic Amount
          </span>
        </li>
        <li
          class="col-span-2 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Periodic Limit Type
          </span>
        </li>
        <li
          class="col-span-2 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Periodic Alignment Type
          </span>
        </li>
      </ul>

      <div
        class="grid border border-gray-200 rounded-b-xl overflow-hidden rounded-t-xl md:rounded-t-none lg:rounded-t-none"
      >
        <ul
          v-for="(td, index) in tableData"
          :key="index"
          :class="[
            index !== tableData.length - 1
              ? `border-b border-gray-200`
              : `border-b-0`,
            index % 2 === 0 && ` bg-gray-50`,
          ]"
          class="grid grid-cols-12 items-center px-4 py-6 md:py-4 lg:py-4 gap-4 cursor-pointer text-center hover:bg-gray-50"
          @click.prevent="() => initiatePayment(td)"
        >
          <li
            class="md:block lg:block text-theme-primary-text col-span-3 md:col-span-2 text-left md:text-center lg:text-center font text-xs"
          >
            <p
              class="text-xs text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Company Name
            </p>
            {{ td.company.trading_name }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-1 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Valid From
            </p>
            {{ formatDate(td.valid_from) }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-1 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Valid Till
            </p>
            {{ formatDate(td.valid_to) }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-2 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Max Individual Amount
            </p>
            {{ formatToCurrency(td.maximum_individual_amount) }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-2 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Max Periodic Amount
            </p>
            {{ formatToCurrency(td.maximum_periodic_amount) }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-2 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Periodic Limit Type
            </p>
            {{ td.periodic_alignment_type }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-2 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Periodic Alignment Type
            </p>
            {{ td.periodic_limit_type }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import { EventBus } from '~/utils/bus'
import { MOCK_MANDATE } from '~/utils/mock'

export default {
  name: 'MandatesIndexPage',
  layout: 'auth',
  data() {
    return {}
  },
  head() {
    return {
      title: 'View Mandates | Lenkie Internal',
    }
  },
  computed: {
    tableData() {
      return MOCK_MANDATE
    },
  },
  methods: {
    initiatePayment(data) {
      EventBus.$emit('initiatePayment', data)
    },
    formatToCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
      }).format(amount)
    },
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  },
}
</script>
