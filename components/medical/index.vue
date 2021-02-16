<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md12 order-md2 order-sm2>
        <div class="font-weight-bold text-caption">
          Posts
        </div>
        <v-row>
          <v-col
            v-if="posts.results.length !== 0"
            cols="12"
            lg="3"
            md="4"
            sm="12"
            wrap
            v-for="(post, index) in posts.results"
            :key="index"
          >
            <post-card :post="post"></post-card>
          </v-col>
          <div v-else>
            No Data
          </div>
          <v-fab-transition>
            <v-btn
              fab
              small
              bottom
              right
              fixed
              class="primary darken-3 v-btn--example"
              to="/post"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-row>
      </v-flex>
    </v-layout>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="posts.total_pages"
        circle
        @input="getThisPage(page)"
        @next="getThisPage(page)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import postCard from "@/components/medical/medical_info_card";

export default {
  components: {
    "post-card": postCard
  },
  data: () => ({
    view: false,
    page: 1
  }),
  methods: {
    getThisPage(it) {
      console.log(it);
      this.$store.dispatch("getBlogPosts", "page=" + it).then(response => {
        console.log(response);
        this.$forceUpdate();
      });
    }
  },
  beforeMount() {},
  mounted() {
    //this.posts = this.$store.getters.posts;
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  }
};
</script>
