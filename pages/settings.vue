<template>
  <nuxt-child :key="this.$router.currentRoute.name" />
</template>
<script>
export default {
  layout: "settings"
};
</script>
<style scoped>
.nuxt-link-exact-active.nuxt-link-active li a {
  text-decoration: none !important;
}
</style>
