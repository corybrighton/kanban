<template>
  <div class="task">
    {{taskData.title}}: {{taskData.description}}
  </div>
</template>

<script>


  export default {
    name: 'Task',
    data() {
      return {

      }
    },
    computed: {},
    methods: {},
    props: ["taskData"]

  }

</script>

<style>


</style>