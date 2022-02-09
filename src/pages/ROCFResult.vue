<template>
  <q-page :class="['flex','column']"> 
    <subpage-heading title="ROCF Patterns evaluation complete" subtitle="New ROCF Evaluation"></subpage-heading>
    <div class="total-result">
      <g-card class="result-box flex row">
        <div class="score-box col-3">
          <div class="card-title"> Score </div>
          <div class="score">{{score}}</div>
        </div>
        <div v-if="rocf.diagnosis" class="col-9">
          <div v-if="!changeDiagnosis">
            <div v-if="rocf.diagnosis.doctorOverridden" class="diagnosis-overridden">
              <div class="card-title"> Diagnosis </div>
              <div class="diagnosis-card" :class="rocf.diagnosis.labelText">
                {{label(rocf.diagnosis.labelNumber)}}
              </div>
            </div>
            <div v-else class="system-prediction diagnosis-box flex column items-center">
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
            <div class="button-bar">
              <rocf-button :icon="'edit'" :icon-position="'left'" variant="secondary" :block="false" size="small" @click="changeDiagnosis = true">
                Change Diagnosis
              </rocf-button>
            </div>
          </div>
          <div v-else class="diagnosis-box flex column items-center">
            <div class="card-title"> Choose diagnosis </div>
            <div class="diagnosis-choices">
              <div :class="['normal', {selected: chosenDiagnosis == 'normal'}]" @click="chooseDiagnosis('normal')">Normal</div>
              <div :class="['mci', {selected: chosenDiagnosis == 'mci'}]" @click="chooseDiagnosis('mci')">MCI</div>
              <div :class="['dementia', {selected: chosenDiagnosis == 'dementia'}]" @click="chooseDiagnosis('dementia')">Dementia</div>
            </div>
            <div class="button-bar">
              <rocf-button :icon="'chevron_left'" :icon-position="'left'" @click="resetDiagnosisChange" :block="false" size="small" variant="secondary">
                Back to predictions
              </rocf-button>
            </div>
          </div>
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
      changeDiagnosis: false,
      chosenDiagnosis: ''
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
    createCloneOfDiagnosis() {
      let clone = {
          initialDiagnosisNumber: this.rocf.diagnosis.labelNumber,
          initialDiagnosisText: this.rocf.diagnosis.labelText,
          revisedDiagnosisNumber: this.rocf.diagnosis.labelNumber,
          revisedDiagnosisText: this.rocf.diagnosis.labelText,
        };
      return clone;
    },
    updateScoresAfterRevision() {
      for(let i=0; i<this.rocf.scores.length; i++) {
        this.rocf.scores[i].score = this.rocf.revisedScores[i].revisedScore;
        this.rocf.scores[i].label = this.rocf.revisedScores[i].revisedLabel;
        this.rocf.scores[i].labelNumber = this.labels.indexOf(this.rocf.revisedScores[i].revisedLabel);
      }
    },
    updateDiagnosisAfterRevision() {
      this.rocf.diagnosis.labelNumber = this.rocf.revisedDiagnosis.revisedDiagnosisNumber;
      this.rocf.diagnosis.labelText = this.rocf.revisedDiagnosis.revisedDiagnosisText;
      this.rocf.diagnosis.probabilities = this.rocf.revisedDiagnosis.revisedProbabilities;
      this.rocf.diagnosis.doctorOverridden = this.rocf.revisedDiagnosis.revisedDoctorOverridden;
    },
    async saveRevision() {
      this.rocf["_rocfEvaluationId"] = this.rocf._id;
      this.updateScoresAfterRevision();
      this.updateDiagnosisAfterRevision();
      let result = await api.post('/revision', this.rocf );
      console.log(result);
      alert("The ROCF evaluation was saved successfully!");
      this.revised = false;
      this.changeDiagnosis = false;
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
    getNumberFromLabel(label) {
      if(label.toLowerCase() == 'normal'){
        return 0;
      } else if (label.toLowerCase() == 'mci') {
        return 1;
      } else {
        return 2;
      }
    },
    setWidthFromProbability(prob) {
      let progress = parseFloat(prob).toFixed(2) * 100;
      return progress + '%';
    },
    getProbabilitiesForChosenLabel(chosenDiagnosis) {
      let probabilities = [];
      for(let i=0; i<3; i++) {
        if(this.getNumberFromLabel(chosenDiagnosis) == i) {
          probabilities.push(1.0);
        } else {
          probabilities.push(0.0);
        }
      }
      return probabilities;
    },
    chooseDiagnosis(label) {
      this.revised = true;
      this.chosenDiagnosis = label;

      this.rocf.revisedDiagnosis.revisedDiagnosisNumber = this.getNumberFromLabel(this.chosenDiagnosis);
      this.rocf.revisedDiagnosis.revisedDiagnosisText = this.chosenDiagnosis;
      // this.rocf.revisedDiagnosis.revisedProbabilities = this.getProbabilitiesForChosenLabel(this.chosenDiagnosis);
      this.rocf.revisedDiagnosis.revisedDoctorOverridden = true;
    },
    resetDiagnosisChange() {
      this.changeDiagnosis = false;
      this.chosenDiagnosis = '';
      this.rocf.revisedDiagnosis = this.createCloneOfDiagnosis();
    }
  },
  async beforeMount() {
    this.rocf = this.$store.getters.getROCF(this.$route.params.id);
    this.rocf.revisedScores = this.createCloneOfScores();
    this.rocf.revisedDiagnosis = this.createCloneOfDiagnosis();
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
.save-revision .rocf-button {
  margin-bottom: 0;
}
.button-bar {
  margin-top: 10px;
}
.diagnosis-choices,
.diagnosis-choices > *,
.diagnosis-card,
.diagnosis-overridden {
  width: 100%;
  text-align: center;
}
.diagnosis-choices > *,
.diagnosis-card {
  padding: 10px;
  border-radius: 8px;
  margin-top: 6px;
}
.diagnosis-choices .normal.selected,
.diagnosis-card.normal {
  background-color: var(--rocf-normal);
  color: var(--rocf-normal-dark);
}
.diagnosis-choices .mci.selected,
.diagnosis-card.mci {
  background-color: var(--rocf-MCI);
  color: var(--rocf-MCI-dark);
}
.diagnosis-choices .dementia.selected,
.diagnosis-card.dementia {
  background-color: var(--rocf-dementia);
  color: var(--rocf-dementia-dark);
}

.diagnosis-choices > *:not(.selected) {
  background-color: #F2F2F2;
}
</style>