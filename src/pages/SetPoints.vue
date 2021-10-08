<template>
  <q-page >
      
    Please set the 5 refference points:
    <br>
    <q-btn @click="reset">Toggle points</q-btn>
    <img :src="imageSrc" ref="imagePreview" v-if="!showPoints">
    <div v-else style="position:relative">
        <img :src="imageSrc">
        <canvas id="overlay"></canvas>
    </div>
  </q-page>
</template>

<script>
import PinchZoom from 'pinch-zoom-js'

export default {
  name: 'Camera',
  data() {
    return {
      info:'', 
      cameraOptionsBarHeight: 120,
      imageSrc: '',
      paperRatio: 148.5 / 210,
      cropper: {},
      preview: '', 
      showPoints: false,
      zoom: {}
    }
  },
  mounted() {
    this.imageSrc = this.$store.state.image;
    this.zoom = new PinchZoom(this.$refs.imagePreview, {});

    this.$refs.imagePreview.addEventListener( 'touchstart', (event) => {
        console.log("touch start")
        console.log(event)
        console.log (this.zoom)
        console.log(this.$refs.imagePreview)

        // calculate the point in the zoomed image

        let naturalWidth = this.$refs.imagePreview.naturalWidth;
        let naturalHeight = this.$refs.imagePreview.naturalHeight;


        let t = { 
            x: this.zoom.offset.x + event.layerX,
            y: this.zoom.offset.y + event.layerY
        };

        let scale = window.screen.width / naturalWidth;

        let initialImage = {
            width: naturalWidth * scale,
            height: naturalHeight * scale
        }

        let ratio = {
            x: t.x / initialImage.width,
            y: t.y / initialImage.height
        }

        let finalT = {
            x: naturalWidth * ratio.x,
            y: naturalHeight * ratio.y,
        }

        console.log(finalT);

    })

  },
  methods: {
      reset() {
          this.showPoints = !this.showPoints;
          document.querySelector("div.pinch-zoom-container").style.display = "none";
          this.zoom.disable();
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

</style>
