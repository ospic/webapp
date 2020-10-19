<template>
  <v-card outlined dense class="mx-auto pa-1">
    <v-card-title class="font-weight-normal pa-1">
      {{ post.diagnosisReport }}
    </v-card-title>
    <v-card-subtitle class="pa-2 text-caption font-weight-light ">
      Created By: {{ post.createdBy }}&nbsp;On
      {{ post.createdDate | DateFormat }} &nbsp; Modified By:
      {{ post.lastModifiedBy }}&nbsp;On
      {{ post.lastModifiedDate | DateFormat }}
    </v-card-subtitle>

    <v-divider></v-divider>
    <v-card-text class="text--primary ma-0 mt-2 py-0">
      <ul>
        <li>{{ post.diagnosisReport }}</li>
        <li>{{ post.treatmentType }}</li>
        <li>{{ post.medicineNames }}</li>
        <li>{{ post.laboratoryTests }}</li>
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
    images:[
      "https://freepsdmock-up.com/wp-content/uploads/2018/06/Free-Wine-Bottle-Label-Mockups-1.jpg",
      "https://wpepitome.com/wp-content/uploads/2019/07/29_wine-bottle-mockups.jpg",
      "https://worldbranddesign.com/wp-content/uploads/2020/02/design-for-vida-wine-brand.jpg",
      "https://s23444.pcdn.co/wp-content/uploads/2020/01/Africa-general-pic.jpg.optimal.jpg",
      "https://dibonphuong.files.wordpress.com/2019/09/most-beautiful-landscapes-in-europe-hallstatt-copyright-canadastock-european-best-destinations.jpg",
      "https://secure.img1-fg.wfcdn.com/im/80685197/resize-h800-w800%5Ecompr-r85/3073/30739909/Siera+4+Bottle+Wall+Mounted+Wine+Bottle+and+Glass+Rack+in+White.jpg"
    ]

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
