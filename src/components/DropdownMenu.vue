<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          tile
          class="menu-btn custom-text-color rounded-0"
          v-bind="attrs"
          v-on="on"
          color="#581E64"
        >
          {{ title }}
        </v-btn>
      </template>
      <v-card class="custom-card">
        <v-list flat class="custom-list" color="#581E64">
          <v-list-item
            v-for="lesson in lessons"
            :key="lesson.id"
            class="lesson-item custom-text-color"
          >
            <v-list-item-title>{{ lesson.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "DropdownMenu",
  props: {
    title: {
      type: String,
      required: true,
    },
    lessons: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.menu-btn {
  text-align: left;
}
.custom-text-color {
  color: #ffffff !important;
}
.custom-card {
  left: 0 !important;
  right: auto !important;
  transform-origin: left top;
  width: 100%;
}

.custom-list {
  padding-left: 0;
}

.lesson-item {
  text-align: left;
  border-top: 1px solid #ffffff;
}

.v-menu__content {
  /* unutarnji sadržaj v-menu  */
  left: 0 !important;
  right: auto !important;
  max-width: unset;
}
</style>
