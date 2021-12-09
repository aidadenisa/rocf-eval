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
  --constant-safe: constant(safe-area-inset-top);
  --env-safe: env(safe-area-inset-top);
  background-color: var(--rocf-secondary);
  padding: 0 var(--rocf-page-padding);
  font-family: 'Noto';
  color: var(--rocf-text-color);
}

a {
  text-decoration: none;
}

h3 {
  font-size: 20px;
}

h2 {
  font-size: 24px;
}

h2, h3 {
  margin: 0;
  line-height: 2rem;
}

#q-app {
  margin-top: 1px;
}
</style>

