<template>
  <v-app>
    <v-app-bar app color="#581E64" dense>
      <div class="d-flex align-center">
        <v-img alt="Logo Code Crush" contain src="@/assets/Logo.png" width="48" height="48"/>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="#FFFFFF" text to="/" v-if="isAuthenticated">HOME</v-btn>
		  <v-btn color="#FFFFFF" text to="/html" v-if="isAuthenticated">HTML</v-btn>
		  <v-btn color="#FFFFFF" text to="/css" v-if="isAuthenticated">CSS</v-btn>
		  <v-btn color="#FFFFFF" text to="/javascript" v-if="isAuthenticated">JAVASCRIPT</v-btn>
		  <v-btn color="#FFFFFF" text to="/markdown" v-if="isAuthenticated">MARKDOWN</v-btn>
		  <v-spacer></v-spacer>
      <v-btn small color="#581E64" dark class="mr-2" to="/login">
        <v-icon dark>mdi-login-variant</v-icon>
        <span class="white--text">Sign In</span>
      </v-btn>
      <v-btn small color="#581E64" dark to="/signup">
        <v-icon dark>mdi-account-plus</v-icon>
        <span class="white--text">Sign Up</span>
      </v-btn>    
         
	  </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer color="#581E64">
      <v-card-title class="footer-text">
          Get connected with us on social networks!
      </v-card-title>
      <div class="d-flex ml-auto">
        <v-btn small class="icon mr-2">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn small class="icon mr-2">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn small class="icon mr-2">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<style>
.custom-title {
  color: #F5EEEE;
  font-family:'Courier New', Courier, monospace;
  font-weight: bold;
}
.button-favorites {
  color: #581E64;
}
.footer-text {
  color: #F5EEEE;
  font-size: 16px;
  padding: 5px;
}
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    isAuthenticated() { 
      auth().onAuthStateChanged((user) => {
        if(user) {
          this.isAuthenticated = true;
        }
        else {
          this.isAuthenticated = false;
        }
      });
    }
  }
};
</script>
