<template>
  <q-page class="flex column justify-between">
    <subpage-heading :subtitle="subtitleTxt" :title="titleTxt"></subpage-heading>
    
    <div class="threshold-image">
      <img :src="imageSrc">
    </div>

    <div class="flex row justify-between">
      <label>{{lessDetailsTxt}}</label>
      <label>{{moreDetailsTxt}}</label>
    </div>
    <q-slider
      @change="changeImage"
      v-model="ATblockSize"
      :min="3"
      :max="69"
      :step="2"
      label
      label-always
      color="primary"
    ></q-slider>

    <div class="flex row justify-between">
      <label>{{darkerTxt}}</label>
      <label>{{lighterTxt}}</label>
    </div>
    <q-slider
      @change="changeImage"
      v-model="ATconstant"
      :min="-20"
      :max="20"
      :step="1"
      label
      label-always
      color="primary"
    ></q-slider>
    
    <div class="take-picture-btn">
      <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click="analyseImage">{{analyseTxt}}</rocf-button>
    </div>

  </q-page>
</template>

<script>
import api from '../services/api';
import imageProcess from '../services/imgProcessing';
import SubpageHeading from '../components/SubpageHeading.vue';
import RocfButton from '../components/ROCFButton.vue'

export default {
  name: 'Camera',
  data() {
    return {
      info:'', 
      imageSrc: '',
      ATblockSize: 35,
      ATconstant: 10,
    }
  },
  components: {
    SubpageHeading,
    RocfButton
  },
  async beforeMount() {
    this.imageSrc = this.$store.state.gammaImage;
    this.changeImage();
  },
  methods: {
    async getNewThresholdedImage() {
      let data = {};
      const originalGammaImage = this.$store.state.gammaImage;
      const index = originalGammaImage.indexOf('data:image/png;base64,');
      data.imageb64 = ( index > -1) 
                      ? originalGammaImage.slice(('data:image/png;base64,').length)
                      : originalGammaImage;
      data.blockSize = this.ATblockSize;
      data.constant = this.ATconstant;

      let result = await api.put("/preprocessing", data);
      const image = result.image.replaceAll("'", "").slice(1);
      return image;

    },
    async changeImage() {
      const image = await this.getNewThresholdedImage();
      this.imageSrc = `data:image/png;base64,${image}`;
    },
    async analyseImage() {
      let data = {};
      const originalImage = this.$store.state.image;
      const index = originalImage.indexOf('data:image/png;base64,');
      data.imageb64 = ( index > -1) 
                      ? originalImage.slice(('data:image/png;base64,').length)
                      : originalImage;
      data.gamma = 0.7;
      data.medium = "photo";
      data.points = this.$store.state.points || [];
      data.patientCode = this.$store.state.patientCode.toUpperCase() || '';
      data.date = new Date();
      data.adaptiveThresholdC = this.ATconstant;
      data.adaptiveThresholdBS = this.ATblockSize;

      let result = await api.put('/prediction', data);
      // alert(result)
      this.info = result;
      localStorage.setItem('evaluationInProgressId', result._id);
      this.$router.push('/');
    }
  },
  computed: {
    subtitleTxt() {
      return this.$t('threshold_subtitle');
    },
    titleTxt() {
      return this.$t('threshold_title');
    },
    lessDetailsTxt() {
      return this.$t('threshold_lessDetails');
    },
    moreDetailsTxt() {
      return this.$t('threshold_moreDetails');
    },
    darkerTxt() {
      return this.$t('threshold_darker');
    },
    lighterTxt() {
      return this.$t('threshold_lighter');
    },
    analyseTxt() {
      return this.$t('threshold_analyseBtn');
    },

  }
}
</script>

<style scoped>

.threshold-image,
.threshold-image img,
input {
    width: 100%;
}

</style>
