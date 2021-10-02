<template>
  <q-page >
    Please set the points on the image as in the example below: 
    <!-- {{imageSrc}} -->
    <!-- {{info}} -->
    <img v-if="imageSrc" :src="imageSrc" >
    <!-- <vue-cropper
        ref="cropper"
        :src="imageSrc"
        alt="Source Image"
        >
    </vue-cropper> -->

  </q-page>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Camera',
  data() {
    return {
      info:'', 
      cameraOptionsBarHeight: 120,
      imageSrc: ''
    }
  },
  mounted() {
    // this.crop(img).then((newImage)=> {
    //   this.imageSrc = newImage;
    // })

    this.imageSrc = this.$store.state.image;

    this.crop(this.imageSrc).then(image => {
      this.imageSrc  = image;
      console.log(this.getImageDimensions(this.imageSrc));
    })
  },

  methods: {
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

          // if it's bigger than our target aspect ratio
          // let outputWidth = inputWidth;
          // let outputHeight = inputHeight;
          // if (inputImageAspectRatio > aspectRatio) {
          //   outputWidth = inputHeight * aspectRatio;
          // } else if (inputImageAspectRatio < aspectRatio) {
          //   outputHeight = inputWidth / aspectRatio;
          // }

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

      i.onload = function(){
        alert( i.width+", "+i.height );
      };

      i.src = imageSrc; 
    }
  }
}
</script>

<style scoped>
img {
    width: 100%;

}
</style>
