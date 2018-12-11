<template>
  <div class="Taskform">
    <form @submit.prevent="createTask">

      <input type="text" placeholder="Task" v-model="newTask.title">
      <input type="text" placeholder="Description" v-model="newTask.description">
      <button type="submit">Create Task</button>
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
      }
    },
    props: ["list"]
  }

</script>

<style>


</style>