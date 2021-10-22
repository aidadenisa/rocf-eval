<template>
  <q-page class="flex">
    Please take a photo of the patient's drawing, similar to the example below:        

    <div style="position:absolute; bottom:0">
      <q-btn v-if="!imageSrc" @click="takePicture()">Take picture</q-btn>
      <q-btn @click="hide()">hide cam</q-btn>
    </div>

  </q-page>
</template>

<script>

import { useStore } from 'vuex'

export default {
  name: 'Camera',
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120, 
      paperRatio: 148.5 / 210
    }
  },
  mounted() {
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
      // CameraPreview.takePicture(options, successCallback, [errorCallback])

      
      CameraPreview.takePicture({
        quality: 100,
        width: 2016,
        height: 1512
      },
      (base64PictureData) => {
        this.imageSrc = `data:image/png;base64,${base64PictureData}`
        this.$store.dispatch('fetchImage', this.imageSrc);

        this.$router.push('adjust-photo');
      });

      CameraPreview.hide();
     
    },
    getImageDimensions(imageSrc) {
      var i = new Image(); 

      i.onload = function(){
        console.log( i.width+", "+i.height );
      };

      i.src = imageSrc; 
    }
  }
}
</script>
