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
          :key="info.aboutWebsite"
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
        :key="card.title"
        elevation="2"
        class="mx-auto"
        max-width="700"
        v-ripple
      >
        <v-row>
          <v-col cols="6">
            <v-img :src="card.image" class="img-margin"></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <h2 style="margin-bottom: 10px">{{ card.title }}</h2>
              <p class="description-text">{{ card.description }}</p>
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
        <h1>Hey, you!</h1>
        <p>
          Picture this: you're sitting at your computer,
          <b>fingers poised on the keyboard</b>, ready to type your way into a
          <b>world of creativity and problem-solving</b>. With each keystroke,
          you unlock the door to a universe where ideas take shape and
          imagination knows <b>no limits</b>. That's where
          <b>CodeCrush</b> comes to the rescue, ready to be your trusty guide in
          this awe-inspiring journey.
        </p>
        <v-btn elevation="2" outlined class="signup-button" to="/signup"
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
            v-for="user in userOpinion"
            :key="user.initials"
            elevation="2"
            class="letter-card"
            color="yellow lighten-3"
          >
            <v-col cols="12">
              <v-card-text>
                <v-icon size="32" color="black">mdi-format-quote-open</v-icon>
                <h2 class="letter-content">{{ user.opinion }}</h2>
                <v-icon size="32" color="black">mdi-format-quote-close</v-icon>
                <p class="letter-signature">{{ user.initials }}</p>
              </v-card-text>
            </v-col>
          </v-card>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

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
  font-size: 30px;
  font-weight: 70;
  color: #ffffff;
}

.info-cards {
  height: 200px;
  width: 200px;
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
  color: #921946;
}
.info-text {
  font-size: 16px;
  margin: 0;
  color: #000000 !important;
}

.mx-auto {
  margin-bottom: 20px;
  margin-top: 30px;
}

.img-margin {
  margin-top: 25px;
  margin-left: 20px;
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
  background-color: white;
  color: #000;
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
  font-size: 30px;
  margin-bottom: 10px;
  color: #ffffff;
}

.letter-container {
  margin-top: 350px;
}
</style>

<script>
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          title: "HTML: The Language of Web Structure",
          description:
            "HTML (Hypertext Markup Language) forms the backbone of web pages, defining the structure and organization of content. Mastering HTML allows you to create well-structured websites with headings, paragraphs, images, and links. With HTML, you can create accessible and semantically meaningful web pages, improving user experience and search engine optimization.",
          image:
            "https://cdn.pixabay.com/photo/2017/07/31/14/45/code-2558220_960_720.jpg",
          learningTime: "1-2 weeks",
        },
        {
          title: "CSS: Bringing Style to the Web",
          description:
            "CSS (Cascading Style Sheets) is the language used to add visual styling and layout to HTML elements. Learning CSS enables you to apply colors, fonts, spacing, and responsive design to your web pages. With CSS, you can create stunning and professional-looking websites that adapt beautifully to different devices and screen sizes.",
          image:
            "https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg",
          learningTime: "2-3 weeks",
        },
        {
          title: "JavaScript: Powering Interactive Web Experiences",
          description:
            "JavaScript is a versatile programming language that adds interactivity and functionality to web pages. With JavaScript, you can create dynamic elements, handle user interactions, and build complex web applications. Learning JavaScript empowers you to create interactive forms, perform calculations, make API requests, and much more.",
          image:
            "https://cdn.pixabay.com/photo/2020/12/27/12/31/programmer-5863772_960_720.jpg",
          learningTime: "4-6 weeks",
        },
        {
          title: "Markdown: Simplifying Documentation",
          description:
            "Markdown is a lightweight markup language used for writing documentation, blog posts, and README files. With Markdown, you can format text, create headings, lists, tables, and insert images and links, all with simple syntax. Markdown is widely supported across platforms and can be easily converted to HTML, PDF, or other formats.",
          image:
            "https://d33wubrfki0l68.cloudfront.net/e3541891e3115642d605aca52e4556d397e95c6f/4e2ba/images/quicktourexample.png",
          learningTime: "1-2 days",
        },
      ],
      information: [
        {
          icon: "mdi-book",
          aboutWebsite: "Use Top Learning Resources for Programming Languages.",
        },
        {
          icon: "mdi-lightbulb",
          aboutWebsite:
            "Take valuable lessons in various programming languages.",
        },
        {
          icon: "mdi-pencil",
          aboutWebsite: "Take quizzes for each lesson.",
        },
        {
          icon: "mdi-notebook-check",
          aboutWebsite: "Crush the final exam for each programming language.",
        },
      ],
      userOpinion: [
        {
          initials: "Olivila Wilson",
          opinion:
            "CodeCrush has been a true game-changer for me! The amount of progress I have made is mind-blowing.",
        },
        {
          initials: "dr. Bruce Banner",
          opinion: "HULK CRUSH!!",
        },
        {
          initials: "Elon Musk",
          opinion:
            'CodeCrush is great. I Crushed my "Super Heavy" rocket with Markdown.',
        },
      ],
    };
  },
};
</script>
