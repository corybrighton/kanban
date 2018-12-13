<template>
  <div class="task">
    {{taskData.title}}: {{taskData.description}}
    <div class="btn-group">
      <button class="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        move
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item">Action</a>
        <a class="dropdown-item">Action 2</a>
      </div>
    </div>
    <i @click="showCommentForm = !showCommentForm" class="fas fa-comment-dots"></i>
    <i @click="deleteTask" class="fas fa-eraser"></i>
    <comment v-for="comment in taskData.comments" :commentData="comment" :taskId="taskData._id" :listId="taskData.listId" />
    <commentForm v-if="showCommentForm" :taskId="taskData._id" :listId="taskData.listId" />
  </div>
</template>

<script>
  import comment from "@/components/Comments.vue"
  import commentForm from "@/components/Commentform.vue"

  export default {
    name: 'Task',
    data() {
      return {
        showCommentForm: false
      }
    },
    computed: {},
    methods: {
      deleteTask() {
        let ids = {
          listId: this.taskData.listId,
          taskId: this.taskData._id
        }
        this.$store.dispatch('deleteTask', ids)
      }
    },
    components: {
      comment,
      commentForm
    },
    props: ["taskData"]

  }

</script>

<style>


</style>