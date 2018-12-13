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
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    }

  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getBoards')
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch('getBoards')
        })
        .catch(err => {
          console.log(err)
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getBoards')
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
        .catch(err => {
          router.push({ name: "boards" })
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
    createList({ commit, dispatch }, newList) {
      api.post('/lists', newList)
        .then(newList => {
          dispatch('getLists', newList.data.boardId)
        })
    },
    getLists({ commit, dispatch }, boardId) {
      api.get('/lists/' + boardId)
        .then(res => {
          commit('setLists', res.data)
          res.data.forEach(list => {
            dispatch('getTasks', list._id)
          });
        })
    },
    getTasks({ commit }, listId) {
      api.get('/tasks/' + listId)
        .then(res => {
          let payload = {
            listId: listId,
            tasks: res.data
          }
          commit('setTasks', payload)
        })
    },
    createTask({ commit, dispatch }, newTask) {
      api.post('/tasks/' + newTask.listId, newTask)
        .then(res => {
          dispatch('getTasks', res.data.listId)
        })
    },
    createComment({ commit, dispatch }, newComment) {
      api.post('/tasks/comments/' + newComment.taskId, newComment.comment)
        .then(res => {
          dispatch('getTasks', newComment.listId)
        })
    },
    deleteComment({ commit, dispatch }, ids) {
      let deletePath = `/tasks/comments/${ids.taskId}/${ids.commentId}`
      api.delete(deletePath)
        .then(res => {
          dispatch('getTasks', ids.listId)
        })
    },
    deleteTask({ commit, dispatch }, ids) {
      api.delete('/tasks/' + ids.taskId)
        .then(res => {
          dispatch('getTasks', ids.listId)
        })
    },
    deleteList({ commit, dispatch }, ids) {
      api.delete('/lists/' + ids.listId)
        .then(() => {
          dispatch('getLists', ids.boardId)
        })
    },
    moveTask({ commit, dispatch }, ids) {
      api.put('/tasks/' + ids.taskId, { listId: ids.listId })
        .then(res => {
          dispatch('getLists', ids.boardId)
        })
    }
  }
})