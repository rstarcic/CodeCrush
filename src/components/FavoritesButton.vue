<template>
  <v-container class="top-right-button">
    <v-btn class="mx-2" fab dark small color="#581E64" @click="toggleIcon">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { auth, db, storage, firebase } from "../../firebase";
export default {
  name: "FavoritesButton",
  data() {
    return {
      icon: "mdi-bookmark-outline", // Početna ikona
    };
  },
  methods: {
    toggleIcon() {
      // Provjera trenutne ikone i promjena na suprotnu
      if (this.icon === "mdi-bookmark-outline") {
        this.icon = "mdi-bookmark";
        const db = firebase.firestore()
        const userid = firebase.auth().currentUser.uid
        const favoritesRef = db.collection("users").doc(userid).collection("favorites")
        favoritesRef.add({
          myFavorites: ["markdown"]
        })
      } else {
        this.icon = "mdi-bookmark-outline";
      }
    },
  },
};
</script>

<style>
.top-right-button {
    position: absolute;
    top: 10px;
    left: 1320px;
}
</style>