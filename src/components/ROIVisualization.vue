<template>
  <div class="roi-canvas">
    <canvas></canvas>
  </div>
</template>


<script>

export default {
  data() {
    return {
      image_original: '../assets/img/ROCF_original.png',
      canvas: {},
      context: {},
      baseImage: null,
      ratio: 1
    };
  },
  props: {
    roi: {
      type: Array,
      default: () => [[100, 50], [500, 50], [500, 300], [100, 300]]
    },
    homographyURL: {
      type: String,
      default: '/test/RC002.png'
    }
  },
  mounted() {
    this.setupCanvas();
  },
  methods: {
    setupCanvas() {
      this.canvas = this.$el.querySelector('.roi-canvas canvas');
      this.context = this.canvas.getContext('2d');
      this.context.imageSmoothingEnabled = false;

      this.baseImage = new Image();
      this.baseImage.onload = () => {
            this.drawImage();
      }
      this.baseImage.src = this.homographyURL;

      this.canvas.width = window.screen.width * window.devicePixelRatio;
      this.canvas.height = 400;

      this.ratio = this.canvas.width / this.baseImage.width
      
    },
    drawImage() {
      
      this.canvas.height = this.baseImage.height * this.ratio
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.baseImage, 0, 0, this.baseImage.width * this.ratio, this.baseImage.height * this.ratio);

      this.context.strokeStyle = '#f00';
      this.context.beginPath();
      this.context.moveTo(this.roi[0][0], this.roi[0][1]);
      this.context.lineTo(this.roi[1][0], this.roi[1][1]);
      this.context.lineTo(this.roi[2][0], this.roi[2][1]);
      this.context.lineTo(this.roi[3][0], this.roi[3][1]);
      this.context.closePath();
      this.context.lineWidth = 3;
      this.context.stroke();
    }
  }
}

</script>

<style scoped>
canvas {
  width:100%;
}
</style>
