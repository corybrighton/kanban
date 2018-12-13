<template>
  <div class="list card col-3 p-2 m-2">
    <div class="card-header d-flex justify-content-around align-items-center">
      <h3>{{list.title}} : {{list.description}}</h3>
      <i data-toggle="tooltip" data-placement="bottom" title="Create Task" @click="showTaskform = !showTaskform" class="fas fa-plus"></i>
      <i data-toggle="tooltip" data-placement="bottom" title="Delete List" @click="deleteList" class="fas fa-trash-alt"></i>
    </div>
    <div class="card-body">
      <task v-for="task in tasks" :taskData="task" v-if="task.listId == list._id"></task>
      <taskform v-if="showTaskform" :list='list'></taskform>
    </div>
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