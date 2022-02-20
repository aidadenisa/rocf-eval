<template>
  <q-layout view="lHh Lpr lFf">

    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ROCF Evaluator
        </q-toolbar-title>

      </q-toolbar>
    </q-header> -->



    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>

         <q-item clickable v-ripple @click="toggleLeftDrawer">
          <q-item-section avatar>
            <q-icon name="arrow_back" />
          </q-item-section>

          <q-item-section>
            Back
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="toggleLeftDrawer">
          <q-item-section avatar>
            <q-icon name="translate" />
          </q-item-section>

          <q-item-section>
            <lang-switch></lang-switch>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section>
            About the app
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            Logout
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <div class="menu-button" v-if="user && user.email" @click.stop="toggleLeftDrawer">
        <q-icon name="menu"></q-icon>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import LangSwitch from '../components/LangSwitch.vue'

export default {
  name: 'MainLayout',
  components: {
    LangSwitch
  },
  data() {
    return {
      leftDrawerOpen: false,
      user: null,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logout() {
      this.leftDrawerOpen = false;
      this.user = null;
      localStorage.removeItem('token');
      this.$store.dispatch('fetchNewUserInfo', null);
      this.$router.push('/login');
    }
  },
  beforeMount() {
    this.user = this.$store.state.user;
  },
  updated() {
    this.user = this.$store.state.user;
  }
}
</script>

<style scoped>
.q-page {
  height: 100%;
}
.menu-button {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
.q-list {
  padding-top: 20px;
  font-size: 18px;
}
.q-separator {
  margin-bottom: 20px;
}
.lang {
  padding: initial;
  font-size: initial;
  font-weight: initial;
}
</style>