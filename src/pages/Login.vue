<template>
  <q-page class="register-page flex column justify-center">
    
    <div class="logo">
      <h3> Evaluator </h3>
      <h2> ROCF </h2>
      
    </div>
    <div class="register-form flex column">
      
      <div class="field flex column">
        <div class="input-wrapper">
          <input type="email" id="email" v-model="email" placeholder="Email" required>
        </div>
      </div>
      <div class="field flex column">
        <div class="input-wrapper">
          <input type="password" id="pass" v-model="pass" placeholder="Password" required>
        </div>
      </div>

      <div class="register-link">
        <router-link to="/register">
          {{registerLinkTxt}}
        </router-link>
      </div>
      <rocf-button type="password" class="submit-button" :disabled="loading" @click="login">{{loginTxt}}</rocf-button>

    </div>
    <div class="language">
      <lang-switch></lang-switch>
    </div>
  </q-page>
</template>

<script>
import RocfButton from '../components/ROCFButton.vue';
import LangSwitch from '../components/LangSwitch.vue';
import api from '../services/api.js';

export default {
  data() {
    return {
      email: '',
      pass: '',
      loading: false,
};
  },
  components: {
    RocfButton,
    LangSwitch,
  },
  methods: {
    async login() {

      if(this.email === '' || this.pass === '') {
        alert(this.emptyFieldTxt);
        return;
      }
      this.loading = true;
      let result = await api.post('/login', {
        email: this.email,
        password: this.pass,
      }).catch((error)=>{
        alert(this.errorTxt);
        this.loading = false;
      });
      this.loading = false;

      if(result && result.token) {
        localStorage.setItem('token', result.token);
        this.$store.dispatch('fetchNewUserInfo', result);
        this.$router.push('/');
      }

    }
  },
  computed: {
    registerLinkTxt() {
      return this.$t('login_registerLink');
    },
    loginTxt() {
      return this.$t('login_loginBtn');
    },
    emptyFieldTxt() {
      return this.$t('login_fieldEmptyAlert');
    },
    errorTxt() {
      return this.$t('login_errorAlert');
    },
  },

}
</script>

<style scoped>
h2 {
  font-size: 64px;
  margin: 10px 0;
  font-weight: 200;
}
h3 {
  font-size: 32px;
  margin: 20px 0;
}
.register-form {
  align-items: center;
}
input {
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background-color: white;
  width: 100%;
  font-size: 16px;
}
.input-wrapper {
  box-shadow: 0px 4px 12px rgba(189, 189, 189, 0.2);

}
.field,
.submit-button {
  margin-bottom: 20px;
  width: 80%;
}
.field {
  margin-bottom: 20px;
}
.logo {
  text-align: center;
  color: var(--rocf-primary);
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 20px;
}
.register-page {
  height: 100%;

}
label {
  font-size: 16px;
  margin-bottom: 8px;
}

::placeholder {
  color: #303030;
}
.register-link {
  margin: 10px 0 30px 0;
}
.register-link a {
  color: var(--rocf-primary);
  padding: 10px 0 30px 0;
}

.language {
  position: absolute;
  bottom: 14px;
  right: 0;
}
</style>