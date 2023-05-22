<template>
    <v-container fill-height fluid class="background">
      <BackgroundComponent/>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card class="signup-card" outlined>
            <v-card-title class="signup-text">Sign Up</v-card-title>
            <v-card-subtitle class="signup-subtext">Dear user, please sign up</v-card-subtitle>
            <v-card-text class="card-text-border"></v-card-text>
            <v-form>
                <v-text-field
                v-model="first"
                label="First Name"
                dense outlined 
                ></v-text-field>
                <v-text-field
                v-model="last"
                label="Last Name"
                dense outlined 
                ></v-text-field>
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
          </v-form>
          <v-btn tile class="sign-in-btn rounded-lg" text to="/programming-language" style="color: #FFFFFF !important" @click="IsRegistered" :disabled="!IsFormValidate">SIGN UP</v-btn>
          <div class="divider-with-text">
            <span class="divider-line"></span>
            <span class="divider-text">or</span>
            <span class="divider-line"></span>
          </div>
          <v-btn tile color="continue-with-google-btn rounded-lg" @click="continueWithGoogle">
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
.signup-text, .signup-subtext {
  text-align: center;
  justify-content: center;
}
.v-text-field {
    width: 300px;
}
.sign-up-btn {
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
.divider-with-text {
  margin: 15px 0px;
}
.continue-with-google-btn {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: 250px;
  height: 35px !important;
  box-shadow: 1px;
}
.custom-icon {
  background-image: url('~@/assets/google.png');
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
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import BackgroundComponent from '@/components/BackgroundComponent.vue';
export default {
    data() {
        return {
            first: '',
            last: '',
            email: '',
            password: '',
            IsPasswordShowed: false,
        };
    },
    components: {
      BackgroundComponent,
    },
    methods: {
      async IsRegistered() {
        debugger;
			const email = this.email;
			const password = this.password;
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					debugger;
					// Signed in
					const user = userCredential.user;
					const first= this.first;
					const last = this.last;
					this.saveAdditionalData(user, email, first, last);
					this.postActionMoveToView();
				})
				.catch((error) => {
					debugger;
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(error, errorCode, errorMessage);
				});
      },
      postActionMoveToView() {
			this.$router.push({ path: "/programming-language" });
		  },
      IsIconPasswordToggled() {
        this.IsPasswordShowed = !this.IsPasswordShowed; 
      },
      continueWithGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      }
    },
    computed: {
      IsFormValidate() {
        const firstRegex = /^[A-Z][a-z]*$/;
        const lastRegex = /^[A-Z][a-z]*$/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
        return (
          this.first !== '' && firstRegex.test(this.first) &&
          this.last !== '' && lastRegex.test(this.last) &&
          this.email != '' && emailRegex.test(this.email) && 
          this.password != '' && passwordRegex.test(this.password)
        );   
    }    
},
};
</script>