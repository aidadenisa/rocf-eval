<template>
  <q-page >
      
    Please set the threshold: <br>
    {{info}} {{threshold}}
    <br/>
    <input v-model="threshold" type="range" id="threshold" name="threshold"
        min="150" max="256" @input="thresholdChanged">
    <br/>
    <label for="threshold">Threshold</label>

    <div class="canvas-container">
      <canvas id="overlay" ref="canvas"></canvas>
    </div>
    <q-btn @click.prevent="updateThresholdValue">Update threshold value</q-btn> 
    <br>
    <router-link to="/evaluate/camera">
      <q-btn>back</q-btn>
    </router-link>

    <q-btn @click.prevent="setupCanvas">Setup canvas</q-btn> 
    
    

    <canvas id="canvasOutput" width="512" height="512"></canvas>
    <!-- <img :src="result"/> -->
  </q-page>
</template>

<script>
import api from '../services/api';
import imageProcess from '../services/imgProcessing';

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
      threshold: 0
    }
  },
  mounted() {
    this.imageSrc = this.$store.state.image;
    this.setupCanvas();
    this.updateThresholdValue();
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

      imageProcess.updateOpenCVImageInCanvas('overlay', newImage);

      let imgtest = this.$refs.canvas.toDataURL("image/png");

      imageMatrix.delete();
      this.threshold = threshold;
    },
    thresholdChanged() {

      let imageMatrix = imageProcess.getImageAsMatrix(this.baseImage);
      let newImage = imageProcess.getThresholdedImage(imageMatrix, parseFloat(this.threshold));

      imageProcess.updateOpenCVImageInCanvas('overlay', newImage);
      imageMatrix.delete();    
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
