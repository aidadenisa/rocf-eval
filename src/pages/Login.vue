<template>
  <q-page class="register-page flex column justify-center">
    <div class="language">
      <lang-switch></lang-switch>
    </div>
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
          {{loginRegisterLink}}
        </router-link>
      </div>
      <rocf-button type="password" class="submit-button" @click="login">Login</rocf-button>

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
};
  },
  components: {
    RocfButton,
    LangSwitch,
  },
  computed: {
    loginRegisterLink() {
      return this.$t('login_registerLink');
    }
  },
  methods: {
    async login() {

      if(this.email === '' || this.pass === '') {
        alert('Please fill both email and password. Thank you!');
        return;
      }

      let result = await api.post('/login', {
        email: this.email,
        password: this.pass,
      }).catch(()=>{
        alert("There has been an error logging you in. Please try again!");
      });

      if(result && result.token) {
        localStorage.setItem('token', result.token);
        this.$store.dispatch('fetchNewUserInfo', result);
        this.$router.push('/');
      }

    }
  }

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
  top: 20px;
  right: 0px;
}
</style>