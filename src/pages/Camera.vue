<template>
  <q-page class="camera-page flex column justify-between">
    <subpage-heading :subtitle="subtitleTxt" :title="titleTxt"></subpage-heading>

    <div class="take-picture-btn">
      <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click="takePicture">{{takePictureTxt}}</rocf-button>
    </div>

  </q-page>
</template>

<script>
import SubpageHeading from '../components/SubpageHeading.vue';
import RocfButton from '../components/ROCFButton.vue'

import { useStore } from 'vuex'

export default {
  components: { SubpageHeading, RocfButton },
  name: 'Camera',
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120, 
      paperRatio: 148.5 / 210
    }
  },
  beforeMount() {
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
  },
  beforeUnmount() {
    CameraPreview.stopCamera();
  },
  computed: {
    titleTxt() {
      return this.$t('camera_title');
    },
    subtitleTxt() {
      return this.$t('camera_subtitle');
    },
    infoTxt() {
      return this.$t('camera_info');
    },
    takePictureTxt() {
      return this.$t('camera_takePictureBtn');
    }
  }
}
</script>
