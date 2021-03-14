<template>
      <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
    
  
    <v-card outlined  elevation="">
    <v-card-title class="d-flex justify-center">
       <h2 v-if="error.statusCode === 404" class=" warning--text">{{ pageNotFound }}</h2>
    <h2 v-else class=" warning--text">{{ otherError }}</h2>
    </v-card-title>
    <v-card-text>
       <NuxtLink to="/" class="d-flex justify-center" @click="dialog = false">Go back to Homepage</NuxtLink>
    </v-card-text>
    </v-card>
    </v-dialog>
      </div>
      
</template>

<script>
export default {
  layout: "finance",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error has occurred",
      dialog: false,
    };
  },
  created(){
    this.dialog =true;
  }
};
</script>

<style scoped>
 .center{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    padding: 1%;
}
</style>
