<template>
  <q-header class="secondary-header" >
    <div class="back-button" @click.stop="handleBackButton">
      <q-icon name="arrow_back_ios" class="back-icon"></q-icon>
      <span class="back-label">Back</span>
    </div>
  </q-header>
</template>


<script>
import utils from '../services/utils.js'

export default {
  methods: {
    handleBackButton() {
      if (utils.hasHistory()) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.secondary-header {
  color: var(--rocf-text-color);
  padding: var(--rocf-page-padding);
  background: var(--rocf-secondary);
  padding-top: 46px;
}
.back-icon {
  font-size: 22px;
}
.back-label {
  font-size: 18px;
  text-transform: uppercase;
  vertical-align: middle;
  font-weight: 200;

}
</style>