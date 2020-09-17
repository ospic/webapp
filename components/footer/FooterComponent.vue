<template>
  <v-footer height="auto" class="hidden-xs-and-down">
    <v-container fluid>
      <v-layout wrap align-center justify-center row fill-height class="my-0 py-0">
        <v-flex xs12 md10 sm10 lg10 class="py-0 my-0">
          <p class="google-font" style="font-size:130%;">
            Follow Us:
            <span v-for="(item,i) in ChapterDetails.socialLinks" :key="i">
              <v-tooltip top>
                <v-btn text icon :href="item.link" target="_blank" slot="activator">
                  <v-icon color="info lighten-1">{{item.icon}}</v-icon>
                </v-btn>
                <span>{{item.name}}</span>
              </v-tooltip>
            </span>
          </p>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout wrap justify-center row>
        <p>Tanzania National Bureau of Statistics @2020</p>
      </v-layout>

      <!--<v-layout wrap justify-center row>
        <v-flex xs12 md10 lg10>
          <v-container fluid fill-height grid-list-md text-xs-center>
            <v-layout wrap align-center row class="my-2">
              <v-flex xs12 sm12 md4 order-md1 order-sm1 class="pa-2">
                <p class="google-font mb-0" style="font-size: 100%;font-weight: 300;">
                  <b>About</b>
                </p>
                <div v-for="(item,i) in FooterData.AboutSession" :key="i" class="mt-1">
                  <a
                    :href="item.Link"
                    class="google-font"
                    target="_blank"
                    style="color: #3E4551;text-decoration: none;font-size:100%"
                  >{{item.LinkName}}</a>
                  <br />
                </div>
              </v-flex>

              <v-flex xs12 md4 order-md2 sm12 lg4 class="pa-2">
                <p class="google-font mb-0" style="font-size: 100%;font-weight: 300;">
                  <b>Resources</b>
                </p>
                <div v-for="(item,i) in FooterData.ChapterResourcesSession" :key="i" class="mt-1">
                  <a
                    :href="item.Link"
                    class="google-font"
                    target="_blank"
                    style="color: #3E4551;text-decoration: none;font-size:100%"
                  >{{item.LinkName}}</a>
                  <br />
                </div>
              </v-flex>

              <v-flex xs12 md4 order-md3 sm12 lg4 class="pa-2">
                <p class="google-font mb-0" style="font-size: 100%;font-weight: 300;">
                  <b>Developer Console</b>
                </p>
                <div v-for="(item,i) in FooterData.DevConsole" :key="i" class="mt-1">
                  <a
                    :href="item.Link"
                    target="_blank"
                    class="google-font"
                    style="color: #3E4551;text-decoration: none;font-size:100%"
                  >{{item.LinkName}}</a>
                  <br />
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

      <v-layout wrap justify-center row class="mb-0">
        <v-flex xs12 md10 lg10>
          <v-btn
            v-for="(item,i) in FooterData.FooterEndSession"
            :key="i"
            :to="item.Link"
            target="_blank"
            outlined
            class="ml-1 info lighten-1 font-weight-light white--text"
            style="text-transform: capitalize"
            text
          >{{ item.LinkName }}</v-btn>
        </v-flex>
      </v-layout>-->
    </v-container>
  </v-footer>
</template>
<script>
export default {
  props: ["FooterData", "ChapterDetails"]
};
</script>