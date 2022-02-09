<template>
  <div class="rocf-pattern-card">  
    <g-card class="pattern-box">
      <div class="heading flex justify-between">
        <div class="title">
          Pattern {{indexPretty}}
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
            <roi-visualization :roi="pattern.roi" :homographyURL="homographyURL" @click-on-canvas="$emit('open-modal-drawing',pattern, homographyURL)">
            </roi-visualization>
          </div>
        </div>
        <div class="score-box">
          <div class="section-title">Score:</div>
          <q-slider
            v-model="revisedPattern.chosenScore"
            :min="0"
            :max="2"
            :step="0.5"
            snap
            label
            label-always
            color="primary"
            :disable="!editMode"
          ></q-slider>
          <div v-if="editMode" class="edit-mode-labels flex row justify-between">
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
      }
    }
  },
  components: {
    GCard,
    RoiVisualization
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
    }
  },
  methods: {
    setRevisedPattern() {
      this.revisedPattern = {
        chosenScore: this.pattern.score,
        chosenLabel: this.pattern.label,
        chosenLabelNumber: this.pattern.labelNumber,
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
    openModalForDrawing() {

    }
  },
  beforeMount() {
    this.setRevisedPattern();
  }
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
</style>