<template>
    <background>
    <v-container fill-height fluid class="background">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card width="500px" outlined>
            <v-card-title class="text">Sign Up</v-card-title>
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
            <v-btn class="sign-in-btn rounded-pill" text to="/programming-language" color="#FFFFFF" @click="IsRegistered" :disabled="!IsFormValidate">SIGN IN</v-btn>
          </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</background>
</template>

<style>
.v-text-field {
    width: 300px;
}
.sign-in-btn {
  margin-bottom: 15px;
}
</style>
<script>
import background from '@/components/BackgroundComponent.vue'
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
    methods: {
      async IsRegistered() {
        const email = this.email;
        const password = this.password;
        try {
          const userCredential = await auth.signInWithEmailAndPassword(email, password);
          const user = userCredential.user;
          const first = this.first;
          const last = this.last;
          await this.saveAdditionalData(user, email, first, last);
          this.postActionMoveToView();
        } catch (error) {
          alert(error.message);
        }
      },
      postActionMoveToView() {
			this.$router.push({ path: "/programming-language" });
		  },
      IsIconPasswordToggled() {
        this.IsPasswordShowed = !this.IsPasswordShowed; 
      },
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