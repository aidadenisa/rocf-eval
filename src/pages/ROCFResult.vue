<template>
  <q-page :class="['flex','column']"> 
    <subpage-heading title="ROCF Patterns evaluation complete" subtitle="New ROCF Evaluation"></subpage-heading>
    <div class="total-result">
      <g-card class="result-box flex row">
        <div class="score-box col-3">
          <div class="card-title"> Score </div>
          <div class="score">{{score}}</div>
        </div>
        <div class="diagnosis-box col-9 flex column items-center" v-if="rocf.diagnosis">
          <div class="card-title"> Prediction </div>
          <table class="chart">
            <tr 
              v-for="(prob, index) in rocf.diagnosis.probabilities" 
              :key="index" 
              :class="[label(index), 'diagnosis', {'predicted-diagnosis': index == rocf.diagnosis.labelNumber}]"
            >
              <td class="label"> {{label(index)}}</td>
              <td class="progress">
                <div class="total-progress-bar">
                  <div class="actual-progress-bar" :style="`width: ${setWidthFromProbability(prob)}`">
                  </div>
                </div>
              </td>
              <td class="probability"> {{parseFloat(prob.toString()).toFixed(2)}} </td>
            </tr>
          </table>
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
        :homographyURL="homographyURL"
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
      homographyURL: '',
      showOriginal: false,
    };
  },
  computed: {
    score() {
      return this.rocf.scores ? utils.sum(this.rocf.scores.map(pattern => pattern.score)) : 0;
    },
    activeImgFolder() {
      return this.showOriginal ? 'original' : 'threshed';
    }, 
    docID(){
      return this.$store.state.user.id;
    }
  },
  methods: {
    async getThreshedImage() {
      let result = await api.getImage(`/files/${this.docID}/${this.activeImgFolder}/${this.rocf.imageName}.png`);
      let baseImage = new Image();
      baseImage.onload = () => {
        this.homographyURL = window.URL.createObjectURL(result);
      }
      baseImage.src = window.URL.createObjectURL(result);
    },
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
    },
    label(index) {
      if(index == 0) {
        return 'Normal';
      } else if (index == 1) {
        return 'MCI';
      } else {
        return 'Dementia';
      }
    },
    setWidthFromProbability(prob) {
      let progress = parseFloat(prob).toFixed(2) * 100;
      return progress + '%';
    }
  },
  async beforeMount() {
    this.rocf = this.$store.getters.getROCF(this.$route.params.id);
    this.rocf.revisedScores = this.createCloneOfScores();
    await this.getThreshedImage();
  },
  watch: {
    async activeImgFolder() {
      await this.getThreshedImage();
    }
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
.section-title {
  font-weight: 600;
  margin-top: var(--rocf-content-margin-y);
}
.pattern-list {
  margin-top: var(--rocf-content-margin-y);
  margin-bottom: 150px;
}
.save-revision .q-page-sticky{
  background-color: var(--rocf-secondary);
  padding: var(--rocf-page-padding);
}

.score-box .score {
  padding: 4px;
  border-radius: 4px;
  color: var(--rocf-primary);
  background-color: var(--rocf-secondary);
  margin: 14px 0px;
} 

.card-title {
  color: var(--rocf-primary);
  margin-bottom: 8px;
}
.score-box {
  text-align: center;
}

.diagnosis-box {
  padding-left: 0px;
}

table.chart {
  width: 100%;
}
table tr td.progress {
  width: 50%;
}
table tr td.progress .total-progress-bar{
  width: 100%;
  height: 10px;
  background-color: #dedede;
  border-radius: 5px;
}
table tr td.progress .total-progress-bar .actual-progress-bar {
  height: 10px;
  border-radius: 5px;
}

.chart .diagnosis {
  font-size: 16px;
  flex-wrap: nowrap;
}

table tr.Normal td.progress .total-progress-bar .actual-progress-bar {
  background-color: var(--rocf-normal-dark);
}
table tr.MCI td.progress .total-progress-bar .actual-progress-bar {
  background-color: var(--rocf-MCI-dark);
}
table tr.Dementia td.progress .total-progress-bar .actual-progress-bar {
  background-color: var(--rocf-dementia-dark);
}

table tr.Normal:not(.predicted-diagnosis) ,
table tr.MCI:not(.predicted-diagnosis) ,
table tr.Dementia:not(.predicted-diagnosis) {
  opacity: 0.5;
}

tr.predicted-diagnosis {
  font-weight: 800;
}

</style>