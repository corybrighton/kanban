<template>
  <div class="list">
    <h1>{{list.title}} : </h1>
    <h3> {{list.description}} </h3>
    <button @click="showTaskform = !showTaskform">Add Task</button>
    <task></task>
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
    name: 'List',
    props: ['list'],
    components: {
      Task,
      Taskform
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>