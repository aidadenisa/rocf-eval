<template>
  <q-page >
    Please set the points on the image as in the example below: 

    <div ref="editor" class="image-editor">
      <img ref="image" v-if="imageSrc" :src="imageSrc" >
    </div>

    <q-btn @click="saveImage">Use Image </q-btn>

    {{info}}

    <img v-if="preview" :src="preview" >

    <div class="loader" v-if="loading">
      <p>loading...</p>
    </div>
    

  </q-page>
</template>

<script>

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

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
      loading: true
    }
  },
  mounted() {

    this.imageSrc = this.$store.state.image;

    this.crop(this.imageSrc).then(image => {
      this.imageSrc  = image;
      this.getImageDimensions(this.imageSrc);

      this.setupCropper();
      console.log("setupCropper")

    });

  },

  methods: {
    saveImage() {
      this.preview = this.cropper.getCroppedCanvas().toDataURL();
      this.getImageDimensions(this.preview)
    },
    setupCropper() {
      const imageRef = this.$refs.image;
      this.cropper = new Cropper(imageRef, {
        //cropper options
        autoCrop: true,
        zoomable: true,
        scalable: false,
        viewMode: 3,
        background: false,
        modal: false,
        highlight: false,
        guides: false,
        minCropBoxWidth: window.screen.width,
        minCropBoxHeight: parseInt(window.screen.width * this.paperRatio),
        ready: () => {
          this.loading = false;
          console.log("loading " + this.loading);
        }
      });
    
    },
    async crop(image) {
      // we return a Promise that gets resolved with our canvas element
      return new Promise((resolve) => {
        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
          // let's store the width and height of our image
          const inputHeight = inputImage.naturalHeight;

          // get the aspect ratio of the input image
          // const inputImageAspectRatio = inputWidth / inputHeight;

          // get half of the height
          const outputHeight = inputHeight / 2;

          // calculate the position to draw the image at
          const outputX = 0.0;
          const outputY = - outputHeight /2 ;

          // create a canvas that will present the output image
          const outputImage = document.createElement("canvas");

          // set it to the same size as the image
          outputImage.width = inputImage.naturalWidth;
          outputImage.height = outputHeight;

          // draw our image at position 0, 0 on the canvas
          const ctx = outputImage.getContext("2d");
          ctx.drawImage(inputImage, outputX, outputY);
          resolve(outputImage.toDataURL());
        };

        // start loading our image
        inputImage.src = image;
      });
    },
    getImageDimensions(imageSrc) {
      var i = new Image(); 

      i.onload = () => {
        this.info = "second dimensions: "+ i.width+", "+i.height ;
      };

      i.src = imageSrc; 
    }
  }
}
</script>

<style scoped>
.image-editor img {
  width: 100%;
}

.image-editor {
  width: 100%;
}

.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  width:100%
}
.loader p{ 
  text-align: center;
  vertical-align: middle;
  margin-top: 100px;
  width: 100%;
}
</style>
