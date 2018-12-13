<template>
  <div class="Taskform">
    <form @submit.prevent="createTask">
      <input type="text" placeholder="Task" v-model="newTask.title" required>
      <input type="text" placeholder="Description" v-model="newTask.description" required>
      <button data-toggle="tooltip" data-placement="bottom" title="Add Task" type="submit"><i class="fas fa-plus"></i></button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Taskform',
    data() {
      return {
        newTask: {
          listId: '',
          boardId: '',
          title: '',
          description: ''
        }
      }
    },
    computed: {},

    methods: {
      createTask() {
        this.newTask.listId = this.list._id
        this.newTask.boardId = this.list.boardId
        this.$store.dispatch("createTask", this.newTask)
        this.newTask = { listId: '', boardId: '', title: '', description: '' }
      }
    },
    props: ["list"]
  }

</script>

<style>


</style>