<template>
  <div class="row align-items-center" v-show="todos.length">
    <div class="col-sm-2 text-center">
      <label for="toggle-all">All Done</label>
      <input
        id="toggle-all"
        type="checkbox"
        :checked="alldone"
        @change="onAllDoneChange">
    </div>

    <div class="col-sm-10">
      <ul class="list-group">
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          class="list-group-item todo"
          :class="{ completed: todo.completed }"
          :value="todo"
          @remove="onRemoveTodo" />
      </ul>
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'

export default {
  components: {
    Todo
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    },
    alldone: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onAllDoneChange(evt) {
      const value = evt.target.checked
      this.$emit('change-all', value)
    },
    onRemoveTodo(todo) {
      this.$emit('remove', todo)
    }
  }
}
</script>

<style>
</style>
