<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent/>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="login-card" outlined>
          <v-card-title class="login-text">LOGIN</v-card-title>
          <v-card-subtitle class="login-subtext">Dear user, please login</v-card-subtitle>
          <v-card-text class="card-text-border"></v-card-text>
          <v-form>
            <v-text-field v-model="email" 
            class="text-field" 
            type="text" 
            dense outlined 
            label="Email"
            placeholder="Enter your email" 
            ></v-text-field>
            <v-text-field v-model="password" 
            class="text-field" 
            dense outlined 
            label="Password"
            placeholder="Enter your password" 
            hint="At least 8 characters" 
            :type="IsPasswordShowed ? 'text' : 'password'"
            >
            <template v-slot:append>
                <v-btn icon @click="IsIconPasswordToggled">
                <v-icon>{{ IsPasswordShowed ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </v-btn>
            </template>
            </v-text-field>
            <v-btn tile class="sign-in-btn rounded-lg" text to="/programming-language" color="#FFFFFF" @click="LoggedIn">SIGN IN</v-btn>
          </v-form>
          <div class="password-class">
            <v-btn text x-small color="blue">Forgot password?</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.login-card {
  width: 400px;
  padding: 16px;
}
.login-text, .login-subtext {
  text-align: center;
  justify-content: center;
}
.text-field {
  width: 300px;
}
.sign-in-btn {
  background-color: #581E64;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  height: 35px;
  width: 250px;
  padding: 15px;
}
.password-class {
  margin-bottom: 15px;
  margin-top: 10px;
}
</style>

<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue"
import {
	auth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "../../firebase.js";

export default {
    data() {
        return {
            email:'',
            password:'',
            IsPasswordShowed: false,
        };
    },
    components: {
      BackgroundComponent,
    },
    methods: {
      async LoggedIn() {
      let email = this.email;
      let password = this.password;
      
      try {
        await auth.signInWithEmailAndPassword(email, password);
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.$router.push("/programming-language");
          } else {
            alert("Korisnik nije autentificiran.");
          }
        });
      } catch (error) {
        alert(error.message);
      }
    },
    IsIconPasswordToggled() {
        this.IsPasswordShowed = !this.IsPasswordShowed; 
    }
  }
};
</script>