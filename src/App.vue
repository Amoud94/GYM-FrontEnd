<template>

  <div id="app">
    <div class="ui blue tiny inverted menu">
        <router-link to="/home" class="item"><a> Home</a> </router-link>
        <router-link to="/manager" v-if="showManagerBoard" class="item"><a>Manager Board</a></router-link>     
        <router-link to="/employee" v-if="showEmployeeBoard" class="item"><a>Employee Board</a></router-link>    
        <router-link to="/coach" v-if="showCoachBoard" class="item"><a>Coach Board</a></router-link>   
        <div class="right menu">
          <div v-if="!currentUser" class="right aligned item">
            <router-link to="/login">
              <a class="item">
                Login
              </a>
            </router-link>
          </div>
          <div v-if="currentUser" class="right aligned item">
            <router-link to="/profile"  class="item">
              <a>
                Profile
              </a>
            </router-link> 
              <a class="item" @click.prevent="logOut()">
                Log Out
              </a>
          </div>
        </div>
    </div>
    <notifications group="crud" />

    <router-view />
  </div>
</template>

<script>
import "../libs/semantic-ui/semantic.min.js";
import "../libs/semantic-ui/semantic.min.css";

export default {
  name: "app",
  
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showManagerBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MANAGER");
      }

      return false;
    },
    showEmployeeBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_EMPLOYEE");
      }

      return false;
    },
    showCoachBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_EMPLOYEE");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>

</style>