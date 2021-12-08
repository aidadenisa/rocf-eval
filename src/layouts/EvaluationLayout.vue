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
  methods: {
    updatePageSize() {
      if(!this.$refs.pageC) return;
      const pageContainer = this.$el.getElementsByClassName('q-page-container')[0];
      const pageRect = pageContainer.getBoundingClientRect();
      pageContainer.style.height = `calc( 100vh - ${pageRect.top}px`;
    }
  },
  beforeMount() {
    this.updatePageSize();
  },
  mounted() {
    this.updatePageSize();
  },
}
</script>

<style scoped>
.q-page {
  height: 100%;
}
</style>
