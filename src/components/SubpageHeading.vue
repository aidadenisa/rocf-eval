<template>
  <div class="subpage-heading" @click="openInfoDialog">
    <div class="subtitle">{{subtitle}}</div>
    <h2 class="title">{{title}} 
      <span v-if="info" class="info-icon"><q-icon name="info"></q-icon></span>
    </h2>
  </div>
  <q-dialog v-model="showInfoDialog" persistent>
      <q-card>
        <q-bar>
          <div>{{titleTxt}}</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div v-html="info"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  props: {
    subtitle: {
      type: String
    }, 
    title: {
      type: String
    },
    info: {
      type: String
    }
  },
  data() {
    return {
      showInfoDialog: false
    }
  },
  methods: {
    openInfoDialog() {
      if(!this.info) return;

      this.showInfoDialog = true;
    }
  },
  computed: {
    titleTxt() {
      return this.$t('subpageHeading_dialogTitle');
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

.q-dialog{
  z-index: 11111111;
}
</style>