<template>
  <div class="min-h-screen h-full relative">
    <NavigationBar />
    <Nuxt />

    <footer class="bg-gray-100 w-full py-2 absolute bottom-0">
      <div
        class="max-w-[1217px] mx-auto flex justify-between sm:flex-row flex-col py-1 px-4 xl:px-0 sm:gap-y-0 gap-y-2"
      >
        <ul class="text-theme-footer flex justify-center items-center gap-x-4">
          <li>
            <a
              href="tel:+447939498942"
              class="text-xs hover:underline inline-flex items-center gap-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +44 7939 498942
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@lenkie.com"
              class="text-xs hover:underline inline-flex items-center gap-x-1"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@lenkie.com
            </a>
          </li>
        </ul>
      </div>
    </footer>

    <CreatePaymentModal
      :open="showModal"
      :payment-data="paymentData"
      @close="showModal = false"
      @continue="showModal = false"
      @reload="reloadPage"
    />
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
import { EventBus } from '~/utils/bus'

export default {
  name: 'AuthLayout',
  components: {
    NavigationBar,
    CreatePaymentModal: () => import('~/components/Modals/CreatePayment.vue'),
  },
  middleware: ['auth', 'token'],
  data() {
    return {
      showModal: false,
      paymentData: null,
    }
  },
  computed: {},
  beforeMount() {
    EventBus.$on('initiatePayment', this.initiatePayment)
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    initiatePayment(data) {
      this.paymentData = data
      this.showModal = true
    },
  },
}
</script>
