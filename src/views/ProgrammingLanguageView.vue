<template>
  <v-container fluid style="background-color: #581E64;">
    <div class="header">
      <h1>Explore Coding Paths: Click the Buttons Below</h1>
    </div>
    <v-row class="grid-row">
      <v-col cols="6" class="grid-col">
        <v-btn tile class="grid-button" height="300px" to="/html">
          <div>
            <h1 class="sub-title">HTML</h1>
            <p class="description">The language for building webpages</p>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="6" class="grid-col">
        <v-btn tile class="grid-button" height="300px" to="/css">
          <div>
            <h1 class="sub-title">CSS</h1>
            <p class="description">The language for styling webpages</p>
          </div>
        </v-btn>
      </v-col>
      <v-responsive width="100%"></v-responsive>
      <v-col cols="6" class="grid-col">
        <v-btn tile class="grid-button" height="300px" to="/javascript"> 
          <div>
            <h1 class="sub-title">JavaScript</h1>
            <p class="description">The language for programming webpages</p>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="6" class="grid-col">
        <v-btn tile class="grid-button" height="300px" to="/markdown">
          <div>
            <h1 class="sub-title">Markdown</h1>
            <p class="description">The language for adding formatting elements to plain text</p>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<style>
.header {
  text-align: center;
  margin-bottom: 30px;
  color:#FFFFFF;
}
.sub-title {
  font-size: 26px;
  color: #FFFFFF;
  margin-right: 0px;
}
.description {
  font-size: 18px;
  color: #FFFFFF;
  font-style: italic;
  margin-top: 0px;
}
.grid-button {
  border: 1px solid white;
  background: linear-gradient(135deg, #581E64 0%, #155FC1 100%);
  border-radius: 0px;
  font-size: 30px;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
  
<script>
import BackgroundComponent from '@/components/BackgroundComponent.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    BackgroundComponent,
  }
}
</script>