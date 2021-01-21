<template>
  <h2 v-if="routeparam === 'themes'">{{ this.routeparam }}</h2>
  <h2 v-else-if="routeparam === 'email'">{{ this.routeparam }}</h2>

  <h2 v-else>Not themes</h2>
</template>

<script>
export default {
  created() {
    console.log(this.$router.currentRoute);
  },
  beforeMount() {
    console.log(this.$router.currentRoute);
  },
  computed: {
    routeparam: {
      get() {
        return this.$router.currentRoute.params.command;
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
