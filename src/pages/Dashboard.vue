<template>
  <q-page class="flex column flex-start">  
    <div class="rocf-header">
      <h3 class="greeting">Good Morning,</h3>
      <h2 class="doctor-name">Dr. Rossi</h2>
    </div>
    <router-link to="/evaluate/patient">
      <new-rocf></new-rocf>
    </router-link>

    <!--Add here search bar-->

    <div class="rocf-evaluations">
      <h3> Previous ROCF Evaluations </h3>

      <rocf-list v-if="rocfs.length" :rocfs="rocfs"></rocf-list>
      <div v-else class="empty-list-rocfs">
        <br>
        <h3>There are no ROCFs evaluations yet.</h3>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from '../services/api'
import NewRocf from '../components/NewROCF.vue'
import RocfList from '../components/ROCFList.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      results: null,
      info: '',
      rocfs: []
    };
  },
  components: {
    NewRocf,
    RocfList,
  },
  methods: {
    checkIfEvaluationInProgress() {
      let evaluationInProgressId = localStorage.getItem('evaluationInProgressId');
      if(evaluationInProgressId) {
        alert("We are analysing a ROCF... It should be ready in a few minutes!");
        this.setIntervalForRetrievingResults(evaluationInProgressId);
      }
    },
    setIntervalForRetrievingResults(evaluationInProgressId) {
      const retrieveResultsInterval = setInterval(async () => {
        let result = await api.get('/rocf/' + evaluationInProgressId);
        // this.info = "checking...."
        if(result.scores) {
          this.results = result.scores;
          localStorage.removeItem('evaluationInProgressId');
          clearInterval(retrieveResultsInterval);
          this.$store.dispatch('fetchNewRocfToArray', result);
          alert(`The ROCF for patient ${result.patientCode} is ready!`);
        }
      }, 15000);
    },
    async getLastROCFs() {
      this.rocfs = await api.get('/rocf');
      console.log(this.rocfs)
      // this.info = this.rocfs
      this.$store.dispatch('fetchNewRocfEvaluations', this.rocfs);
    }
  },
  async beforeMount() {
    await this.getLastROCFs();
  },
  mounted() {
    this.rocfs = this.$store.state.rocfEvaluations;
    this.checkIfEvaluationInProgress();
  },
}
</script>

<style scoped>
.rocf-header {
  margin-top: 40px;
  margin-bottom: var(--rocf-content-margin-y);
}
.rocf-header .greeting {
  font-size: 18px;
}
.rocf-header .doctor-name {
  color: var(--rocf-primary);
  font-size: 28px;
  font-weight: 600;
}

.rocf-evaluations {
  margin-top: calc(2 * var(--rocf-content-margin-y));
}
.rocf-evaluations h3 {
  font-weight: 600;
  margin-bottom: calc(0.5 * var(--rocf-content-margin-y));
}

.empty-list-rocfs h3 {
  color: #adadad;
}
</style>