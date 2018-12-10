<template>
  <div class="board">
    <h1>
      {{activeBoard.title}}: {{activeBoard.description}}
    </h1>
    <form @submit.prevent="createList">
      <input type="text" placeholder="Title" v-model="newList.title">
      <input type="textarea" placeholder="Description" v-model="newList.description">
      <input type="submit">
      <list v-for="list in lists" :list="list">List</list>
    </form>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    mounted() {
      this.$store.dispatch('getBoardById', this.boardId)
      this.$store.dispatch('getLists', this.boardId)
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      }
    },
    components: {
      List
    },
    data() {
      return {
        newList: {
          title: '',
          description: '',
          boardId: ''
        }
      }
    },
    methods: {
      createList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('createList', this.newList)
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    props: ["boardId"]
  };
</script>