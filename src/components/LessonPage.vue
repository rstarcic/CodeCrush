<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
    <DropdownMenu
      :lessonTitles="lessonTitles"
      :toolbarTitle="toolbarTitle"
      :languageRoute="languageRoute"
    />
    <v-container class="top-right-button">
      <v-btn class="mx-2" fab dark small color="#581E64" @click="toggleIcon">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </v-container>
    <div class="lesson-container">
      <h1>{{ lessonData.Title }}</h1>
      <h4>{{ lessonData.Subtitle }}</h4>
      <p>{{ lessonData.IntroParagraph }}</p>
      <h4 v-if="!lessonData.Subtitle1">Practice</h4>
      <h4>{{ lessonData.Subtitle1 }}</h4>
      <p>{{ lessonData.Paragraph1 }}</p>
      <h4 v-if="lessonData.CodeExample1">Code example 1</h4>
      <div
        class="text-left"
        v-for="(example1, index) in lessonData.CodeExample1"
        :key="'example1-' + index"
      >
        <code class="code-class">{{ example1 }}</code>
      </div>
      <v-card class="explanation-card" v-if="lessonData.CodeExplanation1">
        <v-icon class="icon-explanation-title" color="#ffdf00"
          >mdi-lightbulb</v-icon
        >
        <h4>Code explanation</h4>
        <p>
          {{ lessonData.CodeExplanation1 }}
        </p>
      </v-card>
      <p>{{ lessonData.Paragraph2 }}</p>
      <h4 v-if="lessonData.CodeExample2">Code example 2</h4>
      <div
        v-for="(example2, index) in lessonData.CodeExample2"
        :key="'example2-' + index"
      >
        <code class="code-class">{{ example2 }}</code>
      </div>
      <v-card class="explanation-card" v-if="lessonData.CodeExplanation2">
        <v-icon class="icon-explanation-title" color="#ffdf00"
          >mdi-lightbulb</v-icon
        >
        <h4>Code explanation</h4>
        <p>
          {{ lessonData.CodeExplanation2 }}
        </p>
      </v-card>
      <p>{{ lessonData.Paragraph3 }}</p>
      <h4 v-if="lessonData.CodeExample3">Code example 3</h4>
      <div
        v-for="(example3, index) in lessonData.CodeExample3"
        :key="'example3-' + index"
      >
        <code class="code-class">{{ example3 }}</code>
      </div>
      <v-card class="explanation-card" v-if="lessonData.CodeExplanation3">
        <v-icon class="icon-explanation-title" color="#ffdf00"
          >mdi-lightbulb</v-icon
        >
        <h4>Code explanation</h4>
        <p>
          {{ lessonData.CodeExplanation3 }}
        </p>
      </v-card>
      <h4>{{ lessonData.Subtitle2 }}</h4>
      <iframe
        width="500"
        height="315"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <h4 v-if="lessonData.ConclusionParagraph">What we have learned</h4>
      <p>{{ lessonData.ConclusionParagraph }}</p>
    </div>
  </v-container>
</template>

<script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { auth, db, storage, firebase } from "../../firebase";
export default {
  data() {
    return {
      lessonData: {},
      lessonTitles: [],
      toolbarTitle: "",
      languageRoute: "",
      icon: "mdi-bookmark-outline",
      isFavorited: false,
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
  async mounted() {
    await this.fetchLessonData();
    await this.fetchLessonTitles();
    await this.checkIfFavorited();
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
            IntroParagraph: lessonData.IntroParagraph,
            Subtitle1: lessonData.Subtitle1,
            Paragraph1: lessonData.Paragraph1,
            CodeExample1: lessonData.CodeExample1,
            CodeExplanation1: lessonData.CodeExplanation1,
            Paragraph2: lessonData.Paragraph2,
            CodeExample2: lessonData.CodeExample2,
            CodeExplanation2: lessonData.CodeExplanation2,
            Paragraph3: lessonData.Paragraph3,
            CodeExample3: lessonData.CodeExample3,
            CodeExplanation3: lessonData.CodeExplanation3,
            Subtitle2: lessonData.Subtitle2,
            YouTubeURL: lessonData.YouTubeURL,
            ConclusionParagraph: lessonData.ConclusionParagraph,
          };
        });
        // Provjera je li lekcija spremljena u favoritima
        const userId = firebase.auth().currentUser.uid;
        const favoritesRef = db
          .collection("users")
          .doc(userId)
          .collection("favorites");
        const favoritesSnapshot = await favoritesRef.get();
        let isLessonFavorite = false;

        favoritesSnapshot.forEach((doc) => {
          const favoritesData = doc.data();
          const myFavorites = favoritesData.myFavorites || [];
          if (myFavorites.includes(lessonTitle)) {
            isLessonFavorite = true;
          }
        });

        if (isLessonFavorite) {
          this.icon = "mdi-bookmark"; // Promjena ikone ako je lekcija spremljena
        } else {
          this.icon = "mdi-bookmark-outline"; // Vraćanje na početnu ikonu ako lekcija nije spremljena
        }
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    },
    async toggleIcon() {
      const db = firebase.firestore();
      const userid = firebase.auth().currentUser.uid;
      const favoritesCollection = db
        .collection("users")
        .doc(userid)
        .collection("favorites");

      if (!this.isFavorited) {
        this.icon = "mdi-bookmark";
        this.isFavorited = true;
        favoritesCollection.add({
          language: this.languageRoute,
          title: this.lessonData.Title,
        });
      } else {
        this.icon = "mdi-bookmark-outline";
        this.isFavorited = false;
        const querySnapshot = await favoritesCollection
          .where("title", "==", this.lessonData.Title)
          .get();
        querySnapshot.forEach(async (documentSnapshot) => {
          const docRef = favoritesCollection.doc(documentSnapshot.id);
          await docRef.delete();
        });
      }
    },
    async checkIfFavorited() {
      const db = firebase.firestore();
      const userid = firebase.auth().currentUser.uid;
      const favoritesCollection = db
        .collection("users")
        .doc(userid)
        .collection("favorites");

      try {
        const querySnapshot = await favoritesCollection
          .where("title", "==", this.lessonData.Title)
          .get();

        if (!querySnapshot.empty) {
          this.isFavorited = true;
          this.icon = "mdi-bookmark";
        } else {
          this.isFavorited = false;
          this.icon = "mdi-bookmark-outline";
        }
      } catch (error) {
        console.error("Error fetching favorites data:", error);
      }
    },
  },
  watch: {
    $route() {
      this.fetchLessonData();
      this.fetchLessonTitles();
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
  margin: 30px auto;
  margin-bottom: 50px;
}
.lesson-container h1 {
  font-size: 26px;
  color: #ffffff;
}
.lesson-container p {
  font-size: 16px;
  color: #ffffff;
  padding-top: 15px;
}
.lesson-container h4 {
  font-size: 18px;
  padding-top: 8px;
  padding-bottom: 5px;
  color: #ffffff;
}
.code-class {
  display: inline-block;
  width: 400px;
  padding: 3px;
  border-radius: 0px;
  background-color: black;
  color: #ffdf00 !important;
}

.top-right-button {
  position: absolute;
  top: 10px;
  left: 1300px;
}
.explanation-card {
  margin: 15px 0;
  padding: 15px;
  background-color: #581e64;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: auto;
  color: pink;
}
.icon-explanation-title {
  display: flex;
  justify-content: flex-end;
}
</style>