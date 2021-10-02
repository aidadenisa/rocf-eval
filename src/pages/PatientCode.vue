<template>
  <q-page class="flex flex-center">
    Please enter the code of the patient:
    <q-input v-model="code"></q-input>
    <router-link to="/evaluate/camera">
        <q-btn color="primary">Take photo of ROCF ></q-btn>
    </router-link>
  </q-page>
</template>

<script>

export default {
  name: 'Camera',
  data() {
      return {
          code: ''
      }
  },
  methods: {
    clickk() {
      console.log("lol");
    }
  }
}
</script>
