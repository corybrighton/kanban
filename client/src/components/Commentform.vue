<template>
  <div class="commentForm">
    <form @submit.prevent="createComment">
      <input type="text" placeholder="Comment" v-model="newComment.comment.body" required>
      <button data-toggle="tooltip" data-placement="bottom" title="Add Comment" type="submit"><i class="fas fa-plus"></i></button>
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
          taskId: '',
          comment: {
            body: ''
          }
        }
      }
    },
    computed: {},
    methods: {
      createComment() {
        this.newComment.taskId = this.taskId
        this.newComment.listId = this.listId
        this.$store.dispatch('createComment', this.newComment)
        this.newComment = { listId: '', taskId: '', comment: { body: '' } }
      }
    },
    props: ['taskId', 'listId']
  }

</script>

<style>


</style>