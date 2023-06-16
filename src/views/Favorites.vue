<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-container>
      <v-row align="center" justify="center" class="vrow">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 font-weight-thin mb-4">Favorites</h1>
          <h4 class="txth4">Choose your favorite lectures!</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
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

<script>
import BackgroundComponent from "../components/BackgroundComponent.vue";
import { auth, db, storage, firebase } from "../../firebase";

export default {
  data() {
    return {
      myFavorites: [],
    };
  },
  mounted() {
    const db = firebase.firestore();
    const userid = firebase.auth().currentUser.uid;
    const favoritesRef = db
      .collection("users")
      .doc(userid)
      .collection("favorites")
      .doc("SvsPITUYmTu7I6BYCmYm");
    favoritesRef.get().then((doc) => {
      const dataArray = [];
      const data = doc.data();
      dataArray.push({
        myFavorites: data.myFavorites,
      });
      this.myFavorites = dataArray;
    });
  },
  components: {
    BackgroundComponent,
  },
};
</script>