<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-card class="profile">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        width="300px"
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-title
            >{{ user.firstName }} {{ user.lastName }}</v-list-item-title
          >

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="data in personalData"
            :key="data.title"
            link
            @click="navigate(data.route)"
          >
            <v-list-item-icon>
              <v-icon>{{ data.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ data.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link @click="deleteAccount">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Brisanje računa</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-card-text class="card-text">
        <template v-if="activeRoute === '/personal'">
          <h2>Uređivanje osobnih podataka</h2>
          <v-form>
            <v-text-field v-model="user.firstName" label="Ime"></v-text-field>
            <v-text-field
              v-model="user.lastName"
              label="Prezime"
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              type="email"
              label="Email"
            ></v-text-field>
            <v-btn @click="saveChanges" color="primary">Save Changes</v-btn>
          </v-form>
        </template>
        <template v-else-if="activeRoute === '/account'">
          <h2>Postavke računa</h2>
          <p>
            Ovdje možete mijenjati svoje postavke računa, kao što su lozinka,
            profilna slika i preferencije e-pošte.
          </p>

          <v-form>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              label="New Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <v-file-input v-model="avatar" label="Profile Image"></v-file-input>
          </v-form>
          <v-btn @click="saveChanges" color="primary">Save Changes</v-btn>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import { auth, db, storage, firebase } from "../../firebase";
export default {
  name: "Profile",
  data() {
    return {
      drawer: true,
      mini: false,

      user: {
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
        uid: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        avatar: null,
      },
      personalData: [
        { title: "Osobni podaci", icon: "mdi-account", route: "/personal" },
        { title: "Postavke računa", icon: "mdi-cog", route: "/account" },
      ],
      activeRoute: null,
    };
  },
  mounted() {
    this.fetchUserData(); // Metoda za dohvaćanje podataka o korisniku prilikom stvaranja komponente
  },
  components: {
    BackgroundComponent,
  },
  methods: {
    navigate(route) {
      this.activeRoute = route;
    },
    async fetchUserData() {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userId = user.uid;
          const db = firebase.firestore();
          const userSnapshot = await db.collection("users").doc(userId).get();
          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            this.user.avatar = userData.avatar;
            this.user.firstName = userData.firstName;
            this.user.lastName = userData.lastName;
            this.user.email = userData.email;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async saveChanges() {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = db.collection("users").doc(userId);

        const updatedData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
        };

        try {
          await userRef.update(updatedData);
          console.log("Document is successfully updated!");
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    },
    deleteAccount() {
      // Ova metoda se poziva kada korisnik klikne na "Brisanje računa"
      // Ovdje možete implementirati logiku za brisanje korisničkog računa i svih povezanih podataka
      // Primjer: Pozvati API za brisanje korisničkog računa
      // Nakon brisanja računa, možete izvršiti redirekciju na prijavu ili drugu odgovarajuću stranicu
    },
    async saveAccountSettings() {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = db.collection("users").doc(userId);

        const updatedData = {};

        // Update the password if a new password is provided
        if (
          this.newPassword &&
          this.confirmPassword &&
          this.newPassword === this.confirmPassword
        ) {
          try {
            await user.updatePassword(this.newPassword);
            console.log("Password updated successfully!");
          } catch (error) {
            console.error("Error updating password:", error);
          }
        }
        if (this.avatar) {
          try {
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`profile-images/${userId}`);
            await imageRef.put(this.avatar);
            const imageUrl = await imageRef.getDownloadURL();
            updatedData.avatar = imageUrl;
            console.log("Profile image updated successfully!");
          } catch (error) {
            console.error("Error updating profile image:", error);
          }
        }
        try {
          await userRef.update(updatedData);
          console.log("Account settings saved successfully!");
        } catch (error) {
          console.error("Error updating account settings:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.card-text {
  width: 300px;
  height: 400px;
  margin-bottom: 300px;
}
</style>