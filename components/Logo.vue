<template>
  <img
    :id="`${platformName}-logo`"
    class="h-8"
    :src="logoSrc"
    :class="additionalClass"
    :alt="platformName"
  />
</template>

<script>
export default {
  name: 'AppLogo',
  props: {
    additionalClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    platformName() {
      return 'lenkie'
    },
    logoSrc() {
      return '/theme/logo/lenkie.svg'
    },
  },
}
</script>
