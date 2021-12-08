<template>
  <q-page class="flex flex-center">  
    <router-link to="/evaluate/patient">
      <q-btn color="primary">Scan new ROCF</q-btn>
    </router-link>
    {{results}}

    <br>
    {{info}}
  </q-page>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Dashboard',
  data() {
    return {
      results: null,
      info: ''
    };
  },
  methods: {
    checkIfEvaluationInProgress() {
      let evaluationInProgressId = localStorage.getItem('evaluationInProgressId');
      if(evaluationInProgressId) {
        this.setIntervalForRetrievingResults(evaluationInProgressId);
      }
    },
    setIntervalForRetrievingResults(evaluationInProgressId) {
      const retrieveResultsInterval = setInterval(async () => {
        let result = await api.get('/rocf/' + evaluationInProgressId);
        this.info = "checking...."
        if(result.predictionTotalScores) {
          this.results = result.predictionTotalScores;
          localStorage.removeItem('evaluationInProgressId');
          clearInterval(retrieveResultsInterval)
        }
      }, 15000);
    }
  },
  beforeMount() {
    this.checkIfEvaluationInProgress();
  }
}
</script>
