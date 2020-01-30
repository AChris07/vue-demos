<template>
  <Layout>
    <template #header>
      <h1>To-Do Manager</h1>
      <input
        autofocus
        autocomplete="off"
        class="form-control"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo">
    </template>

    <TodoList
      :todos="filteredTodos"
      :alldone="allDone"
      @change-all="changeAllTodos"
      @remove="removeTodo" />

    <template #footer>
      <div class="d-flex align-items-center justify-content-center" v-if="todos.length">
        <span>
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <FilterSelector
          :disable="todos.length < remaining"
          v-model="visibility"
          @remove-all="removeCompleted" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from './components/Layout.vue'
import TodoList from './components/TodoList.vue'
import FilterSelector from './components/FilterSelector.vue'
import filters from './constants/filters'

export default {
  name: 'app',
  components: {
    Layout,
    TodoList,
    FilterSelector
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      visibility: 'all'
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
    allDone() {
      return this.remaining === 0
    }
  },
  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    changeAllTodos(value) {
      this.todos.forEach(function (todo) {
        todo.completed = value
      })
    },

    removeCompleted() {
      this.todos = filters.active(this.todos)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
