<template>
  <q-page class="flex column justify-between">
      
    <subpage-heading :title="titleTxt"></subpage-heading>

    
    <div class="points-button-bar flex row justify-end">
        <div class="example-points col-4">
            <img src="../assets/img/example-points.png">
        </div>
        <rocf-button variant="secondary" class="reset-points-btn col-4" @click="resetPoints" :block="false">{{resetTxt}}</rocf-button>
        <rocf-button variant="accent" class="col-4" :icon="'undo'" iconPosition="left" @click="undoPoint" :block="false">{{undoTxt}}</rocf-button>
    </div>
    <div class="canvas-container">
        <canvas id="overlay"></canvas>
    </div>

    <div class="save-points-btn">
      <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click="savePoints">{{extractTxt}}</rocf-button>
    </div>

  </q-page>
</template>

<script>
import api from '../services/api';
import SubpageHeading from '../components/SubpageHeading.vue';
import RocfButton from '../components/ROCFButton.vue';

export default {
  name: 'Camera',
  components: {
    SubpageHeading,
    RocfButton
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
      result: ''
    }
  },
  beforeMount() {
    this.imageSrc = this.$store.state.image;
  },
  mounted() {
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
        this.canvas.height = 0.6 * window.screen.height * window.devicePixelRatio;

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
            alert(this.manyPointsTxt);
            return;
        }

        //find the scale between the actual length of the canvas and the visible length of the canvas
        let scale = this.canvas.width / this.canvas.clientWidth;
        
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
    savePoints() {
        if(this.points.length !== 5) {
            alert(`${this.fewPoints1Txt} ${this.points.length} ${this.fewPoints2Txt}`);
            return;
        }
        this.info="I call this"
        this.getHomography();
    },
    async getHomography() {
        //send the image for preprocessing

        this.info="this got called"
        let data = {};
        data.points = [];
        for(let i=0; i<this.points.length; i++) {
            data.points.push([this.points[i].x, this.points[i].y]);
        }

        const index = this.imageSrc.indexOf('data:image/png;base64,');
        data.imageb64 = ( index > -1) 
                        ? this.imageSrc.slice(('data:image/png;base64,').length)
                        : this.imageSrc;
        data.gamma = 0.7;
        
        let response = await api.post('/preprocessing', data )
        const image = response.image.replaceAll("'", "").slice(1);
        this.result = `data:image/png;base64,${image}`;

        this.$store.dispatch('fetchPoints', data.points);
        this.$store.dispatch('fetchGammaImage', this.result);
        this.$router.push('/evaluate/threshold');
    },
    undoPoint() {
        this.points.pop();
        this.drawImage();
    }
  },
  computed: {
    titleTxt() {
        return this.$t('setPoints_title');
    },
    resetTxt() {
        return this.$t('setPoints_reset');
    },
    undoTxt() {
        return this.$t('setPoints_undo');
    },
    extractTxt() {
        return this.$t('setPoints_extract');
    },
    fewPoints1Txt() {
        return this.$t('setPoints_fewPoints1');
    },
    fewPoints2Txt() {
        return this.$t('setPoints_fewPoints2');
    },
    manyPointsTxt() {
        return this.$t('setPoints_manyPoints');
    },
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
.points-button-bar .rocf-button {
    margin-left: 8px; 
    margin-bottom: 4px;
    padding: 6px 12px;
    font-size: 16px;
}
.points-button-bar {
    flex-wrap: nowrap;
    align-items: center;
}
/* .example-points {
    max-width: 
} */
</style>
