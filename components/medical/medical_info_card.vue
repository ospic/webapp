<template>
  <v-card outlined dense class="mx-auto pa-1">
    <v-card-title class="font-weight-normal pa-1">
      {{ post.diagnosisReport }}
    </v-card-title>
    <v-card-subtitle class="pa-2 text-caption font-weight-light "
      >On: {{ post.date }}
    </v-card-subtitle>

    <v-divider></v-divider>
    <v-card-text class="text--primary ma-0 mt-2 py-0">
      <ul>
        <li>{{ post.symptoms }}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="js">
import mixin from "@/plugins/mixins.js";
export default {
  mixins:[mixin],
  props: ["post"],
  data: () => ({
    view: false,


  }),
  methods: {
    likePost(post){
      console.log(post.is_liked_by_me)
      post.is_liked_by_me ? this.unlike_this_post('unlikeBlogPosts',post.id) : this.like_this_post('likeBlogPosts',post.id)
    },
    text_truncate : function(str, length, ending) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    },
  },
  beforeMount() {
  }
}
</script>
<style>
* {
  text-transform: none !important;
}

.trancate {
  white-space: nowrap;
  width: 100%; /* IE6 needs any width */
  overflow: hidden; /* "overflow" value must be different from  visible"*/
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
}
</style>
