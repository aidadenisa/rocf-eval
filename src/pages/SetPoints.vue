<template>
  <q-page >
    Please set the points on the image as in the example below: 
    
    <!-- <img v-if="imageSrc" :src="imageSrc" > -->
    <vue-cropper
        ref="cropper"
        :src="imageSrc"
        alt="Source Image"
        >
    </vue-cropper>

  </q-page>
</template>

<script>
import VueCropper from 'vue-cropperjs';
export default {
  name: 'Camera',
  components: { VueCropper},
  data() {
    return {
      imageSrc: null,
      info:'', 
      cameraOptionsBarHeight: 120
    }
  },
  mounted() {
    this.imageSrc = localStorage.getItem('imageSrc');
  },

  methods: {
  }
}
</script>

<style scoped>
img {
    width: 100%;

}
</style>
