<template>
  <button :class="['rocf-button', `variant-${variant}`, {'display-block': block }, `size-${size}` ]">
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
    },
    variant: {
      type: String,
      default: 'primary'
    },
    block: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'large',
    },
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

.rocf-button.variant-secondary {
  background-color: #F2F2F2;
  color: #4c4c4c;
}

.rocf-button.size-small .q-icon {
  font-size: 20px;
}

.rocf-button:not(.display-block) .q-icon {
  position: relative;
  left: initial;
  right: initial;
}

.rocf-button.size-small {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0px;
  text-align: center;
  vertical-align: middle;
  padding: 8px;
}

</style>