<template>
  <v-card max-width="400" class="mx-auto pa-3" color="milky" elevation="3">
    <v-card-text class="pt-0">
      <v-list-item>
        <v-list-item-avatar tile size="50">
          <v-avatar>
            <v-icon large>{{d.icon ? d.icon : 'mdi-poll'}}</v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="overline font-weight-bold">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{d.count ? d.count : '0'}} {{d.title}}</span>
              </template>
              <span>{{d.title}}</span>
            </v-tooltip>
          </v-list-item-title>
          <v-list-item-subtitle class="caption font-weight-regular">
            <span x-small outlined color="white lighten-1" text-color="white">{{d.title}}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ["d"]
};
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  box-sizing: border-box;
  padding: 2em;
  font-family: Ubuntu;
  border-radius: 10px;
  color: white;
  line-height: 25px;
  box-shadow: 5px 5px 1px #ccc;
  margin-right: 1em;
}

.card.green {
  background: linear-gradient(150deg, #39ef74, #961276 100%);
}
</style>