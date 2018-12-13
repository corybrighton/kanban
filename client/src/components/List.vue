<template>
  <div class="list">
    <h3>{{list.title}} : </h3>
    <h5> {{list.description}} </h5>
    <button @click="showTaskform = !showTaskform">Add Task</button>
    <i @click="deleteList" class="fas fa-trash-alt"></i>
    <task v-for="task in tasks" :taskData="task" v-if="task.listId == list._id"></task>
    <taskform v-if="showTaskform" :list='list'></taskform>
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  import Taskform from '@/components/Taskform.vue'

  export default {
    data() {
      return {
        showTaskform: false
      }
    },
    mounted() {
      this.$store.dispatch("getTasks", this.list._id)
    },
    name: 'List',
    props: ['list'],
    components: {
      Task,
      Taskform
    },
    methods: {
      deleteList() {
        let ids = {
          listId: this.list._id,
          boardId: this.list.boardId
        }
        this.$store.dispatch("deleteList", ids)
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.list._id]
      }
    }
  }
</script>

<style scoped>
</style>