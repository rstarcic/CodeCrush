<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="signup-card" outlined>
          <v-card-title class="signup-text">Sign Up</v-card-title>
          <v-card-subtitle class="signup-subtext"
            >Dear user, please sign up</v-card-subtitle
          >
          <v-card-text class="card-text-border"></v-card-text>
          <v-form>
            <v-text-field
              v-model="firstName"
              label="First Name"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="email"
              class="text-field"
              type="text"
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
                <v-btn icon @click="IsIconPasswordToggled">
                  <v-icon>{{
                    IsPasswordShowed ? "mdi-eye" : "mdi-eye-off"
                  }}</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
          <v-btn
            tile
            class="sign-in-btn rounded-lg"
            text
            style="color: #ffffff !important"
            @click="IsRegistered"
            :disabled="!IsFormValidate"
            >SIGN UP</v-btn
          >
          <div class="divider-with-text">
            <span class="divider-line"></span>
            <span class="divider-text">or</span>
            <span class="divider-line"></span>
          </div>
          <v-btn
            tile
            color="continue-with-google-btn rounded-lg"
            @click="continueWithGoogle"
          >
            <v-icon class="custom-icon"></v-icon> Continue with Google
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.signup-card {
  width: 450px;
  padding: 10px 0px 30px 0px;
  margin-top: 25px;
  margin-bottom: 100px;
}
.signup-text,
.signup-subtext {
  text-align: center;
  justify-content: center;
}
.v-text-field {
  width: 300px;
}
.sign-up-btn {
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
.divider-with-text {
  margin: 15px 0px;
}
.continue-with-google-btn {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  width: 250px;
  height: 35px !important;
  box-shadow: 1px;
}
.custom-icon {
  background-image: url("~@/assets/google.png");
  background-size: cover;
  width: 24px;
  height: 24px;
  margin-right: 3px;
}
.v-text {
  font-size: 10px;
}
.divider-with-text {
  display: flex;
  justify-content: center;
}
.divider-line {
  width: 100px;
  height: 1px;
  background-color: rgb(46, 44, 44);
  margin: 11px;
}
.divider-text {
  margin: 0 8px;
}
</style>

<script>
import { auth, db, storage, firebase } from "../../firebase";
import BackgroundComponent from "@/components/BackgroundComponent.vue";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      IsPasswordShowed: false,
    };
  },
  components: {
    BackgroundComponent,
  },
  methods: {
    IsRegistered(firstName, lastName, email, password) {
      firstName = this.firstName;
      lastName = this.lastName;
      email = this.email;
      password = this.password;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            const usersRef = db.collection("users").doc(user.uid);
            usersRef.set({
              firstName: firstName,
              lastName: lastName,
              email: email,
            });
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            this.emailError = true;
            this.loading = false;
            this.email = "";
          } else if (error.code === "auth/weak-password") {
            this.passError = true;
            this.loading = false;
            this.password = "";
          } else if (error.code === "auth/email-already-in-use") {
            this.emailExists = true;
            this.loading = false;
            this.email = "";
          }
        });
    },
    postActionMoveToView() {
      this.$router.push({ path: "/profile" });
    },
    IsIconPasswordToggled() {
      this.IsPasswordShowed = !this.IsPasswordShowed;
    },
    continueWithGoogle() {
      const authInstance = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();
      authInstance
        .signInWithPopup(provider)
        .then((result) => {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.credential.idToken,
            result.credential.accessToken
          );
          const token = credential.accessToken;
          const user = result.user;
          console.log("Token:", token);
          console.log("User:", user);
          console.log("Sign-in with Google successful");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          console.log("Sign-in with Google failed:", errorCode, errorMessage);
          const credential = firebase.auth.GoogleAuthProvider.credential(
            error.credential.idToken,
            error.credential.accessToken
          );
        });
    },
  },
  computed: {
    IsFormValidate() {
      const firstRegex = /^[A-ZŠĐČĆŽ][a-zšđčćž]*$/;
      const lastRegex = /^[A-ZŠĐČĆŽ][a-zšđčćž]*$/;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
      return (
        this.firstName !== "" &&
        firstRegex.test(this.firstName) &&
        this.lastName !== "" &&
        lastRegex.test(this.lastName) &&
        this.email !== "" &&
        emailRegex.test(this.email) &&
        this.password !== "" &&
        passwordRegex.test(this.password)
      );
    },
  },
};
</script>