<template>
  <background>
  <v-container fill-height fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card width="500px" outlined>
          <v-card-title class="text">LOGIN</v-card-title>
          <v-card-subtitle class="text">Dear user, please login</v-card-subtitle>
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
            <v-btn class="sign-in-btn rounded-pill" text to="/programming-language" color="#FFFFFF" @click="LoggedIn">SIGN IN</v-btn>
          </v-form>
          <div class="password-class">
            <v-btn text x-small color="blue">Forgot password?</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </background>
</template>

<style>
.text {
    text-align: center;
    justify-content: center;
}
.v-text-field {
    width: 300px;
}
.sign-in-btn {
    background-color: #581E64;
    border-radius: 50px;
    height: 20px;
    width: 250px;
    padding: 15px;
    font-size: 16px;
}
.password-class {
  margin-bottom: 15px;
  margin-top: 10px;
}
</style>

<script>
import background from "@/components/BackgroundComponent.vue"
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
    methods: {
    async LoggedIn() {
        let email = this.email;
        let password = this.password;
        try {
        await auth.signInWithEmailAndPassword(email, password);
        this.$router.push("/programming-language");
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