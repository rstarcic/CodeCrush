<template>
    <v-container fill-height fluid class="background">
      <BackgroundComponent />
      <v-container>
        <v-row align="center" justify="center" class="vrow">
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 font-weight-thin mb-4">JavaScript Lectures</h1>
            <h4 class="txth4">Learn how to use JavaScript!</h4>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <style>
  .txth4 {
    font-size: 30px;
    font-weight: 70;
    color: #ffffff;
  }
  .vrow {
    margin-bottom: 500px;
  }
  </style>
  
  <script>
  import BackgroundComponent from "@/components/BackgroundComponent.vue";
  export default {
    components: {
      BackgroundComponent,
    },
  };
  </script>