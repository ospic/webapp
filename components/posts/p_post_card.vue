<template>
  <v-card
    class="mx-auto">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="images[Math.floor(Math.random() * images.length)]"
    >
    </v-img>


    <v-card-subtitle class="ma-0 pa-0">
      <NuxtLink  :to="'/post/'+post.id" v-show="post.type === 'comment'">
       <v-list dense  class="ma-0 pa-0">
         <v-list-item dense class="ml-1 pa-0">
           <v-list-item-content class="ma-0 pa-0" >
             <v-list-item-title ma-0 pa-0>
                <v-btn x-small rounded depressed color="primary" class="mb-1 ps-0" >
                  <v-avatar  size="20px">
                    <img :src="images[Math.floor(Math.random() * images.length)]"
                      alt="post.owner.username" >
                  </v-avatar>
                  &nbsp;
                  {{ post.owner.first_name }}&nbsp;{{ post.owner.last_name }} replied</v-btn>&nbsp;
                <span class="font-weight-light text-caption" caption>{{ post.created_at | DateFormat}}</span>
             </v-list-item-title>
           </v-list-item-content>

         </v-list-item>
       </v-list>
      </NuxtLink>


      <!-- <v-row no-gutters>
       <v-btn x-small rounded depressed  class="font-weight-medium" color="primary">
         {{post.type}}
       </v-btn>
          <v-spacer></v-spacer>
          <v-row
            align="center"
            justify="end"

          >
            <v-btn text x-small>
              <v-icon class="mr-0 text-caption">mdi-heart</v-icon>
              <span class=" font-weight-light text-caption">{{ post.likes_count }}</span>
            </v-btn>
            <span class="mr-1">·</span>
            <v-btn text x-small>
              <v-icon class=" text-caption">mdi-comment</v-icon>
              <span class="font-weight-light text-caption">{{ post.comments_count }}</span>
            </v-btn>
          </v-row>
          </v-row>-->

       </v-card-subtitle>
    <!--<v-card-title class="font-weight-bold"> Top {{post.id}} australian beaches</v-card-title>-->
    <v-card-text class="text--primary ma-0 mt-2 py-0">
      {{text_truncate(post.text_content, null,null)}}
      <NuxtLink :to="'/post/'+post.id">
        <span class="info--text" >...</span>
      </NuxtLink>
    </v-card-text>


    <v-card-actions>
      <v-list-item dense >
        <NuxtLink :to="'/profile/'+post.owner.id">
        <v-list-item-avatar color="grey" v-show="post.type === 'post'">
          <img :src="images[Math.floor(Math.random() * images.length)]" alt="post.owner.username"/>
        </v-list-item-avatar>
        </NuxtLink>
        <v-list-item-content v-show="post.type === 'post'">
          <v-list-item-title class="subhead text-caption" >{{ post.owner.first_name }} {{ post.owner.last_name }}</v-list-item-title>
          <v-list-item-subtitle
            class="font-weight-medium text-caption">{{ post.created_at |  DateFormat  }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-row no-gutters >
          <v-row align="center"
            justify="end">
            <v-btn text x-small @click.stop="likePost(post)">
              <v-icon color="success" class="mr-0 text-caption" v-if="post.is_liked_by_me">mdi-heart</v-icon>
              <v-icon  class="mr-0 text-caption" v-else >mdi-heart-outline</v-icon>
              <span class=" font-weight-light text-caption">{{ post.likes_count }}</span>
            </v-btn>
            <span class="mr-1">·</span>
            <v-btn text x-small :to="'/post/'+post.id" @click.stop="commentPost(post.id)">
              <v-icon class=" text-caption">mdi-comment</v-icon>
              <span class="font-weight-light text-caption">{{ post.comments_count }}</span>
            </v-btn>
          </v-row>
        </v-row>


      </v-list-item>
    </v-card-actions>
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
*{ text-transform: none !important; }

.trancate {
  white-space: nowrap;
  width: 100%;                   /* IE6 needs any width */
  overflow: hidden;              /* "overflow" value must be different from  visible"*/
  -o-text-overflow: ellipsis;    /* Opera < 11*/
  text-overflow:    ellipsis;    /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
}
</style>
