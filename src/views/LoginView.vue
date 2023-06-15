<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="login-card" outlined>
          <v-card-title class="login-text">LOGIN</v-card-title>
          <v-card-subtitle class="login-subtext"
            >Dear user, please login</v-card-subtitle
          >
          <v-card-text class="card-text-border"></v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              class="text-field"
              type="email"
              dense
              outlined
              label="Email"
              placeholder="Enter your email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              class="text-field"
              dense
              outlined
              label="Password"
              placeholder="Enter your password"
              hint="At least 8 characters"
              :type="IsPasswordShowed ? 'text' : 'password'"
            >
              <template v-slot:append>
                <v-btn icon @click="IsIconPasswordToggled()">
                  <v-icon>{{
                    IsPasswordShowed ? "mdi-eye" : "mdi-eye-off"
                  }}</v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-btn
              tile
              class="sign-in-btn rounded-lg"
              text
              color="#FFFFFF"
              @click="LoggedIn"
              >SIGN IN</v-btn
            >
          </v-form>
          <div class="password-class">
            <v-btn text x-small color="blue" @click="openPasswordResetDialog"
              >Forgot password?</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isPasswordResetDialogOpen"
      max-width="450px"
      outlined
      persistent
      class="dialog-class"
    >
      <v-card class="card-class">
        <v-card-title class="login-text">Reset Password</v-card-title>
        <v-card-subtitle
          >We will help you reset your password! An email will be on its way
          shortly.</v-card-subtitle
        >
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="resetEmail"
              class="text-field email-field"
              type="email"
              dense
              outlined
              label="Email"
              placeholder="Enter your email"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-lg reset-email-btn"
            text
            @click="PasswordResetEmail"
            >Send Reset Email</v-btn
          >
          <v-btn color="red" text @click="closePasswordResetDialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.login-card {
  width: 400px;
  padding: 16px;
}
.login-text,
.login-subtext {
  text-align: center;
  justify-content: center;
}
.text-field {
  width: 300px;
}
.sign-in-btn {
  background-color: #581e64;
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
.card-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
}
.email-field {
  margin-left: 25px !important;
  max-width: 300px;
}
.reset-email-btn {
  background-color: #884d94;
  color: #ffffff !important;
}
</style>

<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import { auth, db, storage, firebase } from "../../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      IsPasswordShowed: false,
      isPasswordResetDialogOpen: false,
      resetEmail: "",
    };
  },
  components: {
    BackgroundComponent,
  },
  methods: {
    async LoggedIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("Successful Login");
          this.$router.push({ path: "/profile" });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    IsIconPasswordToggled() {
      this.IsPasswordShowed = !this.IsPasswordShowed;
    },
    openPasswordResetDialog() {
      this.isPasswordResetDialogOpen = true;
    },
    closePasswordResetDialog() {
      this.isPasswordResetDialogOpen = false;
    },
    PasswordResetEmail() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.resetEmail)
        .then(() => {
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Eror code", errorCode);
          console.log("Error message", errorMessage);
        });
    },
  },
};
</script>
