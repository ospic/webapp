<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link to="/finance/transactions" class="active"
        >Transactions</router-link
      >
    </div>
    <h1>Transactions</h1>
  </div>
</template>
<script>
export default {
  created() {}
};
</script>
