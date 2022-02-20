<template>
  <div class="new-rocf">  
    <img src="../assets/img/rocf-icons_new-rocf.svg">
    <p class="call-to-action">{{evaluateRocfTxt}}</p>
    <p class="info">{{infoText}}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      results: null,
      info: ''
    };
  },
  computed: {
    evaluateRocfTxt() {
      return this.$t('newRocf_evaluate');
    },
    infoText() {
      return this.$t('newRocf_takePhoto');
    },

  }
}

</script>

<style scoped>
.new-rocf {
  background-color: var(--rocf-primary);
  color: white;
  display: inline-block;
  padding: var(--rocf-card-padding);
  border-radius: var(--rocf-card-radius);
  box-shadow: var(--rocf-card-shadow);
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







