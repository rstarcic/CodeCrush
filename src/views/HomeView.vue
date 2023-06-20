<template>
  <div>
    <v-parallax dark src="@/assets/Background.png">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h3 font-weight-thin mb-4">
            Crush your coding skills with Code Crush!
          </h1>
          <h4 class="subheading">
            Discover the power of programming and create your digital future!
          </h4>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-card
          v-for="info in information"
          :key="info.id"
          elevation="2"
          class="info-cards"
        >
          <v-col cols="12">
            <v-card-text>
              <div class="icon-text-container">
                <div class="icon-container">
                  <v-icon class="icon-up" color="#4b408b">{{
                    info.icon
                  }}</v-icon>
                </div>
                <h2 class="info-text">{{ info.aboutWebsite }}</h2>
              </div>
            </v-card-text>
          </v-col>
        </v-card>
      </v-row>
    </v-parallax>
    <v-container fluid class="main-container">
      <v-card
        v-for="card in cards"
        :key="card.id"
        elevation="2"
        class="mx-auto"
        max-width="700"
        v-ripple
      >
        <v-row>
          <v-col cols="6">
            <v-img
              :src="card.Image"
              accept="image/*"
              class="img-margin"
            ></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <h2 class="title-text">
                {{ card.Title }}
              </h2>
              <p class="description-text">{{ card.Description }}</p>
              <div class="learning-time">
                <v-icon class="learning-time-icon">mdi-clock-outline</v-icon>
                <span class="learning-time-text">{{ card.learningTime }}</span>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
        <v-card tile outlined class="custom-card" color="#4b408b">
          <v-col cols="12"> </v-col>
        </v-card>
      </v-card>
      <div class="rectangle">
        <h1 class="heading-class">Hey, you!</h1>
        <p>
          Picture this: you're sitting at your computer,
          <b>fingers poised on the keyboard</b>, ready to type your way into a
          <b>world of creativity and problem-solving</b>. With each keystroke,
          you unlock the door to a universe where ideas take shape and
          imagination knows <b>no limits</b>. That's where
          <b>CodeCrush</b> comes to the rescue, ready to be your trusty guide in
          this awe-inspiring journey.
        </p>
        <v-btn elevation="1" tile outlined class="signup-button" to="/signup"
          >Get Started</v-btn
        >
      </div>
      <div class="letter-container">
        <v-row class="heading-alignment">
          <v-col cols="12">
            <h2 class="heading">
              Firsthand Experience: What users say about our application
            </h2>
          </v-col>
        </v-row>
        <v-row class="letter-cards">
          <v-card
            v-for="userOpinion in opinions"
            :key="userOpinion.id"
            elevation="2"
            class="letter-card"
            color="yellow lighten-3"
          >
            <v-col cols="12">
              <v-card-text>
                <v-icon size="32" color="black">mdi-format-quote-open</v-icon>
                <h2 class="letter-content">{{ userOpinion.opinion }}</h2>
                <v-icon size="32" color="black">mdi-format-quote-close</v-icon>
                <p class="letter-signature">{{ userOpinion.initials }}</p>
              </v-card-text>
            </v-col>
          </v-card>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "Home",
  data() {
    return {
      cards: [],
      cardData: {},
      information: [],
      infoData: {},
      opinions: [],
      opinionData: {},
    };
  },
  methods: {
    async loadData() {
      try {
        await this.fetchCards();
        await this.fetchInfo();
        await this.fetchOpinion();
      } catch (error) {
        console.log("Error fetching cards:", error);
      }
    },
    async fetchOpinion() {
      db.collection("opinion")
        .orderBy("id", "asc")
        .get()
        .then((querySnapshot) => {
          const opinions = [];
          querySnapshot.forEach((doc) => {
            const opinionData = doc.data();
            const userOpinion = {
              initials: opinionData.initials,
              opinion: opinionData.opinion,
            };
            opinions.push(userOpinion);
          });
          this.opinions = opinions;
        })
        .catch((error) => {
          console.log("Error fetching cards:", error);
        });
    },
    async fetchInfo() {
      db.collection("information")
        .orderBy("id", "asc")
        .get()
        .then((querySnapshot) => {
          const information = [];
          querySnapshot.forEach((doc) => {
            const infoData = doc.data();
            const info = {
              icon: infoData.icon,
              aboutWebsite: infoData.aboutWebsite,
            };
            information.push(info);
          });
          this.information = information;
        })
        .catch((error) => {
          console.log("Error fetching cards:", error);
        });
    },
    async fetchCards() {
      db.collection("cards")
        .orderBy("id", "asc")
        .get()
        .then((querySnapshot) => {
          const cards = [];
          querySnapshot.forEach((doc) => {
            const cardData = doc.data();
            const card = {
              Title: cardData.Title,
              Description: cardData.Description,
              Image: cardData.Image,
              learningTime: cardData.learningTime,
            };
            cards.push(card);
          });
          this.cards = cards;
        })
        .catch((error) => {
          console.log("Error fetching cards:", error);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.main-container {
  background-color: #581e64;
}
.text-center {
  font-family: "Arial", sans-serif;
  font-size: 15px;
  color: #ffffff;
  margin-top: 50px;
}

.subheading {
  font-size: 28px;
  font-weight: 70;
  color: #ffffff;
}

.info-cards {
  height: 170px;
  width: 170px;
  border-radius: 20px;
  margin-right: 20px;
  padding: 15px 10px;
  margin-bottom: 35px;
  color: #ffffff;
}

.icon-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.icon-up {
  margin-top: -15px;
  height: 15px;
  margin-bottom: 5px !important;
  font-size: 29px !important;
}
.info-text {
  font-size: 14px;
  margin: 0;
  color: #000000 !important;
  line-height: 1.2;
}

.mx-auto {
  margin-bottom: 20px;
  margin-top: 30px;
}

.img-margin {
  max-width: 500px;
  margin-top: 55px;
  margin-left: 20px;
}

.title-text {
  margin-bottom: 10px;
  font-size: 20px;
}
.learning-time {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.learning-time-icon {
  font-size: 16px;
  margin-right: 5px;
}

.learning-time-text {
  font-size: 14px;
  font-weight: bold;
}

.description-text {
  color: black !important;
  font-size: 15px;
}

.rectangle {
  position: absolute;
  left: 0;
  right: 0;
  height: 250px;
  background-color: #ffffff;
  padding: 20px 100px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.rectangle:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
}

.rectangle h1 {
  font-size: 30px;
  margin-bottom: 10px;
  color: #000000;
}

.rectangle p {
  font-size: 20px;
  color: #000000;
}

.signup-button {
  background-color: #581e64;
  color: #ffffff !important;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
}

.letter-cards {
  display: flex;
  align-items: center;
  justify-content: center;
}
.letter-cards v-icon:first-child {
  margin-right: 10px;
}
.letter-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 300px;
  margin: 10px 20px 100px 0px;
  padding: 10px;
}

.letter-content {
  font-size: 15px;
  text-align: center;
}

.letter-signature {
  font-style: italic;
  text-align: right;
}

.heading-alignment {
  justify-content: center;
  text-align: center;
}

.heading {
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffffff;
}

.letter-container {
  margin-top: 350px;
}
.heading-class {
  font-size: 27px !important;
}

.rectangle p {
  font-size: 18px !important;
}
</style>