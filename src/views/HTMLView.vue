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
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  data() {
    return {
      toolbarTitle: "HTML Tutorial",
      languageRoute: "html",
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
  },
};
</script>