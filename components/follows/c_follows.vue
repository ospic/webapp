<template>
   <v-card rounded outlined>
     <v-list-item :to="'/profile/'+follow.id" three-line >
       <v-list-item-avatar>
         <v-img
           src="https://cdn4.vectorstock.com/i/1000x1000/50/68/avatar-icon-of-girl-in-a-baseball-cap-vector-16225068.jpg"
           dark
         ></v-img>
       </v-list-item-avatar>
       <v-list-item-content>
         <v-list-item-title class="headline text-h6">{{ follow.username }}</v-list-item-title>
         <v-list-item-subtitle class="font-weight-light">{{ follow.role }}</v-list-item-subtitle>
         <v-list-item-subtitle>{{ follow.biography }}</v-list-item-subtitle>
       </v-list-item-content>
     </v-list-item>
   </v-card>

</template>

<script>
export default {
  name: "c_follows.vue",
  props:["follow"]
}
</script>

<style scoped>

</style>
