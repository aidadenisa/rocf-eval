<template>
  <q-page class="flex column flex-start">  
    <div class="rocf-header">
      <h3 class="greeting">{{greetingTxt}},</h3>
      <h2 class="doctor-name">{{doctorTxt}} {{user.name}}</h2>
    </div>
    <router-link to="/evaluate/patient">
      <new-rocf></new-rocf>
    </router-link>

    <div class="search-bar flex row ">
      <q-icon name="search" class="search-icon"></q-icon>
      <input v-model="search">
    </div>

    <div class="rocf-evaluations">
      <h3> {{previousRocfTxt}} </h3>

      <rocf-list v-if="filteredROCF.length" :rocfs="filteredROCF"></rocf-list>
      <div v-else class="empty-list-rocfs">
        <br>
        <h3>{{noRocfTxt}}</h3>
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
      rocfs: [],
      user: null,
      search: ''
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
        alert(this.rocfInProgressTxt);
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
          alert(`${this.rocfReady1Txt} ${result.patientCode} ${this.rocfReady2Txt}`);
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
    this.user = this.$store.state.user;
    await this.getLastROCFs();
  },
  mounted() {
    this.rocfs = this.$store.state.rocfEvaluations;
    this.checkIfEvaluationInProgress();
  },
  computed: {
    filteredROCF() {
      return this.rocfs.filter(rocf => {
        return rocf.patientCode.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    greetingTxt() {
      return this.$t('dashboard_greeting');
    },
    doctorTxt() {
      return this.$t('dashboard_doctorTitle');
    },
    previousRocfTxt() {
      return this.$t('dashboard_previousROCF');
    },
    noRocfTxt() {
      return this.$t('dashboard_noROCF');
    },
    rocfInProgressTxt() {
      return this.$t('dashboard_rocfInProgressAlert');
    },
    rocfReady1Txt() {
      return this.$t('dashboard_rocfReady1Alert');
    },
    rocfReady2Txt() {
      return this.$t('dashboard_rocfReady2Alert');
    },

  }
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

.rocf-evaluations, .search-bar {
  margin-top: calc(1.5 * var(--rocf-content-margin-y));
}
.rocf-evaluations h3 {
  font-weight: 600;
  margin-bottom: calc(0.5 * var(--rocf-content-margin-y));
}

.empty-list-rocfs h3 {
  color: #adadad;
}
.search-bar {
  position: relative;
  color: var(--rocf-primary);
}
.search-bar input{
  width: 100%;
  border: none;
  padding: 12px;
  font-size: 18px;
  padding-left: calc( 2 * 12px + 28px);
  box-shadow: var(--rocf-card-shadow);
  color: var(--rocf-primary);
}
.search-bar .search-icon {
  position: absolute;
  font-size: 28px;
  padding: 12px;
}
</style>