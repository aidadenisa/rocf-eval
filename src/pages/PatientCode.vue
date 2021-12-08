<template>
  <q-page :class="['flex','column', {'justify-between': !focused }, {'justify-center': focused }]"> 
    <div class="heading">
      <div class="subtitle">New ROCF Evaluation</div>
      <h2 class="title"> Please provide the patient’s code </h2>
    </div>
    <div class="input-box">
      <input v-model="code" class="code-input" @focus="setFocusedMode" @blur="unsetFocusedMode">
    </div>
    <router-link to="/evaluate/camera">
        <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click.stop="savePatientCode">Scan Image</rocf-button>
    </router-link>
  </q-page>
</template>

<script>
import RocfButton from '../components/ROCFButton.vue'
export default {
  name: 'Camera',
  data() {
      return {
          code: '',
          focused: false,
      }
  },
  components: {
    RocfButton
  },
  methods: {
    savePatientCode() {
      this.$store.dispatch('fetchPatientCode', this.code);
    },
    setFocusedMode() {
      this.focused = true;
    },
    unsetFocusedMode() {
      this.focused = false;
    },
  },
}
</script>

<style scoped>
.heading {
  margin-top: calc(2 * var(--rocf-content-margin-x));
}
.code-input {
  font-size: 24px;
  color: var(--rocf-primary);
  padding: 22px 16px;
  text-align: center;
  border:0;
  border-radius: var(--rocf-card-radius);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  width: 100%;
}
.input-box {
  box-shadow: var(--rocf-card-shadow);
}

.subtitle {
  color: var(--rocf-text-color-gray);
  font-size: 18px;
}
.title {
  font-weight: 600;
  margin-top: calc(0.5 * var(--rocf-content-margin-x));
}

.q-page:not(.justify-between) .code-input {
  margin: 32px 0;
}
</style>