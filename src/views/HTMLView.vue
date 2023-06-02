<template>
  <v-container fill-height fluid class="background">
    <BackgroundComponent />
<<<<<<< Updated upstream
=======
    <DropdownMenu
      :title="programminglanguageHTML[0].Title"
      :lessons="programminglanguageHTML[0].lessonList"
    />
>>>>>>> Stashed changes
    <v-container>
      <v-row align="center" justify="center" class="vrow">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 font-weight-thin mb-4">HTML Lectures</h1>
          <h4 class="txth4">Learn how to use HTML!</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<<<<<<< Updated upstream
  
  <style>
=======
    
    <style>
>>>>>>> Stashed changes
.txth4 {
  font-size: 30px;
  font-weight: 70;
  color: #ffffff;
}
.vrow {
  margin-bottom: 500px;
}
</style>
<<<<<<< Updated upstream
  
  <script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
export default {
  components: {
    BackgroundComponent,
=======
    
  <script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  data() {
    return {
      programminglanguageHTML: [
        {
          Title: "HTML Tutorial",
          lessonList: [
            { id: 1, title: "Home" },
            { id: 2, title: "Where To" },
            { id: 3, title: "Output" },
            { id: 4, title: "Statements" },
            { id: 5, title: "Syntax" },
            { id: 6, title: "Comments" },
            { id: 7, title: "Variables" },
            { id: 8, title: "Operators" },
            { id: 9, title: "Arithemtic" },
            { id: 10, title: "Assignments" },
            { id: 11, title: "Data Types" },
            { id: 12, title: "Functions" },
            { id: 13, title: "Objects" },
            { id: 14, title: "Events" },
            { id: 15, title: "Strings" },
            { id: 16, title: "Number Methods" },
            { id: 17, title: "Arrays" },
            { id: 18, title: "Dates" },
            { id: 19, title: "Math" },
            { id: 20, title: "Loop For" },
            { id: 21, title: "Loop For In" },
            { id: 22, title: "Loop For Of" },
            { id: 23, title: "Loop While" },
            { id: 24, title: "Itearbles" },
            { id: 25, title: "Scope" },
            { id: 26, title: "Hoisting" },
            { id: 27, title: "Arrow Function" },
            { id: 28, title: "JSON" },
            { id: 29, title: "Debugging" },
            { id: 30, title: "Final Test" },
          ],
        },
      ],
    };
  },
  components: {
    BackgroundComponent,
    DropdownMenu,
>>>>>>> Stashed changes
  },
};
</script>