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
      default: '',
    },
    changeROI: {
      type: Boolean,
      default: false,
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
      result: '', 
      draggingPoints: [],
      selectedCorner: {
        min_index: null,
        min_point: null,
      },
    }
  },
  methods: {
    setupCanvas() {
        this.canvas = document.getElementById('roi-canvas'),
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;

        this.baseImage = new Image();
        this.baseImage.src = this.zoomImageURL ;

        
        this.canvas.addEventListener('touchstart', this.touchStartHandler);
        this.canvas.addEventListener('touchmove', this.moveHandler);
        this.canvas.addEventListener('touchend', this.touchEndHandler);

        this.baseImage.onload = () => {
            this.canvas.width = window.screen.width * window.devicePixelRatio;
        
            this.canvas.height = Math.min(this.baseImage.height, 0.9 * window.screen.height) * window.devicePixelRatio;

            this.currentPointInOrigin = { x: - this.canvas.width / 4, y: 0 }

            console.log("canvas dim: ", this.canvas.width, this.canvas.height)

            this.aspectRatio = this.canvas.width / this.canvas.height;
            this.dimensions = {
                width: this.baseImage.width * this.zoom,
                height: this.baseImage.height * this.zoom,
            }
            this.drawImage();
            this.drawROI();
        }
    },
    drawImage() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.baseImage, this.currentPointInOrigin.x, this.currentPointInOrigin.y, this.dimensions.width, this.dimensions.height);
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

            if (this.changeROI) {
              const cornerIdentifiers = this.getSelectedCorner(event); 
              this.selectedCorner = cornerIdentifiers;
            }
            
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
          if (this.changeROI && this.selectedCorner.min_point !== null) {
            this.dragCorner(event, this.selectedCorner);
          } else {
            this.handleDrag(event);
          }

        };

        // if(event.touches.length == 2 && this.zooming) {
        //     this.handleZoom(event);
        // } 
        this.drawImage();  
        if(this.changeROI) {
          this.drawDraggingPoints();
        } else {
          this.drawROI();
        }
           
    },
    touchEndHandler(event) {
        event.preventDefault();
        // this.zooming = false;
        this.dragging = false;
        this.selectedCorner = null;
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
    drawDraggingPoints() {

      this.drawImage();
      
      for(let r=0; r<this.draggingPoints.length; r++) {
        // initial point
        const point = {
              x: this.draggingPoints[r][0][0] * this.zoom + this.currentPointInOrigin.x,
              y: this.draggingPoints[r][0][1] * this.zoom + this.currentPointInOrigin.y, 
          }

        this.context.strokeStyle = '#f00';
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);
        
        for(let i=1; i < this.draggingPoints[r].length; i++) {
          const nextPoint = {
            x: this.draggingPoints[r][i][0] * this.zoom + this.currentPointInOrigin.x,
            y: this.draggingPoints[r][i][1] * this.zoom + this.currentPointInOrigin.y, 
          }
          this.context.lineTo(nextPoint.x, nextPoint.y);
        }
        this.context.closePath();
        this.context.lineWidth = 3 * this.zoom;
        this.context.stroke();

        for(let i=0; i < this.draggingPoints[r].length; i++) {
          
          const corner = {
            x: this.draggingPoints[r][i][0] * this.zoom + this.currentPointInOrigin.x,
            y: this.draggingPoints[r][i][1] * this.zoom + this.currentPointInOrigin.y, 
          }
          this.context.beginPath();
          this.context.arc(corner.x, corner.y, this.radius * this.zoom, 0, 2 * Math.PI);
          this.context.fillStyle = 'blue';
          this.context.fill();
        }
      }

    },
    getSelectedCorner(event) {
      event.preventDefault();

      const point = {
        x: -this.currentPointInOrigin.x / this.zoom + event.pageX, 
        y: -this.currentPointInOrigin.y / this.zoom + event.pageY,
      }

      let min_dist = 9999;
      let min_point = null;
      let min_index = null;
      for (let r=0; r<this.draggingPoints.length; r++) {
        for (let i=0; i<this.draggingPoints[r].length; i++) {
          const dist = Math.sqrt( Math.pow((point.x-this.draggingPoints[r][i][0]), 2) + Math.pow((point.y-this.draggingPoints[r][i][1]), 2) );
          if (dist < (this.radius * this.zoom + 10 * this.zoom) && dist < min_dist) {  
            min_dist = dist;
            min_point = i;
            min_index = r;
          }
        }
      }
      
      return {'min_point': min_point, 'min_index': min_index};
    },
    dragCorner(event, corner) {
      event.preventDefault();
      
      this.draggingPoints[corner.min_index][corner.min_point][0] = -this.currentPointInOrigin.x / this.zoom + event.pageX;
      this.draggingPoints[corner.min_index][corner.min_point][1] = -this.currentPointInOrigin.y / this.zoom + event.pageY;
    },
    calcPolygonArea(vertices) {
      var total = 0;

      for (var i = 0, l = vertices.length; i < l; i++) {
        var addX = vertices[i][0];
        var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
        var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
        var subY = vertices[i][1];

        total += (addX * addY * 0.5);
        total -= (subX * subY * 0.5);
      }

      return Math.abs(total);
    }
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
    },
    zoomROI() {
      this.setupCanvas();
    },
    changeROI(value) {
      if(value) {
        // setup edit mode for ROI

        let draggingPoints = []
        
        for (let r = 0; r<this.zoomROI.length; r++) {
          if (this.zoomROI[r].length == 4) {
            // set the dragging points as the 4 points
            draggingPoints.push(this.zoomROI[r]);
          } else if(this.zoomROI[r].length == 6) {
            let min_dist = 99999;
            let min_p1 = null;
            let min_p2 = null;
            let j = 0;
            for(let i=1; i<this.zoomROI[r].length-1; i++) {
              const p1 = this.zoomROI[r][j];
              const p2 = this.zoomROI[r][i];
              const dist = Math.sqrt( Math.pow((p1[0]-p2[0]), 2) + Math.pow((p1[1]-p2[1]), 2) );
              if(dist < min_dist) {
                min_dist = dist;
                min_p1 = j;
                min_p2 = i;
              }
              j += 1;
            }
            //check which area is bigger, by removing both points.

            let verticesWithoutDoubleStart = [...this.zoomROI[r]];
            verticesWithoutDoubleStart.pop();
            //area without p1:
            let verticesWithoutP1 = verticesWithoutDoubleStart.filter((element, index) => { return index != min_p1});
            const areaWithoutP1 = this.calcPolygonArea(verticesWithoutP1);

            //area without p2:
            let verticesWithoutP2 = verticesWithoutDoubleStart.filter((element, index) => { return index != min_p2});
            const areaWithoutP2 = this.calcPolygonArea(verticesWithoutP2);

            if(areaWithoutP1 > areaWithoutP2) {
              draggingPoints.push(verticesWithoutP2);
            } else {
              draggingPoints.push(verticesWithoutP1);
            }

          } else {
            // get the minimum and maximum coordinates and create a fake ROI around it
            let min_x = 99999, min_y = 99999, max_x = 0, max_y = 0;
            for(let i=0; i< this.zoomROI[r].length; i++) {
              if (this.zoomROI[r][i][0] < min_x) min_x = this.zoomROI[r][i][0];
              if (this.zoomROI[r][i][0] > max_x) max_x = this.zoomROI[r][i][0];
              if (this.zoomROI[r][i][1] < min_y) min_y = this.zoomROI[r][i][1];
              if (this.zoomROI[r][i][1] > max_y) max_y = this.zoomROI[r][i][1];
            }
            draggingPoints.push([
              [min_x, min_y],
              [max_x, min_y],
              [max_x, max_y],
              [min_x, max_y],
            ]);
          }
        } 

        this.draggingPoints = draggingPoints;

        this.drawDraggingPoints();

      } else {
        // come back to normal view

        this.$emit('roi-changed', this.draggingPoints);

        this.draggingPoints = [];
        this.selectedCorner = null;

        this.drawImage();
        this.drawROI();
      }

    },
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
