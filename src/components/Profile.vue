<template>
  <div class="ui raised very padded container segment">
    <div class="ui grid">
      <div class="two column row">
        <div class="six wide column">
          <div class="ui card">
            <div class="image">
              <img src="../assets/images/avatar.jpg">
            </div>
            <div class="content">
              <div class="header">
                <i class="ui user icon"></i>{{currentUser.username}} <br>
              </div>
            </div>
            <div class="content">
              <div class="description">
                <div><i class="ui phone icon"></i>{{currentUser.email}}</div>
                <div><i class="ui inbox icon"></i>{{currentUser.email}}</div>
                <div class="ui small feed">
                  <div class="event">
                    <div class=" content">
                      <p><i class="ui question circle icon"></i> Authorities</p>
                      <li v-for="(role,index) in currentUser.roles" :key="index"><i class="ui lock icon"></i>{{role}}</li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="extra content">
              <a>
                <i class="user icon"></i>
                22 Friends
              </a>
            </div>
          </div>
        </div>
        <div class="column">
            <header class="jumbotron">
                <h3>
                  <strong>{{currentUser.username}}</strong> Profile
                </h3>
            </header>
            <br>
            <p>
              <strong>UserID :</strong>
              {{currentUser.id}}
            </p>
            <p>
              <strong>Email :</strong>
              {{currentUser.email}}
            </p>
            <strong>Authorities :</strong>
            <ul>
              <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
