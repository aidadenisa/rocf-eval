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
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  font-family: 'Noto';
  color: var(--rocf-text-color);
  padding: 0 var(--rocf-page-padding);
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

.q-layout {
  height: calc(100vh - var(--constant-safe) - 6px);
  height: calc(100vh - var(--env-safe) - 6px);
}

</style>

