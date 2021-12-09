<template>
  <q-page :class="['flex','column']"> 
    <subpage-heading title="ROCF Patterns evaluation complete" subtitle="New ROCF Evaluation"></subpage-heading>
    <div class="total-result">
      <g-card class="result-box flex row">
        <div class="label-box col-6">
          Result: 
        </div>
        <div class="score-box col-6">
          {{score}}
        </div>
      </g-card>
    </div>

    <h3 class="section-title">Patterns</h3>
    <div class="pattern-list">
      <rocf-pattern 
        v-for="(pattern, index) in rocf.scores"
        :key="index"
        :pattern="pattern"
        :index="index"
        @newConfig="saveNewScoreForPattern"
      ></rocf-pattern>
    </div>

    <div class="save-revision" v-if="revised">
      <q-page-sticky expand position="bottom" class="flex column justify-center">
        <rocf-button :icon="'chevron_right'" :icon-position="'right'" @click="saveRevision">Save revision</rocf-button>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import SubpageHeading from '../components/SubpageHeading.vue';
import RocfPattern from '../components/ROCFPatternCard.vue';
import RocfButton from '../components/ROCFButton.vue';
import GCard from '../components/GCard.vue';
import utils from '../services/utils.js';
import api from '../services/api.js';

export default {
  components: {
    RocfPattern,
    SubpageHeading, 
    GCard,
    RocfButton,
  },
  data() {
    return {
      rocf: null,
      info: '',
      revised: false,
      labels: ['omitted', 'distorted', 'misplaced', 'correct'],
      showSaveDialog: false,
    };
  },
  computed: {
    score() {
      return this.rocf.scores ? utils.sum(this.rocf.scores.map(pattern => pattern.score)) : 0;
    },
  },
  methods: {
    saveNewScoreForPattern(index, newPatternConfig) {
      this.rocf.revisedScores[index].revisedScore = newPatternConfig.chosenScore;
      this.rocf.revisedScores[index].revisedLabel = newPatternConfig.chosenLabel;
      this.revised = true;
    },
    createCloneOfScores() {
      let clone = [];
    
      for (let i=0; i< this.rocf.scores.length; i++){
        clone.push({
          initialScore: this.rocf.scores[i].score,
          initialLabel: this.rocf.scores[i].label,
          revisedScore: this.rocf.scores[i].score,
          revisedLabel: this.rocf.scores[i].label,
        });
      }
      return clone;
    },
    updateScoresAfterRevision() {
      for(let i=0; i<this.rocf.scores.length; i++) {
        this.rocf.scores[i].score = this.rocf.revisedScores[i].revisedScore;
        this.rocf.scores[i].label = this.rocf.revisedScores[i].revisedLabel;
        this.rocf.scores[i].labelNumber = this.labels.indexOf(this.rocf.revisedScores[i].revisedLabel);
      }
    },
    async saveRevision() {
      this.rocf["_rocfEvaluationId"] = this.rocf._id;
      this.updateScoresAfterRevision();
      let result = await api.post('/revision', this.rocf );
      console.log(result);
      alert("The ROCF evaluation was saved successfully!");
      this.revised = false;
    }
  },
  beforeMount() {
    this.rocf = this.$store.getters.getROCF(this.$route.params.id);
    this.rocf.revisedScores = this.createCloneOfScores();
  }
}

</script>

<style scoped>
.result-box {
  font-size: 18px;
  font-weight: 600;
}
.result-box > div {
  padding: var(--rocf-card-padding);
}
.label-box {
  color: var(--rocf-primary);
}
.score-box {
  text-align: center;
  background-color: #F6F6F6;
}
.section-title {
  font-weight: 600;
  margin-top: var(--rocf-content-margin-y);
}
.pattern-list {
  margin-top: var(--rocf-content-margin-y);
}
.save-revision .q-page-sticky{
  background-color: var(--rocf-secondary);
  padding: var(--rocf-page-padding);
}
</style>







