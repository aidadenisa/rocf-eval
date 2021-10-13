<template>
  <q-page >
      
    Please set the 5 refference points: <br>
    {{info}}
    <div class="canvas-container">
        <canvas id="overlay"></canvas>
    </div>
    <q-btn @click="resetPoints">Reset Points</q-btn> 
    <br>
    <q-btn @click="evaluateROCF"> Evaluate ROCF</q-btn>
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
      points: []
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

        this.aspectRatio = this.canvas.width / this.canvas.height;

        this.currentPointInOrigin = { x: - this.canvas.width / 4, y: 0 }

        this.canvas.addEventListener('touchstart', this.touchStartHandler);
        this.canvas.addEventListener('touchmove', this.moveHandler);
        this.canvas.addEventListener('touchend', this.touchEndHandler);

        this.baseImage.onload = () => {
            this.dimensions = {
                width: this.baseImage.width,
                height: this.baseImage.height
            }
            this.drawImage();
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
        this.drawImage();        
    },
    touchEndHandler(event) {
        event.preventDefault();
        this.zooming = false;
        this.dragging = false;
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

        if(this.points.length >= 5) {
            alert("You should set only 5 points!");
            return;
        }

        let scale = this.baseImage.width / this.canvas.width; 
        
        let point = {
            x: event.layerX * scale,
            y: event.layerY * scale, 
        }

        this.context.beginPath();
        this.context.arc(point.x, point.y, this.radius * this.zoom, 0, 2 * Math.PI);
        this.context.fillStyle = 'blue';
        this.context.fill();

        //the real point
        let pointOnImage = {
            x: ((this.canvas.width * (event.layerX / this.canvas.clientWidth ))  + (- this.currentPointInOrigin.x )) / this.zoom,
            y: ((this.canvas.height * (event.layerY / this.canvas.clientHeight ))  + (- this.currentPointInOrigin.y )) / this.zoom,
        }

        this.info = [pointOnImage.x, pointOnImage.y]
        console.log(pointOnImage)

        this.points.push(pointOnImage);

    },
    drawImage() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y, this.dimensions.width, this.dimensions.height);

        this.drawPoints();
    },
    drawPoints() {
        if(!this.points.length) return;

        for(let i=0; i<this.points.length; i++ ) {
            let point = {
                x: this.points[i].x * this.zoom + this.currentPointInOrigin.x,
                y: this.points[i].y * this.zoom + this.currentPointInOrigin.y, 
            }
            this.context.beginPath();
            this.context.arc(point.x, point.y, this.radius * this.zoom, 0, 2 * Math.PI);
            this.context.fillStyle = 'blue';
            this.context.fill();
        }
    },
    resetPoints() {
        this.points = [];
        this.drawImage();
    },
    distanceBetween2Touches(a,b) {
        return Math.sqrt(Math.pow((a.clientX - b.clientX), 2) + Math.pow((a.clientY - b.clientY), 2))
    },
    evaluateROCF() {
        if(this.points.length !== 5) {
            alert(`There are only ${this.points.length} points set. You should set 5 points!`);
        }
        //send the image for evaluation
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
