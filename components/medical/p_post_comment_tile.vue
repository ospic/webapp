<template>
  <v-list-item sm="12" dense :key="index" :to="'/post/'+comment.id" three-line>
    <v-list-item-avatar>
      <v-img src="https://i.pinimg.com/originals/96/90/ca/9690cabed5d0a12fa6bfbe4f2d17d65d.jpg"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-subtitle>
        <span class='text--primary font-weight-bold'>{{comment.owner.first_name }}&nbsp;{{ comment.owner.last_name }}</span> &mdash;
        <span  class="text--caption font-weight-light">{{comment.created_at  | DateFormat }}</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <p  class="body-2 text-caption">{{ comment.text_content }}</p>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ['comment', 'index'],
  name: "p_post_comment_tile.vue"
}
</script>

<style scoped>

</style>
