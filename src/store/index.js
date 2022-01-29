import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalog: {
      items: [
        {
          order: 5,
          title: 'title 1',
          shortDescription: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
          price: 99.90,
          description: `lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem`,
        },
        {
          order: 0,
          title: 'title 2',
          shortDescription: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
          price: 199.90,
          description: `lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem`,
        },
        {
          order: 10,
          title: 'title 3',
          shortDescription: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
          price: 499.90,
          description: `lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem`,
        },
        {
          order: 8,
          title: 'title 4',
          shortDescription: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
          price: 999.90,
          description: `lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem`,
        }
      ],
    },
    user: {
      isLogged: false,
      isAdmin: false,
      login: '',
      id: -1
    },
    
    thePost: {},
  },
  mutations: {
    addUSer(state, user) {
      localStorage.removeItem('vuex')

      state.user.isAdmin = user.isAdmin
      state.user.isLogged = true
      state.user.login = user.login
      state.user.id = user.id
    }, 
    editUser(state, user) {
      localStorage.removeItem('vuex')

      console.log(user)

      const url = `http://localhost:8081`

      fetch(`${this.url}/edit_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(() => {
        state.user.isAdmin = user.isAdmin
        state.user.isLogged = true
        state.user.login = user.newLogin
      })
      .catch(err => {
        console.log('Что-то пошло не так..')
        console.log(err)
      })
    },
    removeUser(state) {
      state.user.isAdmin = false
      state.user.isLogged = false
      state.user.login = ''
      state.user.id = -1
    },
    addPost(state, post) {
      state.thePost = post
    },
    addPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    addUser({commit}, user) {
      if(user.id === 6) {
        commit('addUSer', {...user, isAdmin: true})
        return
      }
      commit('addUSer', {...user, isAdmin: false})
    },
    editUser({commit}, user) {
      commit('editUser', user)
    },
    removeUser({commit}) {
      commit('removeUser')
    },
    addPost({commit}, post) {
      commit('addPost', post)
    },
    addPosts({commit}, posts) {
      commit('addPosts', posts)
    }
  },
  getters: {
    getItems(state) {
      return state.catalog.items
    },
    getUserLogin(state) {
      return state.user.login
    },
    getUserId(state) {
      return state.user.id
    },
    isLogged(state) {
      return state.user.isLogged
    },
    isAdmin(state) {
      return state.user.isAdmin
    },
    getPost(state) {
      return state.thePost
    },
    getPosts(state) {
      return state.posts
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) =>
            localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }),
  ],
})
