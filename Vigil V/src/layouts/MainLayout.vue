<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  /*
  components: {
    EssentialLink,
  },
  async mounted() {
  },
  */
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
