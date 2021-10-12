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
      radius: 100
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
            this.dimensions = {
                width: this.baseImage.width,
                height: this.baseImage.height
            }
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y, this.dimensions.width, this.dimensions.height);
        }
    },
    
    touchStartHandler(event) {
        event.preventDefault();

        event = event.originalEvent || event;
        // console.log(event)


        if(event.touches.length == 1) {

            this.dragging = true;
            this.settingPoint = true;
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



        let ratio = this.canvas.clientWidth / this.canvas.width;

    },
    moveHandler(event) {
        event.preventDefault();
        this.settingPoint = false;
        console.log("move");
        // event = event.originalEvent || event;

        if(event.touches.length == 1 && this.dragging) {
            this.handleDrag(event);
        };

        if(event.touches.length == 2 && this.zooming) {
            this.handleZoom(event);
        } 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            this.baseImage, 
            this.currentPointInOrigin.x, 
            this.currentPointInOrigin.y, 
            this.dimensions.width, 
            this.dimensions.height
        );         
    },
    touchEndHandler(event) {
        event.preventDefault();
        this.zooming = false;
        this.dragging = false;
        console.log(this.settingPoint)
        if(this.settingPoint) {
            this.setPoint(event);
        }
        
    },
    handleDrag(event) {
        //update current position
        this.currentPointInOrigin.x =  this.currentPointInOrigin.x - (this.moveStartingPoint.layerX - event.layerX) ;
        this.currentPointInOrigin.y =  this.currentPointInOrigin.y - (this.moveStartingPoint.layerY - event.layerY) ;


        //if current position if outside of bounds, set it to the bounds
        this.currentPointInOrigin.x = this.currentPointInOrigin.x > 0 ? 0 : this.currentPointInOrigin.x;
        this.currentPointInOrigin.x = (- this.currentPointInOrigin.x) + this.canvas.width > this.dimensions.width 
                                        ? - (this.dimensions.width - this.canvas.width) 
                                        : this.currentPointInOrigin.x;

        this.currentPointInOrigin.y = this.currentPointInOrigin.y > 0 ? 0 : this.currentPointInOrigin.y;
        this.currentPointInOrigin.y = (- this.currentPointInOrigin.y) +  this.canvas.height > this.dimensions.height 
                                        ?  - ( this.dimensions.height - this.canvas.height) 
                                        : this.currentPointInOrigin.y;
        this.info = [(- this.currentPointInOrigin.x), (- this.currentPointInOrigin.y) ] ;

        this.moveStartingPoint = {
            layerX: event.layerX,
            layerY: event.layerY,
        };

    },
    handleZoom(event) {
        let newDistance = this.distanceBetween2Touches(event.touches[0],event.touches[1]);

        const deltaZoom = 0.1

        if(newDistance > this.distance) {
            //zoom in
            console.log("zoom in")
            this.zoom += deltaZoom;
        } else {
            //zoom out
            console.log("zoom out")
            this.zoom -= deltaZoom;
        }

        if(this.zoom < 1) {
            this.zoom = 1;
        }
        if(this.zoom > 4) {
            this.zoom = 4;
        }

        this.dimensions = {
            width: this.baseImage.width * this.zoom,
            height: this.baseImage.height * this.zoom
        };

        this.distance = newDistance;
    },
    setPoint(event) {
        console.log(event);

        let scale = this.baseImage.width / this.canvas.width; 
        console.log(scale)

        //the real point I think..
        // let point = {
        //     x: ((- this.currentPointInOrigin.x + event.layerX) / this.canvas.width) * this.dimensions.width,
        //     y: ((- this.currentPointInOrigin.y + event.layerY) / this.canvas.height) * this.dimensions.height,
        // }
        let point = {
            x: event.layerX * scale,
            y: event.layerY * scale, 
        }
        
        this.context.beginPath();
        this.context.arc(point.x, point.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = 'blue';
        this.context.fill();
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
