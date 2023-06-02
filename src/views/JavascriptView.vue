<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <v-container>
      <v-row align="center" justify="center" class="vrow">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 font-weight-thin mb-4">
            {{ documentData.Title }}
          </h1>
          <h4 class="txth4">{{ documentData.Subtitle }}</h4>
          <p>{{ documentData.Content }}</p>
          <a :href="documentData.YouTubeURL" target="_blank"
            >Watch on YouTube</a
          >
        </v-col>
      </v-row>
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
      const querySnapshot = await db.collection("javascript").get();

      querySnapshot.forEach((documentSnapshot) => {
        debugger;
        const documentId = documentSnapshot.id;
        const documentData = documentSnapshot.data();

        console.log(documentId, " => ", documentData);
        console.log(querySnapshot);
      });
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