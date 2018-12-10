<template>
  <div class="list">
    <h1>{{list.title}} : </h1>
    <h3> {{list.description}} </h3>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['list']
  }
</script>

<style scoped>
</style>