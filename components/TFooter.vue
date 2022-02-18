<template>
  <v-footer padless class="">
    <v-card class="flex transparent px-4" flat tile>
      <v-card-title class="transparent">
        <v-row no-gutters class="mx-6">
          <v-row cols="12" sm="3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  ><h4 class="font-weight-regular font-18">
                    Address
                  </h4></v-list-item-title
                >
                <v-list-item-subtitle class="mt-4">
                  <p>26 Mwai Kibaki Rd, Dar es Salaam, Tanzania</p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>
          <v-row cols="12" sm="3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  ><h4 class="font-weight-regular font-18">
                    Phone
                  </h4></v-list-item-title
                >
                <v-list-item-subtitle class="mt-4">
                  <p>Reception : +255 739 087 522</p>

                  <p>Office : +255 739 087 522</p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>
          <v-row cols="12" sm="3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  ><h4 class="font-weight-regular font-18">
                    Email
                  </h4></v-list-item-title
                >
                <v-list-item-subtitle class="mt-4">
                  <p>Office : ospicinfo@gmail.com</p>
                  <p>
                    Site :
                    <a
                      target="_blank"
                      class="link"
                      href="https://app.ospicx.com/"
                      >app.ospicx.com</a
                    >
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>
          <v-row cols="12" sm="3">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="black--text mb-3"
                  ><h4 class="font-weight-regular font-18">
                    Social
                  </h4></v-list-item-title
                >
                <v-list-item-subtitle class="mt-4">
                  <p>
                    <a
                      v-for="social in socials"
                      class="link"
                      :key="social.icon"
                      :href="social.link"
                      target="_blank"
                    >
                      <v-btn
                        class="mx-4 blue lighten-5"
                        fab
                        x-small
                        dense
                        :disabled="social.link == null"
                        icon
                      >
                        <v-icon size="24px" color="primary accent-4" small>
                          {{ social.icon }}
                        </v-icon>
                      </v-btn></a
                    >
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>
        </v-row>
      </v-card-title>
      <v-card-text class="py-2 mt-4 grey--text">
        <v-row no-gutters class="mx-6">
          <v-col cols="12" md="2">
            <p>
              All Rights Reserved by
              <a target="_blank" class="link" href="https://app.ospicx.com/"
                >app.ospicx.com</a
              >
            </p>
          </v-col>

          <v-col cols="12" md="6"> </v-col>
          <v-col cols="12" md="4">
            <p>
              <a target="_blank" class="link" href="http://docs.ospicx.com/"
                >Documentation
              </a>
              <a target="_blank" class="link mx-2" href="/#">Terms of Use </a>
              <a target="_blank" class="link mx-2" href="/#"
                >Legal Disclaimer
              </a>
              <a target="_blank" class="link" href="/#"> Privacy Policy</a>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      locales: ["English", "Kiswahili"],
      socials: [
        {
          icon: "mdi-twitter",
          link: "https://twitter.com/ospicapp?ref_src=twsrc%5Etfw",
        },
        { icon: "mdi-linkedin", link: null },
        { icon: "mdi-facebook", link: null },
        { icon: "mdi-instagram", link: null },
      ],
    };
  },
  head() {
    return {
      title: "Home Page",
    };
  },
};
</script>
<style scoped>
#nuxt,
#layout {
  background-color: brown;
}
</style>