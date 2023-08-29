<template>
  <section class="mx-auto pt-12 w-full max-w-[1217px] pb-[100px] px-4 sm:px-0">
    <div class="flex items-center justify-between mb-[50px]">
      <h1 class="text-2xl md:text-3xl capitalize font-bold">Payments</h1>
    </div>

    <div class="grid col-span-12 items-center overflow-hidden max-w-[960px]">
      <h3 class="mb-2">Total ({{ tableData.length || 0 }})</h3>
      <ul
        class="text-center md:grid lg:grid grid-cols-12 items-center text-sm p-4 border-t border-l border-r border-gray-200 md:rounded-t-xl lg:rounded-t-xl hidden"
      >
        <li class="col-span-3 hidden text-center md:block lg:block">
          <span class="text-theme-primary-text text-xs cursor-help">
            Company Name
          </span>
        </li>
        <li
          class="col-span-3 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Amount
          </span>
        </li>
        <li
          class="col-span-3 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Payment Date
          </span>
        </li>
        <li
          class="col-span-3 sm:text-sm text-theme-primary-text text-xs font-semibold"
        >
          <span class="text-theme-primary-text text-xs cursor-help">
            Status
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
        >
          <li
            class="md:block lg:block text-theme-primary-text col-span-3 md:col-span-3 text-left md:text-center lg:text-center font text-xs"
          >
            <p
              class="text-xs text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Company Name
            </p>
            {{ td.company.trading_name }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-3 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Amount
            </p>
            {{ td.currency }} {{ td.amount }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-3 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Payment Date
            </p>
            {{ formatDate(td.due_date) }}
          </li>
          <li
            class="text-theme-primary-text col-span-3 md:col-span-3 text-left md:text-center lg:text-center font-medium text-xs"
          >
            <p
              class="text-sm text-theme-primary-text font-light mb-1 block md:hidden lg:hidden"
            >
              Status
            </p>
            <span
              class="rounded-[16px] text-[12px] py-[4px] px-[8px] capitalize font-semibold"
              :class="[
                td.status === 'success' && 'text-green-700 bg-green-100',
                td.status === 'pending' && 'text-yellow-700 bg-yellow-100',
                (td.status === 'failed' || td.status === 'aborted') &&
                  'text-red-700 bg-red-100',
              ]"
              >{{ td.status }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import { MOCK_PAYMENT } from '~/utils/mock'

export default {
  name: 'MandatesIndexPage',
  layout: 'auth',
  data() {
    return {}
  },
  head() {
    return {
      title: 'View Payments | Lenkie Internal',
    }
  },
  computed: {
    tableData() {
      return MOCK_PAYMENT
    },
  },
  methods: {
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
