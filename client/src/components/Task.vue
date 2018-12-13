<template>
  <div class="task">
    {{taskData.title}}: {{taskData.description}}
    <button @click="showCommentForm = !showCommentForm"> Add Comment</button>
    <comment v-for="comment in taskData.comment" :comment="comment" />
    <commentForm v-if="showCommentForm" />
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
    methods: {},
    components: {
      comment,
      commentForm
    },
    props: ["taskData"]

  }

</script>

<style>


</style>