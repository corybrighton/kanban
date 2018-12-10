<template>
  <div class="board">
    {{boardId}}
    <form @submit.prevent="createList">
      <input type="text" placeholder="Title" v-model="newList.title">
      <input type="textarea" placeholder="Description" v-model="newList.description">
      <input type="submit">
    </form>
    {{activeBoard}}
  </div>
</template>

<script>
  export default {
    name: "board",
    mounted() {
      this.$store.dispatch('getBoardById', this.boardId)
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      }
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