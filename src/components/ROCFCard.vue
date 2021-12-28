<template>
  <g-card :class="['rocf-card', 'flex', 'row',{'scores-missing': !rocf.scores}]" >  
    <div class="info col-9">
      <div class="patient">Patient {{rocf.patientCode}}</div>
      <div class="date">{{formattedDate}}</div>
    </div>
    <div :class="['result', diagnosis.toLowerCase(), 'col-3', 'flex', 'column', 'justify-center' ]">
      <div class="score">{{score}}</div>
      <div class="diagnosis">{{!rocf.scores ? 'Loading...' : diagnosis}}</div>
    </div>
  </g-card>
</template>

<script>
import utils from '../services/utils.js'
import GCard from './GCard.vue'
export default {
  props: {
    rocf: {
      type: Object,
    }
  },
  components: {
    GCard
  },
  computed: {
    formattedDate() {
      return new Date(this.rocf.date).toDateString()
    },
    score() {
      return this.rocf.scores ? utils.sum(this.rocf.scores.map(pattern => pattern.score)) : 0;
    },
  },
  data() {
    return {
      diagnosis: '',
    };
  },
  beforeMount() {
    this.diagnosis = utils.getDiagnosisFromScore(this.score);
  },
  beforeUpdate() {
    this.diagnosis = utils.getDiagnosisFromScore(this.score);
  }
}

</script>

<style scoped>

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
.rocf-card:not(.scores-missing) .result.normal {
  background-color: var(--rocf-normal);
  color: var(--rocf-normal-dark);
}
.rocf-card:not(.scores-missing) .result.mci {
  background-color: var(--rocf-MCI);
  color: var(--rocf-MCI-dark);
}
.rocf-card:not(.scores-missing) .result.dementia {
  background-color: var(--rocf-dementia);
  color: var(--rocf-dementia-dark);
}
.scores-missing {
  opacity: 0.5;
}
</style>