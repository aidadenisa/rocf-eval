<template>
  <q-page >
      Please set the 5 refference points:
    <img  :src="imageSrc" ref="imagePreview">
  </q-page>
</template>

<script>
import PinchZoom from 'pinch-zoom-js'

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
    }
  },
  mounted() {
    this.imageSrc = this.$store.state.image;
    let zoom = new PinchZoom(this.$refs.imagePreview, {});
  },
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
