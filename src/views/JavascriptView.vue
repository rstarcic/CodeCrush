<template>
  <div>
    <BackgroundComponent/>
    <DropdownMenu/>
  </div>
</template>
<script>
import BackgroundComponent from '@/components/BackgroundComponent.vue';
import DropdownMenu from '@/components/DropdownMenu.vue'
export default {
    data() {
        return {
            lessons: [
                {
                    title: 'Home',
                },
                {
                    title: 'Where to',
                },
                {
                    title: 'Output',
                },
                {
                    title: 'Statements',
                },
            ]

        }
    },
    components: {
        BackgroundComponent,
        DropdownMenu,
    }
}
</script>