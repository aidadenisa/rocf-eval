<template>
  <q-layout view="lHh Lpr lFf" style="min-height:initial;">
    <secondary-header></secondary-header>
    <q-page-container ref="pageC">
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script>
import SecondaryHeader from '../components/SecondaryHeader.vue'
export default {
  data() {
    return {
      results: null,
      info: '',
      rocfs: []
    };
  },
  components: {
    SecondaryHeader
  },
}
</script>

<style scoped>
.q-page {
  height: 100%;
  padding-top: var(--rocf-content-margin-y);
}
</style>
