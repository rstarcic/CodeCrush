<template>
  <v-app>
    <v-app-bar app color="#581E64" dense>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Logo Code Crush"
            contain
            src="@/assets/Logo.png"
            width="48"
            height="48"
          />
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="#FFFFFF" text to="/" v-if="isAuthenticated">HOME</v-btn>
      <v-btn color="#FFFFFF" text to="/html" v-if="isAuthenticated">HTML</v-btn>
      <v-btn color="#FFFFFF" text to="/css" v-if="isAuthenticated">CSS</v-btn>
      <v-btn color="#FFFFFF" text to="/javascript" v-if="isAuthenticated"
        >JAVASCRIPT</v-btn
      >
      <v-btn color="#FFFFFF" text to="/markdown" v-if="isAuthenticated"
        >MARKDOWN</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn elevation="0" small color="#581E64" dark class="mr-2" to="/login">
        <v-icon dark>mdi-login-variant</v-icon>
        <span class="white--text">Sign In</span>
      </v-btn>
      <v-btn text small class="navbar-tile-btn" to="/signup">
        <v-icon color="white">mdi-account-plus</v-icon>
        <span class="white--text">Sign Up</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="#581E64">
      <v-card-title class="footer-text">
        Get connected with us on social networks!
      </v-card-title>
      <div class="d-flex ml-auto">
        <v-btn small class="social-button mr-2">
          <v-icon class="social-icon" left>mdi-facebook</v-icon> Facebook
        </v-btn>
        <v-btn small class="social-button mr-2">
          <v-icon class="social-icon" left>mdi-twitter</v-icon> Twitter
        </v-btn>
        <v-btn small class="social-button mr-2">
          <v-icon class="social-icon" left>mdi-instagram</v-icon> Instagram
        </v-btn>
      </div>
    </v-footer>
  </v-app>
</template>
<script>
import { auth, onAuthStateChanged } from "../firebase.js";
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    checkIfUserAuthenticated() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isAuthenticated = true;
          debugger;
        } else {
          this.isAuthenticated = false;
        }
      });
    },
  },
  mounted() {
    this.checkIfUserAuthenticated();
  },
};
</script>


<style>
.custom-title {
  color: #f5eeee;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
.button-favorites {
  color: #581e64;
}
.footer-text {
  color: #f5eeee;
  font-size: 16px;
  padding: 5px;
}
.v-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%; /* Adjust the max-width as needed */
  border-radius: 0;
  padding: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
}
.navbar-tile-btn {
  border: 1px solid white;
  border-radius: 0px;
  color: #581e64 !important;
}

.social-icon {
  color: #4b408b !important;
}
</style>