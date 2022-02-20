<template>
  <q-page :class="['flex','column', {'justify-between': !focused }, {'justify-center': focused }]"> 
    <subpage-heading :subtitle="subtitleTxt" :title="titleTxt"></subpage-heading>
    <div class="input-box">
      <input v-model="code" class="code-input" @focus="setFocusedMode" @blur="unsetFocusedMode">
    </div>
    <router-link to="/evaluate/camera">
        <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click.stop="savePatientCode">{{scanBtnTxt}}</rocf-button>
    </router-link>
  </q-page>
</template>

<script>
import SubpageHeading from '../components/SubpageHeading.vue';
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
    RocfButton,
    SubpageHeading
  },
  methods: {
    savePatientCode() {
      this.$store.dispatch('fetchPatientCode', this.code.toUpperCase());
    },
    setFocusedMode() {
      this.focused = true;
    },
    unsetFocusedMode() {
      this.focused = false;
    },
  },
  computed: {
    titleTxt() {
      return this.$t('patientCode_title');
    },
    subtitleTxt() {
      return this.$t('patientCode_subtitle');
    },
    scanBtnTxt() {
      return this.$t('patientCode_scanButton');
    },
  }
}
</script>

<style scoped>
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

.q-page:not(.justify-between) .code-input {
  margin: 32px 0;
}
</style>