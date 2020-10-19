<template>
  <div v-if="userdata !== null">
    <card-info :userdata="userdata"></card-info>
  </div>
</template>

<script>
import info_card_info from "@/components/profile/c_info_card";
export default {
  components: {
    "card-info": info_card_info
  },
  data() {
    return {
      userdata: null
    };
  },

  methods: {
    async viewusedata() {
      return await this.$api
        .$get(`patients/${this.$route.params.id}/`)
        .then(response => {
          this.userdata = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.viewusedata();
  }
};
</script>

<style scoped></style>
