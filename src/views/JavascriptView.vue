<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-container>
      <DropdownMenu
        :lessonTitles="lessonTitles"
        :toolbarTitle="toolbarTitle"
        :languageRoute="languageRoute"
      />
    </v-container>
  </v-container>
</template>
<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { auth, db, storage, firebase } from "../../firebase";
export default {
  data() {
    return {
      documentData: {},
      lessonTitles: [],
      toolbarTitle: "JavaScript Tutorial",
      languageRoute: "javascript",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
  async mounted() {
    await this.getJSData();
  },
  methods: {
    async getJSData() {
      const querySnapshot = await db
        .collection("javascript")
        .orderBy("id", "asc")
        .get();
      const lessonTitles = [];

      querySnapshot.forEach((documentSnapshot) => {
        const documentId = documentSnapshot.id;
        const documentData = documentSnapshot.data();
        const title = documentData.Title;
        lessonTitles.push(title);
        console.log(documentId, " => ", documentData);
        console.log(querySnapshot);
      });
      this.lessonTitles = lessonTitles;
    },
    catch(error) {
      console.error(error);
    },
    //1. idi po podatke
    //koje? -
    //kako?
    //2. kada podaci stignu, pripremi ih za prikaz
    //kako?
  },
};
</script>