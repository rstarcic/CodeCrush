<template>
  <v-container fill-height fluid class="background">
    <v-navigation-drawer permanent color="#581E64" class="custom-drawer">
      <v-toolbar color="#581e64" class="toolbar-class">
        <v-toolbar-title class="menu-title">
          {{ toolbarTitle }}
        </v-toolbar-title>
      </v-toolbar>
      <v-list dense class="custom-list" color="#581E64">
        <v-list-item
          v-for="(title, id) in titleFavorites"
          :key="id"
          @click="selectLesson(language, title)"
          :class="isSelectedLesson(title)"
          class="lesson-item"
        >
          <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-container>
      <v-row align="center" justify="center" class="vrow">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 font-weight-thin mb-4">Favorites</h1>
          <h4 class="txth4">Choose your favorite lectures!</h4>
          <h5 class="txth4">
            Here You can see all lessons that You choose as Your favorites
          </h5>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import BackgroundComponent from "../components/BackgroundComponent.vue";
import DropdownMenu from "../components/DropdownMenu.vue";
import firebase from "firebase/app";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      toolbarTitle: "Favorites",
      titleFavorites: [], // Array to store favorite titles
      myFavoritesData: [], // Array to store favorite data objects
      language: "", // Add the language property
      selectedLesson: "", // Add the selectedLesson property
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
    RouterLink,
  },
  mounted() {
    const userId = firebase.auth().currentUser.uid;
    const favoritesRef = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("favorites");

    favoritesRef.get().then((querySnapshot) => {
      const favoritesArray = [];
      const favoritesDataArray = [];
      querySnapshot.forEach((doc) => {
        const favoritesData = doc.data();
        const title = favoritesData?.title || "";
        const language = favoritesData?.language || "";
        const id = doc.id;
        favoritesArray.push(title);
        favoritesDataArray.push({ title, language, id });
        console.log(favoritesDataArray);
      });

      this.titleFavorites = favoritesArray;
      this.myFavoritesData = favoritesDataArray;

      if (favoritesDataArray.length > 0) {
        this.language = favoritesDataArray[0].language; // Update the language property with the first item's language
        this.selectedLesson = favoritesDataArray[0].title;
        console.log("Language: ", this.language);
        console.log("Title: ", this.selectedLesson);
      }
    });
  },
  methods: {
    isSelectedLesson(title) {
      return {
        "selected-lesson": title === this.selectedLesson,
      };
    },
    selectLesson(language, title) {
      this.language = language; // Update the language property
      this.selectedLesson = title;
      console.log("Language: ", this.language);
      console.log("Title: ", this.selectedLesson);
      const route = this.getLessonRoute(this.language, this.selectedLesson);
      if (route) {
        const params = { language: this.language };
        this.$router.push({ path: route, params });
      } else {
        console.error("Invalid language: ", this.language);
      }
    },
    getLessonRoute(language, title) {
      let route;
      debugger;
      console.log("language: ", this.language);
      if (language.trim() === "javascript") {
        route = `/javascript/${encodeURIComponent(title)}`;
      } else if (language.trim() === "html") {
        route = `/html/${encodeURIComponent(title)}`;
      } else if (language.trim() === "css") {
        route = `/css/${encodeURIComponent(title)}`;
      } else if (language.trim() === "markdown") {
        route = `/markdown/${encodeURIComponent(title)}`;
      }
      return route;
    },
  },
};
</script>

<style scoped>
.txth4 {
  font-size: 30px;
  font-weight: 70;
  color: #ffffff;
}
.vrow {
  margin-bottom: 500px;
}
</style>


