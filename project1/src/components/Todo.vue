<template>
  <li
    class="list-group-item todo"
    :class="{ completed: value.completed }">
    <section>
      <input type="checkbox" v-model="value.completed">
      <label>{{ value.title }}</label>
      <button class="todo--remove btn btn-danger btn-sm" @click="onRemoveClick">
        X
      </button>
    </section>

  </li>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({ title: '', completed: false })
    }
  },
  methods: {
    onRemoveClick() {
      this.$emit('remove', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.todo {
  &--remove {
    border-radius: 25%;
  }
}
</style>
