<template>
  <div class="min-h-screen h-full">
    <AppSpinner additional-class="absolute left-[50%] top-[50%]" />
  </div>
</template>

<script>
import AppSpinner from '~/components/Spinner.vue'

export default {
  name: 'CallbackPage',
  components: {
    AppSpinner,
  },
  head() {
    return {
      title: 'Callback | Lenkie',
    }
  },
}
</script>
