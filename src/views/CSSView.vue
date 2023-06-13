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
  
  
  <style>
.txth4 {
  font-size: 30px;
  font-weight: 70;
  color: #ffffff;
}
</style>
  
<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { auth, db, storage, firebase } from "../../firebase";
export default {
  data() {
    return {
      documentData: {},
      lessonTitles: [],
      toolbarTitle: "CSS Tutorial",
      languageRoute: "css",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
  methods: {
    async getCSSData() {
      const querySnapshot = await db
        .collection("css")
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
  },
};
</script>