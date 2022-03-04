<template>
  <q-page class="flex column justify-between">
    <subpage-heading :subtitle="subtitleTxt" :title="titleTxt" :info="infoTxt"></subpage-heading>
    
    <div class="threshold-image">
      <img :src="imageSrc">
      <div v-if="thresholdLoading" class="image-loading">
        <p>{{loadingThreshTxt}}</p>
      </div>
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
      :disable="thresholdLoading"
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
      :disable="thresholdLoading"
    ></q-slider>
    
    <div class="take-picture-btn">
      <rocf-button :icon="'chevron_right'" :icon-position="'right'" :disabled="loading" @click="analyseImage">{{analyseTxt}}</rocf-button>
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
      thresholdLoading: false,
      loading: false,
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
      this.thresholdLoading = true;
      let data = {};
      const originalGammaImage = this.$store.state.gammaImage;
      if(!originalGammaImage) return;
      const index = originalGammaImage.indexOf('data:image/png;base64,');
      data.imageb64 = ( index > -1) 
                      ? originalGammaImage.slice(('data:image/png;base64,').length)
                      : originalGammaImage;
      data.blockSize = this.ATblockSize;
      data.constant = this.ATconstant;
      data.points = this.$store.state.points;

      let result = null;
      result = await api.put("/preprocessing", data).catch( ()=> { 
        alert(this.errorTxt);
        this.thresholdLoading = false;
      });
      this.thresholdLoading = false;
      const image = result.image.replaceAll("'", "").slice(1);
      return image;

    },
    async changeImage() {
      const image = await this.getNewThresholdedImage();
      this.imageSrc = `data:image/png;base64,${image}`;
    },
    resetStorage() {
      this.$store.dispatch('fetchImage', '');
      this.$store.dispatch('fetchPoints', []);
      this.$store.dispatch('fetchGammaImage', '');
      this.$store.dispatch('fetchPatientCode', '');
    },
    async analyseImage() {
      this.loading = true;
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

      let result = await api.put('/prediction', data).catch(()=> {
        alert(this.errorTxt);
        this.loading = false;
      });
      this.loading = false;
      this.info = result;
      localStorage.setItem('evaluationInProgressId', result._id);
      this.resetStorage();
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
    infoTxt() {
      return this.$t('threshold_info');
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
    loadingThreshTxt() {
      return this.$t('threshold_loadingThreshold');
    },
    errorTxt() {
      return this.$t('threshold_errorTxt');
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

.threshold-image {
  position: relative;
}

.threshold-image .image-loading {
  position: absolute;
  bottom: 0;
  right: 0;
}

.threshold-image .image-loading p {
  font-size: 14px;
  transform: translateY(50%);
  color: var(--rocf-primary);
  opacity: 1;
}

</style>
