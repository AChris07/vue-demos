<template>
  <section class="btn-group">
    <button @click="onFilterChange('all')" class="btn btn-outline-secondary" :class="{ active: value === 'all' }">All</button>
    <button @click="onFilterChange('active')" class="btn btn-outline-secondary" :class="{ active: value === 'active' }">Active</button>
    <button @click="onFilterChange('completed')" class="btn btn-outline-secondary" :class="{ active: value === 'completed' }">Completed</button>
    <button
      @click="onRemoveCompletedClick"
      class="btn btn-outline-danger"
      :disabled="disable">
      Clear completed
    </button>
  </section>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    onFilterChange(value) {
      this.$emit('change', value)
    },
    onRemoveCompletedClick() {
      this.$emit('remove-all')
    }
  }
}
</script>
