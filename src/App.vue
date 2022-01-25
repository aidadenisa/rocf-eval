<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import jwt_decode from "jwt-decode";

export default defineComponent({
  name: 'App',
  beforeMount() {
    this.getLoggedInUserInfo();
  },
  methods: {
    getLoggedInUserInfo() {
      const token = localStorage.getItem('token');

      if(token) {
        const userInfo = jwt_decode(token);
        this.$store.dispatch('fetchNewUserInfo', userInfo);
      }
    }
  }
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

