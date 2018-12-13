<template>
  <div class="commentForm">
    <form @submit.prevent="createComment">
      <input type="text" placeholder="Comment" v-model="comment">
      <button type="submit">Add Comment</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'commentForm',
    data() {
      return {
        newComment: {
          listId: '',
          comment: ''
        }
      }
    },
    computed: {},
    methods: {
      createComment() {
        this.newComment.listId = this.task.listId
        this.$store.dispatch('createComment', this.newComment.comment)
      }
    }
  }

</script>

<style>


</style>