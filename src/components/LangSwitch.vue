<template>
  <div class="lang" @click="switchLanguage">
      Change to {{otherLang.label}}
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
      currentLang: 'en',
      otherLang: {value: 'it', label: 'Italian'},
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
  }
}
</script>

<style scoped>
.lang {
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 600;
}
</style>
