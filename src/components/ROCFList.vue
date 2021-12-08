<template>
  <div class="rocf-list">  
    <rocf-card v-for="(rocf, index) in rocfs" :key="index" :rocf="rocf"></rocf-card>
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
}

</script>

<style scoped>
.new-rocf {
  background-color: var(--rocf-primary);
  color: white;
  display: inline-block;
  padding: var(--rocf-card-padding);
  border-radius: var(--rocf-card-radius);
}
p {
  margin: 0;
}
.call-to-action {
  margin-top: 8px;
  font-size: 18px;
}
.info {
  color: #AAC6F4;
  font-size: 14px;
}
</style>







