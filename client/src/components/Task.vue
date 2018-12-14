<template>
  <div class="task">
    <div class="container-fluid">

      <!-- Title of Tasks -->
      <div class="row text-left">
        <h4> {{taskData.title}}: {{taskData.description}} </h4>
      </div>

      <!-- Comments rows -->
      <div class="row">
        <comment class="col-12 d-flex justify-content-between" v-for="comment in taskData.comments" :commentData="comment"
          :taskId="taskData._id" :listId="taskData.listId" />
      </div>

      <!-- Icon row -->
      <div class="row d-flex justify-content-end ">

        <div class="col-2">
          <i data-toggle="tooltip" data-placement="bottom" title="Comment" @click="showCommentForm = !showCommentForm"
            class="fas fa-comment-dots fa-2x"></i>
        </div>
        <div class="col-2">
          <i data-toggle="tooltip" data-placement="bottom" title="Delete Task" @click="deleteTask" class="fas fa-eraser fa-2x"></i>
        </div>
        <div class="col-2 dropdown" data-toggle="tooltip" data-placement="bottom" title="Move Task">
          <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h6 class="dropdown-header">Choose List To Move To</h6>
            <a class="dropdown-item" @click="moveTask(list._id)" v-for="list in lists">{{list.title}}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment From -->
    <commentForm v-if="showCommentForm" :taskId="taskData._id" :listId="taskData.listId" />
    <hr>
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
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      deleteTask() {
        let ids = {
          listId: this.taskData.listId,
          taskId: this.taskData._id
        }
        this.$store.dispatch('deleteTask', ids)
      },
      moveTask(listId) {
        let ids = {
          listId: listId,
          taskId: this.taskData._id,
          boardId: this.taskData.boardId
        }
        this.$store.dispatch('moveTask', ids)
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
  hr {
    color: white;
    background-color: aliceblue;
  }
</style>