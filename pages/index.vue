<template>
  <section class="mx-auto pt-12 w-full max-w-[1217px] pb-[100px] px-4 sm:px-0">
    Internal Dashboard
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'auth',
  data() {
    return {
      service: 'HomeGrowthCapitalView',
    }
  },
  head() {
    return {
      title: 'Home | Lenkie',
    }
  },
}
</script>
