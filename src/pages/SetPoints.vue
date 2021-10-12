<template>
  <q-page >
      
    Please set the 5 refference points:
    {{info}}
    <canvas id="overlay"></canvas>
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

    var canvas = document.getElementById('overlay'),
    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    let base_image = new Image();
    base_image.src = this.imageSrc ;

    canvas.width = window.screen.width * window.devicePixelRatio;
    // canvas.height = parseInt(window.screen.width * this.paperRatio) * window.devicePixelRatio;
    canvas.height = 0.7 * window.screen.height * window.devicePixelRatio;

    console.log("canvas dim: ", canvas.width, canvas.height)
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentPointInOrigin = { x: - canvas.width / 4, y: 0 }

    // console.log(canvas.clientWidth, canvas.clientHeight)


    canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();


        event = event.originalEvent || event;


        console.log(event)

        let moveStartingPoint = {
            layerX: event.layerX,
            layerY: event.layerY,
        };
        console.log(1);

        let scale = canvas.width / base_image.width;

        console.log(scale)

        let ratio = canvas.clientWidth / canvas.width;

    
        const moveHandler = (event) => {
            event.preventDefault();
            console.log("move");
            // event = event.originalEvent || event;

            //update current position
            currentPointInOrigin.x =  currentPointInOrigin.x - (moveStartingPoint.layerX - event.layerX) ;
            currentPointInOrigin.y =  currentPointInOrigin.y - (moveStartingPoint.layerY - event.layerY) ;


            //if current position if outside of bounds, set it to the bounds
            currentPointInOrigin.x = currentPointInOrigin.x > 0 ? 0 : currentPointInOrigin.x;
            currentPointInOrigin.x = (- currentPointInOrigin.x) + canvas.width > base_image.width ? - (base_image.width - canvas.width) : currentPointInOrigin.x;

            currentPointInOrigin.y = currentPointInOrigin.y > 0 ? 0 : currentPointInOrigin.y;
            currentPointInOrigin.y = (- currentPointInOrigin.y) +  canvas.height > base_image.height  ?  - ( base_image.height - canvas.height) : currentPointInOrigin.y;
            this.info = [(- currentPointInOrigin.x), (- currentPointInOrigin.y) ] ;

            moveStartingPoint = {
                layerX: event.layerX,
                layerY: event.layerY,
            };


            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(base_image, currentPointInOrigin.x, currentPointInOrigin.y);
    
            
        };

        const stopHandler = (event) => {
            event.preventDefault();
            canvas.removeEventListener('touchmove', moveHandler);
            canvas.removeEventListener('touchend', stopHandler);
        }

        canvas.addEventListener('touchmove', moveHandler);
        canvas.addEventListener('touchend', stopHandler);

    });

    base_image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(base_image, currentPointInOrigin.x, currentPointInOrigin.y, base_image.width, base_image.height);
    }
    
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
}

</style>
