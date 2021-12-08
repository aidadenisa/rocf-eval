<template>
  <div class="rocf-card flex row">  
    <div class="info col-9">
      <div class="patient">Patient {{rocf.patientCode}}</div>
      <div class="date">{{formattedDate}}</div>
    </div>
    <div :class="['result', diagnosis.toLowerCase(), 'col-3', 'flex', 'column', 'justify-center' ]">
      <div class="score">{{score}}</div>
      <div class="diagnosis">{{diagnosis}}</div>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils.js'
export default {
  props: {
    rocf: {
      type: Object,
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.rocf.date).toDateString()
    },
    score() {
      let sum = 0;
      if(!this.rocf.predictionTotalScores.length) return sum;
      for (let i = this.rocf.predictionTotalScores.length; i--;) {
        sum+=this.rocf.predictionTotalScores[i];
      }
      return sum;
    },
  },
  data() {
    return {
      diagnosis: '',
    };
  },
  mounted() {
    this.diagnosis = utils.getDiagnosisFromScore(this.score);
  }
}

</script>

<style scoped>
.rocf-card{
  background-color: white;
  border-radius: var(--rocf-card-radius);
  box-shadow: var(--rocf-card-shadow);
  margin-bottom: calc(0.5 * var(--rocf-content-margin-x));
}
p {
  margin: 0;
}
.call-to-action {
  margin-top: 8px;
  font-size: 18px;
}
.info {
  color: #AAC6F4;
  font-size: 14px;
  padding: var(--rocf-card-padding);
}

.info .patient {
  font-size: 18px;
  color: var(--rocf-primary);
  font-weight: 600;
}
.info .date {
  font-size: 14px;
  color: #adadad;
  font-weight: 600;
}

.result {
  text-align: center;
}
.result .score {
  font-size: 18px;
  color: var(--rocf-text-color);
  font-weight: 600;
}
.result .diagnosis {
  font-weight: 600;
}
.result.normal {
  background-color: var(--rocf-normal);
  color: var(--rocf-normal-dark);
}
.result.mci {
  background-color: var(--rocf-MCI);
  color: var(--rocf-MCI-dark);
}
.result.dementia {
  background-color: var(--rocf-dementia);
  color: var(--rocf-dementia-dark);
}
</style>