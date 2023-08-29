<template>
  <div>
    <NavigationBar />
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  name: 'NoAuthLayout',
  components: { NavigationBar },
  middleware: ['white-label'],
  data() {
    return {}
  },
  computed: {},
}
</script>
