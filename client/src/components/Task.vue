<template>
  <div class="task">
    {{taskData.title}}: {{taskData.description}}
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