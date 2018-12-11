import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    addList(state, list) {
      state.lists.push(list)
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setTasks(state, tasks) {
      // state.tasks[listId] = tasks
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getBoardById({ commit }, id) {
      api.get('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //Create a list and add to end of lists
    createList({ commit }, newList) {
      api.post('/lists', newList)
        .then(res => {
          console.log("Created List", res.data)
          commit('addList', res.data)
        })
    },
    getLists({ commit }, boardId) {
      api.get('/lists/' + boardId)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    getTasks({ commit }, listId) {
      api.get('/lists/' + listId)
        .then(res => {
          commit('setTasks', res.data)
        })
    },
    createTask({ commit }, newTask) {
      api.post('/tasks/' + newTask.listId, newTask)
        .then(res => {
          commit('setTasks', res.data)
        })
    }
  }
})