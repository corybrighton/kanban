<template>
  <div class="list">
    <h1>{{list.title}} : </h1>
    <h3> {{list.description}} </h3>
    <button @click="showTaskform = !showTaskform">Add Task</button>
    <task v-for="task in tasks" :taskData="task"></task>
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
    methods: {},
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    }
  }
</script>

<style scoped>
</style>