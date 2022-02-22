<template>
  <div class="lang" @click="switchLanguage">
    {{changeTxt}} {{otherLang.label}}
  </div>
</template>

<script>

export default {
  data() {
    return {
      languages: [
        {value: 'en-US', label: 'English'},
        {value: 'it', label: 'Italian'},
      ],
      currentLang: 'it',
      otherLang: {value: 'en', label: 'English'},
    };
  },
  methods: {
    switchLanguage() {
      if (this.languages[0].value == this.currentLang) {
        this.otherLang = this.languages[0];
        this.currentLang = this.languages[1].value;
      } else {
        this.otherLang = this.languages[1];
        this.currentLang = this.languages[0].value;
      }
      this.$i18n.locale = this.currentLang;
    }
  },
  beforeMount() {
    this.$i18n.locale = this.currentLang;
  },
  computed: {
    changeTxt() {
      return this.$t('langSwitch_change');
    }
  }
}
</script>

<style scoped>
.lang {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
}
</style>
