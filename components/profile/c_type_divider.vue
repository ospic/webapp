<template>
  <v-list class="ma-0">
    <v-list-item class="ma-0 pa-0">
      <v-list-item-avatar size="45px" class="grey--text ma-0 mr-1 pa-1">
        <span class="font-weight-regular text-caption text-uppercase black--text" >{{ type }}</span>
      </v-list-item-avatar>
      <v-divider></v-divider>
    </v-list-item>
  </v-list>
</template>
<script lang="js">
export default {
  props:["type"]
}
</script>
