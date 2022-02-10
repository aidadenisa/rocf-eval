<template>
  <div class="canvas-container">
    <canvas id="roi-canvas"></canvas>
  </div>
</template>

<script>

export default {
  props: {
    zoomROI: {
      type: Array,
      default: () => {return []},
    },
    zoomImageURL: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      info:'', 
      cameraOptionsBarHeight: 120,
      imageSrc: '',
      aspectRatio: 1,
      cropper: {},
      preview: '', 
      showPoints: false,
      zoom: 2,
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
      result: ''
    }
  },
  methods: {
    setupCanvas() {
        this.canvas = document.getElementById('roi-canvas'),
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;

        this.baseImage = new Image();
        this.baseImage.src = this.zoomImageURL ;

        this.canvas.width = window.screen.width * window.devicePixelRatio;
        this.canvas.height = 0.9 * window.screen.height * window.devicePixelRatio;

        console.log("canvas dim: ", this.canvas.width, this.canvas.height)

        this.aspectRatio = this.canvas.width / this.canvas.height;

        this.currentPointInOrigin = { x: - this.canvas.width / 4, y: 0 }

        this.canvas.addEventListener('touchstart', this.touchStartHandler);
        this.canvas.addEventListener('touchmove', this.moveHandler);
        this.canvas.addEventListener('touchend', this.touchEndHandler);

        this.baseImage.onload = () => {
            this.dimensions = {
                width: this.baseImage.width * this.zoom,
                height: this.baseImage.height * this.zoom,
            }
            this.drawImage();
        }
    },
    drawImage() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y, this.dimensions.width, this.dimensions.height);

      this.drawROI();
    },
    drawROI() {
      for(let r=0; r < this.zoomROI.length; r++) {
        //initial point in ROI (there can be multiple ROIs)
        const point = {
            x: this.zoomROI[r][0][0] * this.zoom + this.currentPointInOrigin.x,
            y: this.zoomROI[r][0][1] * this.zoom + this.currentPointInOrigin.y, 
        }
        this.context.strokeStyle = '#f00';
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);
        
        for(let i=1; i<this.zoomROI[r].length; i++) {
          const nextPoint = {
            x: this.zoomROI[r][i][0] * this.zoom + this.currentPointInOrigin.x,
            y: this.zoomROI[r][i][1] * this.zoom + this.currentPointInOrigin.y, 
          }
          this.context.lineTo(nextPoint.x, nextPoint.y);
        }
        this.context.closePath();
        this.context.lineWidth = 3 * this.zoom;
        this.context.stroke();
      }  
    },
    touchStartHandler(event) {
        event.preventDefault();

        event = event.originalEvent || event;
        // console.log(event)

        if(event.touches.length == 1) {

            this.dragging = true;
            // this.settingPoint = true;
            this.zooming = false;
            console.log("drag");

            this.moveStartingPoint = {
                layerX: event.layerX,
                layerY: event.layerY,
            };
            
        } 
        // else if(event.touches.length == 2){
        //     this.zooming = true;
        //     this.dragging = false;
        //     console.log("zoom");

        //     console.log(event)

        //     this.distance = this.distanceBetween2Touches(event.touches[0], event.touches[0]);
        // }
    },
    moveHandler(event) {
        event.preventDefault();
        this.settingPoint = false;
        console.log("move");
        // event = event.originalEvent || event;

        if(event.touches.length == 1 && this.dragging) {
            this.handleDrag(event);
        };

        // if(event.touches.length == 2 && this.zooming) {
        //     this.handleZoom(event);
        // } 
        this.drawImage();        
    },
    touchEndHandler(event) {
        event.preventDefault();
        // this.zooming = false;
        this.dragging = false;
        // if(this.settingPoint) {
        //     this.setPoint(event);
        // }
        
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
  },
  mounted() {
    console.log('mounted');
    if(this.zoomImageURL) {
      this.setupCanvas();
    }
  },
  watch: {
    zoomImageURL() {
      setTimeout(()=>{
        this.setupCanvas();
      }, 500);
      
    }
  }
};

</script>

<style scoped>

img {
  width: 100%;
}

canvas {
    width: 100%;
}

</style>
