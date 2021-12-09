<template>
  <div class="rocf-list">  
    <rocf-card v-for="(rocf, index) in rocfs" :key="index" :rocf="rocf" @click="openROCFResults(rocf)"></rocf-card>
  </div>
</template>

<script>
import RocfCard from './ROCFCard.vue'
export default {
  props: {
    rocfs: {
      type: Array
    }
  },
  components: {
    RocfCard
  },
  data() {
    return {
      results: null,
      info: ''
    };
  },
  methods: {
    openROCFResults(rocf) {
      this.$router.push('/evaluate/rocf/' + rocf._id);
    },
  },
}

</script>

<style scoped>

</style>







