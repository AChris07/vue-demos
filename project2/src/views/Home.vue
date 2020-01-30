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
        @keyup.enter="onTodoAdd">
    </template>

    <TodoList
      :todos="filteredTodos"
      :alldone="allDone"
      @change-all="changeAllTodos"
      @remove="removeTodo" />

    <template #footer>
      <div class="d-flex align-items-center justify-content-center" v-if="todos.length">
        <span>
          <strong>{{ remainingTodos }}</strong> {{ remainingTodos | pluralize }} left
        </span>
        <FilterSelector
          :disable="todos.length < remainingTodos"
          :value="visibility"
          @change="setVisibility"
          @remove-all="removeCompleted" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import uniqueId from 'lodash.uniqueid'

import Layout from '../components/Layout.vue'
import TodoList from '../components/TodoList.vue'
import FilterSelector from '../components/FilterSelector.vue'
import filters from '../constants/filters'

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('todo')

export default {
  components: {
    Layout,
    TodoList,
    FilterSelector
  },
  data() {
    return {
      newTodo: ''
    } 
  },
  computed: {
    ...mapState(['todos', 'visibility']),
    ...mapGetters(['filteredTodos', 'remainingTodos']),
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
    ...mapActions([
      'setTodos',
      'addTodo',
      'removeTodo',
      'changeAllTodos',
      'setVisibility'
    ]),
    onTodoAdd() {
      const title = this.newTodo && this.newTodo.trim()
      if (!title) return

      this.addTodo({
        id: uniqueId('todo_'),
        title,
        completed: false
      })
      this.newTodo = ''
    },
    removeCompleted() {
      this.setTodos(filters.active(this.todos))
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
