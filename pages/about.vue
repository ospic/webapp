<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" class="justify-center" justify="center" no-gutters>
      <v-col cols="12" class="d-flex justify-space-around">
        <v-flex xs6 class="d-flex align-center justify-end flex-column">
          <div class="font-weight-black">
            Made by
            <a href="https://github.com/ospic" target="_blank">Ospic </a>
            as an open source Hospital management system
            <a
              style="color: blue; text-decoration: underline"
              href="https://app.ospicx.com/"
              target="_blank"
              >Ospic HMS</a
            >
            Copyright &copy; {{ new Date().getFullYear() }} The Apache Software
            Foundation, Licensed under the
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              style="color: blue; text-decoration: underline"
              target="_blank"
            >
              Apache License, Version 2.0.</a
            >. Documentation can be found
            <a
              style="color: blue; text-decoration: underline"
              href="https://docs.ospicx.com/welcome"
              target="_blank"
              >here</a
            >
            and you can get to this app repository

            <a
              style="color: blue; text-decoration: underline"
              href="https://github.com/ospic/webapp"
              target="_blank"
              >here</a
            >
          </div>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
export default {
  meta: {
    auth: {
      requiresAuth: false
    }
  },
  layout: "home",
  data: () => ({
    valid: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    payload:{
       password: "password",
       username: "demo",
      
    },
    image:"https://images.squarespace-cdn.com/content/v1/5608c2dae4b0ffbc0ff092a2/1462484735802-94M1A977HJJEL2THCD2Q/ke17ZwdGBToddI8pDm48kLl6r9ydDU0pEbLAVM93WoUUqsxRUqqbr1mOJYKfIPR7IxQp-SzSi0mUVxNxPLQ2a8ST-OHudl8xFkQoit3yJpm7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dtBAdYz4rrMKLrjAsWFNRtjSprFKWBuEhUbdsZxltHXcCjLISwBs8eEdxAxTptZAUg/Medical-physician-doctor-hands.png?format=2500w",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  computed: {

  },
  methods: {
    login() {
      
    this.$store.dispatch("_authenticate_then_login",  this.payload)
    },
    nativateToHere(id) {
      this.$router.push('/' + id);
    },
  },
 beforeMount() {
    console.log(this.$store.getters.isLoggedIn);
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  }
};
</script>
