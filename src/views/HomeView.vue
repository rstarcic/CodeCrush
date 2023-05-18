<template>
  <div>
    <v-parallax dark src="@/assets/Background.png">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h4 font-weight-thin mb-4">
            Crush your coding skills with Code Crush!
          </h1>
          <h4 class="subheading">
            Discover the power of programming and create your digital future!
          </h4>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-card v-for="info in information" :key="info.aboutWebsite" elevation="2" class="info-cards" color="#A271B0">
          <v-col cols="12">
            <v-card-text>
              <v-icon class="icon-spacing" color="#581E64">{{ info.icon }}</v-icon>
              <h2>{{ info.aboutWebsite }}</h2>
            </v-card-text>
          </v-col>
        </v-card>
      </v-row>
    </v-parallax>
    <v-container fluid>
      <v-card v-for="card in cards" :key="card.title" elevation="2" class="mx-auto" max-width="700" v-ripple>
        <v-row>
          <v-col cols="6">
            <v-img :src="card.image" class="img-margin"></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <h2 style="margin-bottom: 10px;">{{ card.title }}</h2>
              <p>{{ card.description }}</p>
              <div class="learning-time">
                <v-icon class="learning-time-icon">mdi-clock-outline</v-icon>
                <span class="learning-time-text">{{ card.learningTime }}</span>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
</div>
</template>


<style>
.sign-in-btn, .sign-up-btn {
  background-color: #581E64;
  color: #FFFFFF;
  border-radius: 50px;
  height: 20px;
  width: 250px;
  padding: 15px;
  font-size: 16px;
  margin: 5px;
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
.mx-auto {
  margin-bottom: 20px;
  margin-top: 30px;
}
.img-margin {
  margin-top: 25px;
  margin-left: 20px;
}
.heading {
  margin-bottom: 10px;
}
.info-cards {
  height: 200px;
  width: 200px; 
  border-radius: 20px;
  margin-right: 20px;
}
.text-center {
  font-family:'Arial', sans-serif;
  font-size: 15px;
  color:#FFFFFF;
  margin-top: 50px;
}
.icon-spacing {
  margin-bottom: 10px
}
.subheading {
  font-size: 25px;
  font-weight: 100;
}
</style>

<script>
export default {
  name: 'Home',
  data() {
    return {
      cards: [
      {
        title: 'HTML: The Language of Web Structure',
        description: 'HTML (Hypertext Markup Language) forms the backbone of web pages, defining the structure and organization of content. Mastering HTML allows you to create well-structured websites with headings, paragraphs, images, and links. With HTML, you can create accessible and semantically meaningful web pages, improving user experience and search engine optimization.',
        image: 'https://cdn.pixabay.com/photo/2017/07/31/14/45/code-2558220_960_720.jpg',
        learningTime: '1-2 weeks'
      },
      {
        title: 'CSS: Bringing Style to the Web',
        description: 'CSS (Cascading Style Sheets) is the language used to add visual styling and layout to HTML elements. Learning CSS enables you to apply colors, fonts, spacing, and responsive design to your web pages. With CSS, you can create stunning and professional-looking websites that adapt beautifully to different devices and screen sizes.',
        image: 'https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg',
        learningTime: '2-3 weeks'
      },
      {
        title: 'JavaScript: Powering Interactive Web Experiences',
        description: 'JavaScript is a versatile programming language that adds interactivity and functionality to web pages. With JavaScript, you can create dynamic elements, handle user interactions, and build complex web applications. Learning JavaScript empowers you to create interactive forms, perform calculations, make API requests, and much more.',
        image: 'https://cdn.pixabay.com/photo/2020/12/27/12/31/programmer-5863772_960_720.jpg',
        learningTime: '4-6 weeks'
      },
      {
        title: 'Markdown: Simplifying Documentation',
        description: 'Markdown is a lightweight markup language used for writing documentation, blog posts, and README files. With Markdown, you can format text, create headings, lists, tables, and insert images and links, all with simple syntax. Markdown is widely supported across platforms and can be easily converted to HTML, PDF, or other formats.',
        image: 'https://d33wubrfki0l68.cloudfront.net/e3541891e3115642d605aca52e4556d397e95c6f/4e2ba/images/quicktourexample.png',
        learningTime: '1-2 days'
      }],
      information: [
        {
          icon: 'mdi-book',
          aboutWebsite: 'Use Top Learning Resources for Programming Languages.'
        },
        {
          icon: 'mdi-lightbulb',
          aboutWebsite: 'Take valuable lessons in various programming languages.'
        },
        {
          icon: 'mdi-pencil',
          aboutWebsite: 'Quizzes for each lesson.'
        },
        {
          icon: 'mdi-notebook-check',
          aboutWebsite: 'Crush the final exam for each programming language.'
        }
      ]
    }
  }
}
</script>
