<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-card class="profile-card">
      <v-navigation-drawer
        v-model="drawer"
        mini-variant
        mini-variant-width="55"
        permanent
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ firstName }} {{ lastName }}</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="data in settingsData"
            :key="data.title"
            link
            @click="setActiveSection(data.title)"
          >
            <v-list-item-icon>
              <v-icon>{{ data.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ data.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-card-text class="form-container">
        <template v-if="activeSection === 'Personal Information'">
          <h2>Edit your Personal Information</h2>
          <v-form>
            <v-text-field v-model="firstName" label="First name"></v-text-field>
            <v-text-field v-model="lastName" label="Last name"></v-text-field>
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
            ></v-text-field>
            <v-btn @click="saveChanges" color="primary">Save Changes</v-btn>
          </v-form>
        </template>
        <template v-else-if="activeSection === 'Account Settings'">
          <h2>Edit Account Settings</h2>
          <p>Here you can change your account settings,</p>

          <v-form class="form">
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
            <v-file-input
              v-model="avatar"
              type="file"
              label="Profile Image"
              accept="image/*"
              @change="handleFileUpload"
            ></v-file-input>
          </v-form>
          <v-btn @click="saveAccountSettings" color="primary"
            >Save Changes</v-btn
          >
        </template>
        <template v-if="activeSection === 'Delete Account'">
          <v-card>
            <v-card-title>Delete Account</v-card-title>
            <v-card-text>
              Are you sure you want to delete your account?
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="deleteAccount">Yes</v-btn>
              <v-btn text @click="cancelDeleteAccount">Cancel</v-btn>
            </v-card-actions>
          </v-card>
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
      avatar: null,
      firstName: "",
      lastName: "",
      email: "",
      uid: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      settingsData: [
        {
          title: "Personal Information",
          icon: "mdi-account",
        },
        { title: "Account Settings", icon: "mdi-cog" },
        { title: "Delete Account", icon: "mdi-delete" },
      ],
      activeSection: null,
    };
  },
  mounted() {
    this.fetchUserData(); // Metoda za dohvaćanje podataka o korisniku prilikom stvaranja komponente
  },
  components: {
    BackgroundComponent,
  },
  methods: {
    setActiveSection(title) {
      this.activeSection = title;
      this.drawer = false;
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
            this.avatar = userData.avatar;
            this.firstName = userData.firstName;
            this.lastName = userData.lastName;
            this.email = userData.email;
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
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        };
        try {
          await userRef.update(updatedData);
          console.log("Account settings saved successfully!");
        } catch (error) {
          console.error("Error updating account settings:", error);
        }
      }
    },
    deleteAccount() {
      const user = firebase.auth().currentUser;
      if (user) {
        user
          .delete()
          .then(() => {
            console.log("Account deleted successfully!");
            this.$router.push("/signup");
          })
          .catch((error) => {
            console.error("Error deleting account:", error);
          });
      }
    },
    confirmDeleteAccount() {
      this.activeRoute = "/delete";
    },
    cancelDeleteAccount() {
      this.showDeleteConfirmation = false;
    },
    handleFileUpload(event) {
      if (
        event &&
        event.target &&
        event.target.files &&
        event.target.files.length > 0
      ) {
        this.avatar = event.target.files[0];
      }
    },
    async saveAccountSettings() {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = db.collection("users").doc(userId);

        const updatedData = {};
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
            const snapshot = await imageRef.put(this.avatar);
            const imageUrl = await snapshot.ref.getDownloadURL();
            updatedData.avatar = imageUrl;
            console.log("Profile image uploaded successfully!");
            await userRef.update({ avatar: imageUrl });
            console.log("Avatar URL updated in Firestore!");
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
.profile-card {
  max-height: 600px;
  min-width: 500px;
  margin-bottom: 200px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  width: 100%;
  max-width: 400px;
}
.delete-card {
  margin-bottom: 30px;
}
</style>