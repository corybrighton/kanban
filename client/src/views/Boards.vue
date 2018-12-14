<template>
  <div class="boards">
    <h1>
      WELCOME TO THE BOARDS!!!
    </h1>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description" required>
      <button class="btn btn-primary" type="submit"><i class="far fa-plus-square"></i></button>
    </form>
    <div class="row d-flex justify-content-center" v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">
        <h4>{{board.title}}</h4>
      </router-link>
      <button class="btn btn-danger" @click="deleteBoard(board._id)"><i class="fas fa-trash fa-1x"></i></button>
    </div>
    <div class="fixed-top d-flex justify-content-end"><button @click="logout">Logout</button></div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in

    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch('logout')
      }
    }
  };
</script>
<style>
  body {
    background: url('https://www.hiltonheadisland.org/sites/default/files/2018-02/beaches_video.jpg')no-repeat center center fixed;
    background-size: cover;
  }
</style>