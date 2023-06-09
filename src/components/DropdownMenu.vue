<template>
  <v-navigation-drawer permanent color="#581E64" class="custom-drawer">
    <v-toolbar color="#581e64" class="toolbar-class">
      <v-toolbar-title class="menu-title">
        {{ toolbarTitle }}
      </v-toolbar-title>
    </v-toolbar>
    <v-list dense class="custom-list" color="#581E64">
      <v-list-item
        v-for="(title, id) in lessonTitles"
        :key="id"
        @click="$router.push(`/${languageRoute}/${title}`)"
        class="lesson-item"
      >
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DropdownMenu",
  props: {
    lessonTitles: {
      type: Array,
      default: () => [],
    },
    toolbarTitle: {
      type: String,
      required: true,
    },
    languageRoute: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.custom-drawer {
  left: 0;
  top: 0;
  width: 240px !important;
  transform: translateX(0);
  position: fixed;
  overflow-x: hidden;
}
.toolbar-class {
  min-height: 100px;
  padding-top: 45px;
  padding-left: 10px;
}
.menu-title {
  font-size: 18px;
  color: #ffffff !important;
  font-weight: bold;
}
.lesson-item {
  color: #ffffff !important;
}
</style>
