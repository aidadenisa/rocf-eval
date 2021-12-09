<template>
  <q-page class="flex column justify-between">
    <subpage-heading :subtitle="'New ROCF Evaluation'" :title="'Move the threshold to better extract the drawing'"></subpage-heading>
    <!-- {{info}} {{threshold}} {{loading}} -->
    
    <div class="canvas-container">
      <canvas id="overlay" ref="canvas"></canvas>
    </div>
    
    <q-slider
      v-model="threshold"
      :min="minThreshold"
      :max="maxThreshold"
      :step="1"
      label
      label-always
      color="primary"
    ></q-slider>
    
    <div class="take-picture-btn">
      <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click="analyseImage">Analyse the drawing</rocf-button>
    </div>

    <!-- <q-btn @click.prevent="updateThresholdValue">Update threshold value</q-btn>  -->
    <!-- <q-btn @click.prevent="analyseImage">Analyse image </q-btn> -->

    <!-- <q-btn @click.prevent="setupCanvas">Setup canvas</q-btn>  -->
    <!-- <canvas id="canvasOutput" width="512" height="512"></canvas> -->
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
      cameraOptionsBarHeight: 120,
      imageSrc: '',
      aspectRatio: 1,
      cropper: {},
      preview: '', 
      showPoints: false,
      zoom: 1,
      canvas: {},
      baseImage: {},
      currentPointInOrigin: {},
      moveStartingPoint: {},
      dragging: false,
      context: {},
      distance: 0,
      dimensions: {
          width: 0,
          height: 0
      },
      radius: 20,
      points: [],
      result: '',
      threshold: 256/2,
      minThreshold: 0,
      maxThreshold: 256,
      loading: true,
    }
  },
  components: {
    SubpageHeading,
    RocfButton
  },
  async beforeMount() {
    this.imageSrc = this.$store.state.image;
    await this.waitForOpenCVToBeLoaded();
  },
  mounted() {
    this.setupCanvas();
  },
  methods: {
    setupCanvas() {
      this.canvas = document.getElementById('overlay'),
      this.context = this.canvas.getContext('2d');
      this.context.imageSmoothingEnabled = false;

      this.baseImage = new Image();
      this.baseImage.src = this.imageSrc;
      

      // this.canvas.width = window.screen.width * window.devicePixelRatio;
      // this.canvas.height = window.screen.height * window.devicePixelRatio;

      this.baseImage.onload = () => {
          this.info = [this.baseImage.naturalWidth , this.baseImage.naturalHeight]

          this.canvas.width = this.baseImage.naturalWidth;
          this.canvas.height = this.baseImage.naturalHeight;
          this.drawImage();
          this.updateThresholdValue();
      }
    },
    
    drawImage() {
      const imageAspectRatio = this.baseImage.naturalHeight / this.baseImage.naturalWidth;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.baseImage, 0, 0, this.canvas.width, this.canvas.width * imageAspectRatio);

      this.info = (this.canvas)

    },
    updateThresholdValue() {
      
      let imageMatrix = imageProcess.getImageAsMatrix(this.baseImage);
      let hist = imageProcess.getHistogram(imageMatrix);
      let threshold = imageProcess.getMaxDeviationThreshold(hist);
      let newImage = imageProcess.getThresholdedImage(imageMatrix, threshold);

      this.threshold = threshold;
      this.minThreshold = threshold - 20;
      this.maxThreshold = threshold + 20;

      imageProcess.updateOpenCVImageInCanvas('overlay', newImage);

      let imgtest = this.$refs.canvas.toDataURL("image/png");
      imageMatrix.delete();
      newImage.delete();
    },
    thresholdChanged() {

      let imageMatrix = imageProcess.getImageAsMatrix(this.baseImage);
      let newImage = imageProcess.getThresholdedImage(imageMatrix, parseFloat(this.threshold));

      imageProcess.updateOpenCVImageInCanvas('overlay', newImage);
      imageMatrix.delete();
      newImage.delete();    
    },
    async waitForOpenCVToBeLoaded() {
      await imageProcess.isOpenCVLoaded()
        .catch( () => {
          this.loading = true;
          console.log("CANNOT LOAD OPEN CV")
        });
      this.loading = false;
    },
    async analyseImage() {
      let data = {};
      const index = this.imageSrc.indexOf('data:image/png;base64,');
      data.imageb64 = ( index > -1) 
                      ? this.imageSrc.slice(('data:image/png;base64,').length)
                      : this.imageSrc;
      // data.threshold = this.threshold;
      data.points = this.$store.state.points || [];
      data.patientCode = this.$store.state.patientCode.toUpperCase() || '';
      data.date = new Date();
      let result = await api.put('/prediction', data);
      // alert(result)
      this.info = result;
      localStorage.setItem('evaluationInProgressId', result._id);
      this.$router.push('/');
    }
  },
  watch: {
    threshold(value) {
      this.thresholdChanged()
    }
  }
}
</script>

<style scoped>

img {
  width: 100%;
}

canvas {
    width: 100%;
}
input {
    width: 100%;
}

</style>
