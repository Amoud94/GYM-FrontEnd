<template>
<div class="container">
  <div>
    <h2 class="ui center blue aligned icon header">
      <i class="circular user icon"></i>
      Veuillez vous connecter à votre compte
    </h2>
  </div>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input
                v-model="user.username"
                type="text"
                class="form control"
                name="username"
                placeholder="Nom d'utilisateur"
              />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input
                v-model="user.password"
                type="password"
                class="form control"
                name="password"
                placeholder="Mot de passe"
              />
            </div>
          </div>
          <div class="ui fluid large blue submit button" :disabled="loading" @click.prevent="handleLogin()">
              <span>Se connecter</span>
          </div>
        </div>
        <div class="ui error message"></div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            username: {
              identifier  : 'username',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your e-mail'
                },
                {
                  type   : 'email',
                  prompt : 'Please enter a valid e-mail'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    })
  ;
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
    }
  }
};
</script>

<style scoped>
body {
      background-color: #DADADA;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -60px;
    }
    .column {
      max-width: 450px;
    }

label {
  display: block;
  margin-top: 10px;
}
</style>