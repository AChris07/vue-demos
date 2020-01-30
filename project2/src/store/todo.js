import filters from '../constants/filters'

const state = {
  todos: [],
  visibility: 'all'
}

const getters = {
  filteredTodos: (state) => {
    return filters[state.visibility](state.todos)
  },
  remainingTodos: (state) => {
    return filters.active(state.todos).length
  }
}

const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo)
  },
  REMOVE_TODO(state, todo) {
    state.todos = state.todos.filter(
      (item) => item.id !== todo.id
    )
  },
  CHANGE_TODO(state, todo) {
    state.todos = state.todos.map(
      (item) => item.id === todo.id
        ? todo
        : item
    )
  },
  CHANGE_ALL_TODOS(state, completed) {
    state.todos = state.todos.map(
      (item) => ({ ...item, completed })
    )
  },
  SET_VISIBILITY(state, visibility) {
    state.visibility = visibility
  }
}

const actions = {
  setTodos({ commit }, todos) {
    commit('SET_TODOS', todos)
  },
  addTodo({ commit }, todo) {
    commit('ADD_TODO', todo)
  },
  removeTodo({ commit }, todo) {
    commit('REMOVE_TODO', todo)
  },
  changeTodo({ commit }, todo) {
    commit('CHANGE_TODO', todo)
  },
  changeAllTodos({ commit }, completed) {
    commit('CHANGE_ALL_TODOS', completed)
  },
  setVisibility({ commit }, visibility) {
    commit('SET_VISIBILITY', visibility)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
