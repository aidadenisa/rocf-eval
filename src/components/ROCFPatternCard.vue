<template>
  <div class="rocf-pattern-card">  
    <g-card class="pattern-box">
      <div class="heading flex justify-between">
        <div class="title">
          {{patternTxt}} {{indexPretty}}
        </div>
        <div :class="['label', 'label-' + revisedPattern.chosenLabel]" @click.prevent="toggleEditMode">
          <q-icon name="edit" class="edit-icon"></q-icon>
          {{revisedPattern.chosenLabel}}
        </div>
      </div>
      <div class="content">
        
        <div class="roi-visualization">
          <div class="original">
            <img :src="originalPatternURL">
          </div>
          <div class="pattern-found">
            <roi-visualization v-if="revisedPattern.chosenROI" :roi="revisedPattern.chosenROI" :homographyURL="homographyURL" @click-on-canvas="openROIChangeModal">
            </roi-visualization>
          </div>
        </div>
        <div class="label-box" @click.prevent="toggleEditMode">
          {{patternIsTxt}} 
          <span :class="['label', 'label-' + revisedPattern.chosenLabel]">
            {{revisedPattern.chosenLabel}}
            <q-icon name="edit" class="edit-icon"></q-icon>
          </span>
        </div>
        <div class="score-box">
          <div class="section-title">{{scoreTxt}}:</div>
          <q-slider
            v-model="revisedPattern.chosenScore"
            :min="0"
            :max="2"
            :step="0.5"
            track-size="10px"
            thumb-size="35px"
            snap
            label
            label-always
            color="primary"
            @change="setChosenScore"
          ></q-slider>
          <div v-if="editMode" class="edit-mode-labels flex row ">
            <div v-for="(l, i) in labels" :key="i" :class="['new-label','label-' + l]" @click="setChosenLabel(i)" >{{l}}</div>
          </div>
        </div>
      </div>
    </g-card>
  </div>
</template>

<script>
import utils from '../services/utils.js'
import GCard from './GCard.vue'
import RoiVisualization from './ROIVisualization.vue'

export default {
  props: {
    pattern: {
      type: Object,
    },
    index: {
      type: Number
    }, 
    homographyURL: {
      type: String
    }
  },
  data() {
    return {
      scorePretty: 0,
      editMode: false,
      labels: ['omitted', 'distorted', 'misplaced', 'correct'],
      chosenLabel: '',
      chosenLabelNumber: 0,
      revisedPattern: {
        chosenScore: 0,
        chosenLabel: 'omitted',
        chosenLabelNumber: 0,
        chosenROI: [],
      }
    }
  },
  components: {
    GCard,
    RoiVisualization
  },
  methods: {
    setRevisedPattern() {
      this.revisedPattern = {
        chosenScore: this.pattern.score,
        chosenLabel: this.pattern.label,
        chosenLabelNumber: this.pattern.labelNumber,
        chosenROI: this.pattern.roi,
      }
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
      setTimeout(() => {
        if(this.editMode) {
          this.$el.querySelector('.edit-mode-labels').scrollIntoView({ block: 'center'} );
        }
      }, 100)
      
    },
    setChosenLabel(newPatternLabel) {
      this.revisedPattern.chosenLabel = this.labels[newPatternLabel];
      this.revisedPattern.chosenLabelNumber = newPatternLabel;
      this.toggleEditMode();
      this.$emit('newConfig', this.index, this.revisedPattern);
    },
    handleNewROI(newROI,patternIndex) {
      if (patternIndex != this.index) return;
      this.revisedPattern.chosenROI = newROI;
      this.revisedPattern = JSON.parse(JSON.stringify(this.revisedPattern));
      this.$emit('newConfig', this.index, this.revisedPattern);
    },
    openROIChangeModal(roi) {
      this.$emit('open-modal-drawing', roi, this.homographyURL, this.index);
    },
    setChosenScore() {
      this.editMode = true;
      this.$emit('newConfig', this.index, this.revisedPattern);
    }
  },
  beforeMount() {
    this.setRevisedPattern();
  },
  computed: {
    indexPretty(){
      return this.index + 1;
    },
    label() {
      return utils.getLabelFromScore(this.pattern);
    },
    originalPatternURL() {
      return require(`../assets/img/patterns/P${this.index + 1}.png`);
    },
    patternTxt() {
      return this.$t('rocfPattern_pattern');
    },
    patternIsTxt() {
      return this.$t('rocfPattern_patternIs');
    },
    scoreTxt() {
      return this.$t('rocfPattern_score');
    },
  },
}

</script>

<style scoped>
.pattern-box {
  padding: 0 var(--rocf-card-padding);
}
.heading,
.content {
  padding: var(--rocf-card-padding) 0;
}
.heading {
  border-bottom: 1px solid #ededed;
  font-size: 16px;
  font-weight: 600;
}
.heading .title {
  color: var(--rocf-primary);
}

.edit-icon {
  color: #CDCDCD;
  font-size: 24px;
  height: 10px;
  vertical-align: middle;
}
.section-title {
  margin-bottom: calc(1.5 * var(--rocf-content-margin-y));
}

.label-box {
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
}

.label {
  font-weight: 800;
}

.label.label-unknown {
  color: var(--rocf-text-color-gray);
}
.label.label-omitted {
  color: var(--rocf-dementia-dark);
}
.label.label-distorted{
  color: var(--rocf-MCI-dark);
}
.label.label-misplaced {
  color: var(--rocf-misplaced);
}
.label.label-correct {
  color: var(--rocf-normal-dark);
}

.edit-mode-labels {
  flex-wrap: nowrap;
}
.new-label {
  padding: 16px 6px;
  border-radius: var(--rocf-card-radius);
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-right: 8px;
}
.new-label.label-omitted {
  color: white;
  background-color: var(--rocf-dementia-dark);
}
.new-label.label-distorted{
  color: white;
  background-color: var(--rocf-MCI-dark);
}
.new-label.label-misplaced {
  color: white;
  background-color: var(--rocf-misplaced);
}
.new-label.label-correct {
  color: white;
  background-color: var(--rocf-normal-dark);
}
.roi-visualization .original img {
  width: 100%;
}
.q-slider {
  width: calc(100% - var(--rocf-card-padding));
}

.q-slider >>> .q-slider__thumb-container{
  transform: scale(1.8);
}

@media (max-width:600px) {
  .q-slider >>> .q-slider__thumb-container{
    transform: scale(1.5);
  }
}
/** Check this better */
/* @media (min-width: 600px) {
  .content > .roi-visualization {
    display: flex;
    flex-direction:row;
  }
} */
</style>