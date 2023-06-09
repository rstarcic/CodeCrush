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
      <v-btn color="#FFFFFF" text to="/profile" v-if="isAuthenticated"
        >Profile</v-btn
      >
      <v-btn color="#FFFFFF" text to="/html" v-if="isAuthenticated">HTML</v-btn>
      <v-btn color="#FFFFFF" text to="/css" v-if="isAuthenticated">CSS</v-btn>
      <v-btn color="#FFFFFF" text to="/javascript" v-if="isAuthenticated"
        >JAVASCRIPT</v-btn
      >
      <v-btn color="#FFFFFF" text to="/markdown" v-if="isAuthenticated"
        >MARKDOWN</v-btn
      >
      <v-btn color="#FFFFFF" text to="/favorites" v-if="isAuthenticated"
      >Favorites</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        v-on:click="signOut"
        text
        small
        class="navbar-tile-btn"
        to="/"
        v-if="isAuthenticated"
      >
        <v-icon color="white">mdi-signout</v-icon>
        <span class="white--text">Sign Out</span>
      </v-btn>
      <v-btn
        elevation="0"
        small
        color="#581E64"
        dark
        class="mr-2"
        to="/login"
        v-if="!isAuthenticated"
      >
        <v-icon dark>mdi-login-variant</v-icon>
        <span class="white--text">Sign In</span>
      </v-btn>
      <v-btn
        text
        small
        class="navbar-tile-btn"
        to="/signup"
        v-if="!isAuthenticated"
      >
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
        <a
          href="https://www.facebook.com/profile.php?id=100093481053524"
          target="_blank"
        >
          <v-btn small class="social-button mr-2">
            <v-icon class="social-icon" left>mdi-facebook</v-icon> Facebook
          </v-btn>
        </a>
        <a href="https://twitter.com/LearnCodeCrush" target="_blank">
          <v-btn small class="social-button mr-2">
            <v-icon class="social-icon" left>mdi-twitter</v-icon> Twitter
          </v-btn>
        </a>
        <a href="https://www.instagram.com/learncodecrush/" target="_blank">
          <v-btn small class="social-button mr-2">
            <v-icon class="social-icon" left>mdi-instagram</v-icon> Instagram
          </v-btn>
        </a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { auth, db, storage, firebase } from "../firebase";

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
      isSigningOut: false,
    };
  },
  methods: {
    checkIfUserAuthenticated() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.isAuthenticated = true;
          if (this.$route.path !== "/profile") {
            this.$router.push("/profile");
          }
        } else {
          this.isAuthenticated = false;
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
        }
      });
    },
    signOut() {
      this.isSigningOut = true;
      auth
        .signOut()
        .then(() => {
          this.isAuthenticated = false;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isSigningOut = false;
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
  width: 100%;
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