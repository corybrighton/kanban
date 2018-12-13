<template>
  <div class="comment">
    {{commentData.body}}
    <i data-toggle="tooltip" data-placement="bottom" title="Delete Comment" @click="deleteComment" class="fas fa-backspace"></i>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    data() {
      return {
        ids: {
          commentId: '',
          taskId: '',
          listId: ''
        }
      }
    },
    computed: {},
    methods: {
      deleteComment() {
        this.ids.commentId = this.commentData._id
        this.ids.taskId = this.taskId
        this.ids.listId = this.listId
        this.$store.dispatch('deleteComment', this.ids)
      }
    },
    props: ["commentData", "taskId", "listId"]
  }

</script>

<style>


</style>