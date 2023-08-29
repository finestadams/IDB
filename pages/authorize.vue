<template><div /></template>

<script>
export default {
  name: 'AuthorizationPage',
  head() {
    return {
      title: 'Authorize your account | Lenkie',
    }
  },
  mounted() {
    this.$auth.loginWith('oidc')
  },
}
</script>
