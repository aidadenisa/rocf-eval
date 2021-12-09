<template>
  <div class="g-card">  
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.g-card {
  background-color: white;
  border-radius: var(--rocf-card-radius);
  box-shadow: var(--rocf-card-shadow);
  margin-bottom: calc(0.5 * var(--rocf-content-margin-y));
}
</style>