<template>
  <div>
    <DropdownMenu
      :title="programminglanguageJS[0].Title"
      :lessons="programminglanguageJS[0].lessonList"
    />
  </div>
</template>
  
  <script>
import BackgroundComponent from "@/components/BackgroundComponent.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  data() {
    return {
      programminglanguageJS: [
        {
          Title: "Javascript Tutorial",
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
  },
};
</script>
  