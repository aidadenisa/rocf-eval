<template>
  <button class="rocf-button">
    <q-icon v-if="iconPosition == 'left'" :name="icon"></q-icon>
    <span><slot></slot></span>
    <q-icon v-if="iconPosition == 'right'" :name="icon"></q-icon>
  </button>
</template>

<script>

export default {
  props: {
    icon: {
      type: String
    },
    iconPosition: {
      type: String
    }
  }
}
</script>

<style scoped>
.rocf-button {
  --rocf-button-padding: 12px;
  width: 100%;
  font-size: 18px;
  background-color: var(--rocf-primary);
  color: white;
  font-weight: 600;
  padding: var(--rocf-button-padding);
  border-radius: var(--rocf-card-radius);
  margin-bottom: 20px;
  position: relative;
}
.q-icon {
  font-size: 26px;
  position: absolute;
}
.rocf-button .q-icon:first-child {
  left: var(--rocf-button-padding);
}
.rocf-button .q-icon:last-child {
  right: var(--rocf-button-padding);
}
</style>