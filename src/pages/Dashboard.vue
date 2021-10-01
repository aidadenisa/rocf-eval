<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" @click="clickk()">Scan new ROCF</q-btn>
    <img v-if="imageSrc" :src="imageSrc">
    <q-btn @click="takePicture()">Take picture</q-btn>
    {{imageSrc}}
    {{info}}
  </q-page>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      imageSrc: null,
      info:''
    }
  },

  methods: {
    clickk() {
      
      console.log("lol");
      console.log(navigator)
      // navigator.camera.getPicture(
      //   data => { // on success
      //     this.imageSrc = `data:image/jpeg;base64,${data}`
      //   },
      //   () => { // on fail
      //     this.$q.notify('Could not access device camera.')
      //   },
      //   {
      //     quality: 50,
      //     destinationType: navigator.camera.DestinationType.DATA_URL,
      //     encodingType: navigator.camera.EncodingType.JPEG,
      //     MEDIATYPE: navigator.camera.MediaType.PICTURE,
      //     sourceType: navigator.camera.PictureSourceType.CAMERA,
      //     mediaType: navigator.camera.MediaType.PICTURE,
      //     cameraDirection: navigator.camera.Direction.BACK,
      //     targetWidth: 300,
      //     targetHeight: 400
      //   }
      // )

      CameraPreview.setPreviewSize({width: 0.5 * window.screen.width, height: 0.5 * window.screen.height});

      let options = {
        x: 0,
        y: 0,
        width: 0.5 * window.screen.width ,
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
