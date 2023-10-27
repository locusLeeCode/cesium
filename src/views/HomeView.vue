<template>
  <div class="home">
    <cesiumMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import cesiumMap from '@/components/map/map.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    cesiumMap,
  },
});
</script>
<style>
.home {
  height: 100%;
  width: 100%
}
</style>