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
      toolbarTitle: "Markdown Tutorial",
      languageRoute: "markdown",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
};
</script>

