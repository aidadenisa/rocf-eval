<template>
  <div class="subpage-heading">
    <div class="subtitle">{{subtitle}}</div>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    subtitle: {
      type: String
    }, 
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
.subpage-heading {
  margin-bottom: var(--rocf-content-margin-y)
}
.subtitle {
  color: var(--rocf-text-color-gray);
  font-size: 18px;
}
.title {
  font-weight: 600;
  margin-top: calc(0.5 * var(--rocf-content-margin-y));
}

</style>