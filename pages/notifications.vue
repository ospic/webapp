<template>
  <v-card class="mx-auto" max-width="">
    <v-card dark flat>
      <v-card-title class="pa-2 primary">
        <h3 class="title font-weight-light text-center grow">
          Notifications
        </h3>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item color="primary" small v-for="(item, i) in 10" :key="i">
          <v-row class="pt-1" no-gutters dense>
            <v-col cols="1">
              <strong
                >{{ item % 12 < 10 ? "0" + (item % 12) : item % 12 }}:00
                am</strong
              >
            </v-col>
            <v-col>
              <strong>The standard Lorem Ipsum passage,</strong>
              <div class="caption">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    total: 10
  })
};
</script>
