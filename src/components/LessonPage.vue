<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <DropdownMenu
      :lessonTitles="lessonTitles"
      :toolbarTitle="toolbarTitle"
      :languageRoute="languageRoute"
    />
    <div class="lesson-container">
      <h1>{{ lessonData.Title }}</h1>
      <h4>{{ lessonData.Subtitle }}</h4>
      <p>{{ lessonData.Content }}</p>
      <code class="code-class">{{ lessonData.Example }}</code>
      <p>{{ lessonData.Content1 }}</p>
      <code class="code-class">{{ lessonData.Example1 }}</code>
      <p>{{ lessonData.Content2 }}</p>
      <code class="code-class">{{ lessonData.Example2 }}</code>
      <code>{{ lessonData.Example2 }}</code>
      <iframe
        width="500"
        height="315"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </v-container>
</template>

<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { auth, db, storage, firebase } from "../../firebase";
import { code } from "../plugins/vuetify";
export default {
  data() {
    return {
      lessonData: {},
      lessonTitles: [],
      toolbarTitle: "",
      languageRoute: "",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
  async mounted() {
    await this.fetchLessonData();
    await this.fetchLessonTitles();
  },
  computed: {
    youtubeEmbedUrl() {
      if (!this.lessonData.YouTubeURL) return "";
      const videoId = this.lessonData.YouTubeURL.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");

      if (ampersandPosition != -1) {
        return `https://www.youtube.com/embed/${videoId.substring(
          0,
          ampersandPosition
        )}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
  methods: {
    async fetchLessonTitles() {
      let collection;

      if (this.$route.path.includes("/javascript/")) {
        collection = db.collection("javascript").orderBy("id", "asc");
        this.toolbarTitle = "JavaScript Tutorial";
        this.languageRoute = "javascript";
      } else if (this.$route.path.includes("/html/")) {
        collection = db.collection("html").orderBy("id", "asc");
        this.toolbarTitle = "HTML Tutorial";
        this.languageRoute = "html";
      } else if (this.$route.path.includes("/css/")) {
        collection = db.collection("css").orderBy("id", "asc");
        this.toolbarTitle = "CSS Tutorial";
        this.languageRoute = "css";
      } else if (this.$route.path.includes("/markdown/")) {
        collection = db.collection("markdown").orderBy("id", "asc");
        this.toolbarTitle = "Markdown Tutorial";
        this.languageRoute = "markdown";
      } else {
        console.error("Collection is undefined");
        return;
      }

      try {
        const querySnapshot = await collection.get();
        const lessonTitles = [];

        querySnapshot.forEach((documentSnapshot) => {
          const documentData = documentSnapshot.data();
          const title = documentData.Title;
          lessonTitles.push(title);
        });

        this.lessonTitles = lessonTitles;
      } catch (error) {
        console.error("Error fetching lesson titles:", error);
      }
    },
    async fetchLessonData() {
      const lessonTitle = this.$route.params.title;
      let collection;

      if (this.$route.path.includes("/javascript/")) {
        collection = db.collection("javascript");
      } else if (this.$route.path.includes("/html/")) {
        collection = db.collection("html");
      } else if (this.$route.path.includes("/css/")) {
        collection = db.collection("css");
      } else if (this.$route.path.includes("/markdown/")) {
        collection = db.collection("markdown");
      } else {
        console.error("Collection is undefined");
        return;
      }

      try {
        const querySnapshot = await collection
          .where("Title", "==", lessonTitle)
          .get();

        querySnapshot.forEach((doc) => {
          const lessonData = doc.data();
          this.lessonData = {
            Title: lessonData.Title,
            Subtitle: lessonData.Subtitle,
            Content: lessonData.Content,
            Content1: lessonData.Content1,
            Content2: lessonData.Content2,
            Example: lessonData.Example,
            Example1: lessonData.Example1,
            Example2: lessonData.Example2,
            YouTubeURL: lessonData.YouTubeURL,
          };
        });
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    },
  },
  watch: {
    $route() {
      this.fetchLessonData();
    },
  },
};
</script>

<style scoped>
.lesson-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
}
.code-class {
  white-space: pre-wrap;
}
</style>