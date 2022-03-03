<template>
  <div class="roi-canvas">
    <img :src="homographyURL" ref="drawing" class="drawing-image">
    <canvas ref="roi" @click="$emit('click-on-canvas', roi)"></canvas>
  </div>
</template>


<script>
import api from '../services/api.js';

export default {
  data() {
    return {
      image_original: '../assets/img/ROCF_original.png',
      canvas: {},
      context: {},
      baseImage: null,
      ratio: 1,
    };
  },
  props: {
    roi: {
      type: Array,
      // default: () => [[[100, 50], [500, 50], [500, 300], [100, 300]]]
    },
    homographyURL: {
      type: String,
    }
  },
  methods: {
    setupCanvas() {
      this.canvas = this.$el.querySelector('.roi-canvas canvas');
      this.context = this.canvas.getContext('2d');
      this.context.imageSmoothingEnabled = false;

      this.baseImage = new Image();
      this.baseImage.src = this.homographyURL;

      this.canvas.width =this.$el.querySelector('img.drawing-image').width * window.devicePixelRatio;

      this.canvas.height = this.$el.querySelector('img.drawing-image').height * window.devicePixelRatio;

      this.ratio = this.canvas.width / this.baseImage.width;

      this.drawImage();      
      
    },
    drawImage() {

      // this.canvas.height = this.baseImage.height ? this.baseImage.height * this.ratio : 400;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for(let r=0; r < this.roi.length; r++) {
        this.context.strokeStyle = '#f00';
        this.context.beginPath();
        this.context.moveTo(this.roi[r][0][0] * this.ratio, this.roi[r][0][1] * this.ratio);
        for(let i=1; i<this.roi[r].length; i++) {
          this.context.lineTo(this.roi[r][i][0] * this.ratio, this.roi[r][i][1] * this.ratio);
        }
        this.context.closePath();
        this.context.lineWidth = 3;
        this.context.stroke();
      }  
      
    },
  },
  beforeMount(){
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
    if(this.homographyURL) {
      this.setupCanvas();
    }
  },
  watch: {
    homographyURL() {
      setTimeout(()=>{
        this.setupCanvas();
      }, 500)
      
    },
    roi() {
      this.drawImage();
    }
  }
}

</script>

<style scoped>
.roi-canvas {
  position: relative;
}
.roi-canvas canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
canvas, 
img {
  width:100%;
}
</style>
