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
      zoom: {},
      canvas: {},
      baseImage: {},
      currentPointInOrigin: {},
      moveStartingPoint: {},
      dragging: false,
      context: {},
      distance: 0
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
        this.baseImage.src = this.imageSrc ;

        this.canvas.width = window.screen.width * window.devicePixelRatio;
        this.canvas.height = 0.7 * window.screen.height * window.devicePixelRatio;

        console.log("canvas dim: ", this.canvas.width, this.canvas.height)

        this.currentPointInOrigin = { x: - this.canvas.width / 4, y: 0 }

        this.canvas.addEventListener('touchstart', this.touchStartHandler);
        this.canvas.addEventListener('touchmove', this.moveHandler);
        this.canvas.addEventListener('touchend', this.touchEndHandler);

        this.baseImage.onload = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y, this.baseImage.width, this.baseImage.height);
        }
    },
    reset() {
        this.showPoints = !this.showPoints;
        document.querySelector("div.pinch-zoom-container").style.display = "none";
        this.zoom.disable();
    },
    
    touchStartHandler(event) {
        event.preventDefault();

        event = event.originalEvent || event;
        // console.log(event)


        if(event.touches.length == 1) {

            this.dragging = true;
            this.zooming = false;
            console.log("drag");

            this.moveStartingPoint = {
                layerX: event.layerX,
                layerY: event.layerY,
            };
            

        } else if(event.touches.length == 2){
            this.zooming = true;
            this.dragging = false;
            console.log("zoom");

            console.log(event)

            this.distance = this.distanceBetween2Touches(event.touches[0], event.touches[0]);
        }


        console.log(1);

        let scale = this.canvas.width / this.baseImage.width;

        console.log(scale)

        let ratio = this.canvas.clientWidth / this.canvas.width;

    },
    moveHandler(event) {
        event.preventDefault();
        console.log("move");
        // event = event.originalEvent || event;

        if(event.touches.length == 1 && this.dragging) {
            this.handleDrag(event);
        };

        if(event.touches.length == 2 && this.zooming) {
            this.handleZoom(event);
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y);  
    },
    touchEndHandler(event) {
        event.preventDefault();
        this.zooming = false;
        this.dragging = false;
    },
    handleDrag(event) {
        //update current position
        this.currentPointInOrigin.x =  this.currentPointInOrigin.x - (this.moveStartingPoint.layerX - event.layerX) ;
        this.currentPointInOrigin.y =  this.currentPointInOrigin.y - (this.moveStartingPoint.layerY - event.layerY) ;


        //if current position if outside of bounds, set it to the bounds
        this.currentPointInOrigin.x = this.currentPointInOrigin.x > 0 ? 0 : this.currentPointInOrigin.x;
        this.currentPointInOrigin.x = (- this.currentPointInOrigin.x) + this.canvas.width > this.baseImage.width ? - (this.baseImage.width - this.canvas.width) : this.currentPointInOrigin.x;

        this.currentPointInOrigin.y = this.currentPointInOrigin.y > 0 ? 0 : this.currentPointInOrigin.y;
        this.currentPointInOrigin.y = (- this.currentPointInOrigin.y) +  this.canvas.height > this.baseImage.height  ?  - ( this.baseImage.height - this.canvas.height) : this.currentPointInOrigin.y;
        this.info = [(- this.currentPointInOrigin.x), (- this.currentPointInOrigin.y) ] ;

        this.moveStartingPoint = {
            layerX: event.layerX,
            layerY: event.layerY,
        };

    },
    handleZoom(event) {
        let newDistance = this.distanceBetween2Touches(event.touches[0],event.touches[1]);

        if(newDistance > this.distance) {
            //zoom out
            console.log("zoom out")
        } else {
            //zoom in
            console.log("zoom in")
        }

        this.distance = newDistance;
    },
    distanceBetween2Touches(a,b) {
        return Math.sqrt(Math.pow((a.clientX - b.clientX), 2) + Math.pow((a.clientY - b.clientY), 2))
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
