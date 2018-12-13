<template>
  <div class="board container-fluid">
    <div class="row d-flex justify-content-center align-items-center">
      <router-link class="col-2" data-toggle="tooltip" data-placement="bottom" title="Back to Boards" :to="{name: 'boards'}"><i
          class="fas fa-arrow-left fa-2x"></i></router-link>
      <h1 class="col-8"> {{activeBoard.title}}: {{activeBoard.description}} </h1>
      <i data-toggle="tooltip" data-placement="bottom" title="Create List" @click="showCreateListForm = !showCreateListForm"
        class="col-2 far fa-plus-square fa-2x"></i>
    </div>
    <form @submit.prevent="createList" v-if="showCreateListForm">
      <input type="text" placeholder="Title" v-model="newList.title" required>
      <input type="textarea" placeholder="Description" v-model="newList.description" required>
      <button data-toggle="tooltip" data-placement="bottom" title="Add List" type="submit"><i class="fas fa-plus"></i></button>
    </form>
    <div class="row d-flex justify-content-center">
      <list v-for="list in lists" :list="list">List</list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    mounted() {
      this.$store.dispatch('getBoardById', this.$route.params.boardId)
      this.$store.dispatch('getLists', this.boardId)
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      },
      board() {
        return this.$store.state.boards.find((b => b._id) == this.boardId) || { title: 'Loading...' }
      }
    },
    components: {
      List
    },
    data() {
      return {
        showCreateListForm: false,
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
        this.newList = { title: '', description: '', boardId: '' }
      }
    },
    props: ["boardId"]
  };
</script>

<style>

</style>