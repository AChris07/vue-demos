<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <header class="mb-3">
          <slot name="header" />
        </header>

        <main class="mb-3">
          <slot />
        </main>

        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style>
</style>
