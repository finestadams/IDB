<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        id="menu-button"
        type="button"
        class="inline-flex w-full items-center justify-center bg-transparent px-4 py-2 text-xs font-medium text-theme-navbar-text focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        aria-expanded="true"
        aria-haspopup="true"
        @click.prevent="showDropDown = !showDropDown"
      >
        Account
        <!-- Heroicon name: solid/chevron-down -->
        <svg
          class="-mr-1 ml-2 h-4 w-4"
          stroke-width="1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="origin-top-right absolute right-0 mt-2 w-[10rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100"
      :class="[
        showDropDown
          ? 'block transition ease-out duration-100 transform opacity-100 scale-100'
          : ' transition ease-in duration-75 transform opacity-100 scale-100 hidden',
      ]"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          class="text-gray-700 block px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
          :class="[]"
          role="menuitem"
          tabindex="-1"
          @click.prevent="() => navigate(item.path)"
          >{{ item.name }}</a
        >
      </div>
      <div class="py-1">
        <button
          type="submit"
          class="text-gray-700 block w-full text-left px-4 py-2 text-xs hover:bg-gray-50"
          role="menuitem"
          tabindex="-1"
          @click.prevent="logout"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetToDefaultTheme } from '~/utils/theme'
const MENU_ITEMS = [
  {
    name: 'Mandates',
    path: '/mandates',
  },
  {
    name: 'Payments',
    path: '/payments',
  },
  {
    name: 'Repayments',
    path: '/repayments',
  },
]

export default {
  name: 'NavigationDropdown',
  data() {
    return {
      menuItems: MENU_ITEMS,
      showDropDown: false,
    }
  },
  methods: {
    navigate(path) {
      this.showDropDown = false
      this.$router.push(path)
    },
    async logout() {
      this.showDropDown = false
      resetToDefaultTheme()
      await localStorage.clear()
      await this.$auth.logout()
    },
  },
}
</script>
