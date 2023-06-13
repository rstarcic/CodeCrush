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
export default {
  data() {
    return {
      documentData: {},
      lessonTitles: [],
      toolbarTitle: "Markdown Tutorial",
      languageRoute: "markdown",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
  methods: {
    async getMDData() {
      const querySnapshot = await db
        .collection("markdown")
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

