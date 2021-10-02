<template>
  <q-page class="flex">
    Please take a photo of the patient's drawing, similar to the example below: 
     {{info}}
    <img v-if="imageSrc" :src="imageSrc" height="400" >
       

    <div style="position:absolute; bottom:0">
      <q-btn v-if="!imageSrc" @click="takePicture()">Take picture</q-btn>
      <router-link to="set-points" v-if="imageSrc">
        <q-btn> Use Picture </q-btn>
      </router-link>
      <q-btn @click="hide()">hide cam</q-btn>
    </div>
    



  </q-page>
</template>

<script>

import { useStore } from 'vuex'

export default {
  name: 'Camera',
  setup() {
    const $store = useStore();

    return {
      $store
    }
  },
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120, 
      paperRatio: 148.5 / 210,
      options: {
        width: window.screen.width ,
        height: 0.5 * window.screen.height,
      }
    }
  },
  mounted() {
    console.log("lol");
    console.log(navigator)

    let options = {
      x: 0,
      y: (0.5 * window.screen.height - this.cameraOptionsBarHeight),
      width: window.screen.width ,
      height: parseInt(window.screen.width * this.paperRatio),
      camera: CameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false,
      storeToFile: false,
      disableExifHeaderStripping: false
    };
    CameraPreview.setPreviewSize({width: window.screen.width, height: parseInt(window.screen.width * this.paperRatio)});

    

    CameraPreview.startCamera(options);
    CameraPreview.show();
  },

  methods: {
    hide() {
       CameraPreview.hide();
    },
    takePicture() {
      // // CameraPreview.takePicture(options, successCallback, [errorCallback])
      CameraPreview.getSupportedPictureSizes((dimensions) => {
        // note that the portrait version, width and height swapped, of these dimensions are also supported
        this.info = dimensions
        // dimensions.forEach((dimension) => {
        //   this.info = dimension.width + 'x' + dimension.height + '\n';
        // });
        console.log("dimensions: ", dimensions)
      });
      
      CameraPreview.takePicture({
        quality: 100,
        width: 2016,
        height: 1512
      },

      // CameraPreview.takeSnapshot({
      //   quality: 95,
      //   // width: window.screen.width * 2,
      //   // height: parseInt(window.screen.width * this.paperRatio) * 2
      // },
      (base64PictureData) => {
        this.imageSrc = `data:image/jpeg;base64,${base64PictureData}`
        this.$store.dispatch('fetchImage', this.imageSrc);

        this.getImageDimensions(this.imageSrc);
      });

      CameraPreview.hide();

     
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
