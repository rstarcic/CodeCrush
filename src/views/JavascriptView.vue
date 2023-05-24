<template>
    <v-container>
      <BackgroundComponent />
      <DropdownMenu />
      <v-container>
        <v-row align="center" justify="center" class="vrow">
          <v-col class="text-center" cols="12">
            <h1 class="text-h2 font-weight-thin mb-4">CSS Lectures</h1>
            <h4 class="txth4">Learn how to use CSS!</h4>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  <script>
  import BackgroundComponent from "@/components/BackgroundComponent.vue";
  import DropdownMenu from "@/components/DropdownMenu.vue";
  export default {
    data() {
      return {
        lessons: [
          {
            title: "Home",
          },
          {
            title: "Where to",
          },
          {
            title: "Output",
          },
          {
            title: "Statements",
          },
        ],
      };
    },
    components: {
      BackgroundComponent,
      DropdownMenu,
    },
  };
  </script>