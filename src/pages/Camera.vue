<template>
  <q-page class="flex">
    Please take a photo of the patient's drawing, similar to the example below: 
    <img v-if="imageSrc" :src="imageSrc" height="400" >
    {{info}}

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

export default {
  name: 'Camera',
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120
    }
  },
  mounted() {
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

    CameraPreview.getSupportedPictureSizes((dimensions) => {
      // note that the portrait version, width and height swapped, of these dimensions are also supported
      this.info = dimensions
      // dimensions.forEach((dimension) => {
      //   this.info = dimension.width + 'x' + dimension.height + '\n';
      // });
    });

    CameraPreview.startCamera(options);
    CameraPreview.show();
  },

  methods: {
    hide() {
       CameraPreview.hide();
    },
    takePicture() {
      //CameraPreview.takePicture(options, successCallback, [errorCallback])
      // CameraPreview.takePicture({
      //   quality: 95,
      // },(base64PictureData) => {
      //   this.imageSrc = `data:image/jpeg;base64,${base64PictureData}`
      //   localStorage.setItem('imageSrc', this.imageSrc);
      // });

      CameraPreview.takeSnapshot({
        height: 0.5 * window.screen.height,
        quality: 95
      },
      (base64PictureData) => {
        localStorage.removeItem('imageSrc');
        this.imageSrc = `data:image/jpeg;base64,${base64PictureData}`
        localStorage.setItem('imageSrc', this.imageSrc);
      });

      CameraPreview.hide();
    }
  }
}
</script>
