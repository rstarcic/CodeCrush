<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-card class="profile-card">
      <v-navigation-drawer
        v-model="drawer"
        mini-variant
        mini-variant-width="55"
        permanent
        class="drawer"
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
              <v-icon color="#884D94">{{ data.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title color="#884D94">{{
                data.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-card-text class="form-container">
        <template v-if="activeSection === 'Personal Information'">
          <h2>Edit your Personal Information</h2>
          <p>Here you can change your personal Information.</p>
          <v-form>
            <v-text-field v-model="firstName" label="First name"></v-text-field>
            <v-text-field v-model="lastName" label="Last name"></v-text-field>
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
            ></v-text-field>
            <v-btn
              @click="saveChanges"
              tile
              class="save-changes-btn rounded-lg ma-5"
              text
              color="#FFFFFF"
              >Save Changes</v-btn
            >
          </v-form>
        </template>
        <template v-else-if="activeSection === 'Account Settings'">
          <h2>Edit Account Settings</h2>
          <p>Here you can change your account settings.</p>

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
            <v-file-input
              prepend-icon="mdi-camera"
              v-model="avatar"
              type="file"
              label="Profile Image"
              accept="image/*"
              @change="handleFileUpload"
            ></v-file-input>
          </v-form>
          <v-btn
            @click="saveAccountSettings"
            tile
            class="save-changes-btn rounded-lg"
            text
            color="#FFFFFF"
            >Save Changes</v-btn
          >
        </template>
        <template v-if="activeSection === 'Delete Account'">
          <div class="delete-section">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account?</p>
            <v-card-actions>
              <v-btn
                class="rounded-lg confirm-btn"
                color="#884D94"
                @click="deleteAccount"
                >Yes</v-btn
              >
              <v-btn class="rounded-lg cancel-btn" @click="cancelDeleteAccount"
                >Cancel</v-btn
              >
            </v-card-actions>
          </div>
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
      activeSection: "Personal Information",
    };
  },
  mounted() {
    this.fetchUserData();
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
    cancelDeleteAccount() {
      this.activeSection = "Personal Information";
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
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
.profile-card {
  margin-top: 50px;
  min-height: 600px;
  min-width: 400px;
  margin-bottom: 100px;
  padding: 5px 16px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 450px;
  overflow: auto;
}
.v-text-field {
  width: 300px;
}

.delete-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.save-changes-btn {
  background-color: #581e64;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 13px;
  cursor: pointer;
  height: 35px;
  width: 250px;
  padding: 15px;
}
.confirm-btn {
  color: #ffffff;
}
.cancel-btn {
  color: red;
}
</style>