<template>
  <q-page >
      
    Please set the threshold: <br>
    {{info}}
    <div class="canvas-container">
        <canvas id="overlay"></canvas>
    </div>
    <q-btn @click.prevent="updateThresholdValue">Update threshold value</q-btn> 
    <br>
    <q-btn @click.prevent="">Save Points</q-btn>

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
  },
  methods: {
    setupCanvas() {
        this.canvas = document.getElementById('overlay'),
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;

        this.baseImage = new Image();
        this.baseImage.src = this.imageSrc;
        

        this.canvas.width = window.screen.width * window.devicePixelRatio;
        this.canvas.height = window.screen.height * window.devicePixelRatio;

        this.baseImage.onload = () => {
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

        let hist = imageProcess.getHistogram(this.baseImage);
        let threshold = imageProcess.getMaxDeviationThreshold(hist);
        this.info = threshold
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

</style>
