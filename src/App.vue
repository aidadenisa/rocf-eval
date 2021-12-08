<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App'
})
</script>

<style>
body {
  background-color: var(--rocf-secondary);
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  font-family: 'Noto';
  color: var(--rocf-text-color);
  padding: var(--rocf-page-padding);
}

a {
  text-decoration: none;
}

h3 {
  font-size: 20px;
}
</style>

