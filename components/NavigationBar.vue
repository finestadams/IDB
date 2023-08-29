<template>
  <nav class="h-[73px] bg-theme-navbar-bg flex item-center">
    <div
      class="mx-auto flex w-full max-w-[1217px] items-center justify-between px-4 xl:px-0"
    >
      <nuxt-link to="/">
        <AppLogo />
      </nuxt-link>
      <div class="flex items-center gap-x-4">
        <nuxt-link
          to="/credit-check"
          class="text-xs font-medium text-theme-navbar-text hidden sm:block"
          >Credit Check</nuxt-link
        >

        <!-- <nuxt-link
          to="/mandates"
          class="text-xs font-medium text-theme-navbar-text hidden sm:block"
          >Mandates</nuxt-link
        >
        <nuxt-link
          to="/payments"
          class="text-xs font-medium text-theme-navbar-text hidden sm:block"
          >Payments</nuxt-link
        > -->
        <!-- <nuxt-link
          to="/repayments"
          class="text-xs font-medium text-theme-navbar-text hidden sm:block"
          >Repayments</nuxt-link
        > -->
        <div class="sm:hidden">
          <NavigationDropdown />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AppLogo from './Logo.vue'
import NavigationDropdown from './Navigation/NavigationDropdown.vue'
export default {
  name: 'NavigationBar',
  components: { AppLogo, NavigationDropdown },
  mounted() {},
}
</script>
