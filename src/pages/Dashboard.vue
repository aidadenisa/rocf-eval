<template>
  <q-page class="flex flex-center">  
    
    <img v-if="imageSrc" :src="imageSrc">

    <div style="position:absolute; bottom:0">
      <q-btn color="primary" @click="clickk()">Scan new ROCF</q-btn>
      <q-btn @click="takePicture()">Take picture</q-btn>
      {{info}}
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120
    }
  },

  methods: {
    clickk() {
      
      console.log("lol");
      console.log(navigator)

      // CameraPreview.setPreviewSize({width: 0.5 * window.screen.width, height: 0.5 * window.screen.height});
      let options = {
        x: 0,
        y: (0.5 * window.screen.height - this.cameraOptionsBarHeight),
        width: window.screen.width ,
        height: 0.5 * window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: false,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false
      };

      CameraPreview.startCamera(options);
      CameraPreview.show();

    },
    takePicture() {
      //CameraPreview.takePicture(options, successCallback, [errorCallback])
      CameraPreview.takePicture((base64PictureData) => {
        this.imageSrc = `data:image/jpeg;base64,${base64PictureData}`
      });
    }
  }
}
</script>
