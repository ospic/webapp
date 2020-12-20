<template>
  <v-card outlined dense class="mx-auto" color="#EAEAEA">
    <v-card-title class="font-weight-regular py-1 pb-0" dense>
      <p class="font-weight-regular">On: {{ post.date }}</p>
    </v-card-title>
    <v-card-text class="white text--primary py-2">
      {{ post.symptoms }}
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
