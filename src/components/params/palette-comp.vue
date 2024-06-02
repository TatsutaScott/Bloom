<template>
  <div class="paletteContainer">
    <div
      v-for="color in props.paletteObject.colors"
      class="colorBox"
      :key="color"
      :style="`background-color: ${color.string()};`"
    ></div>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue";

const props = defineProps({
  paletteObject: Object,
});

watch(
  () => props.paletteObject,
  () => console.log(props.paletteObject)
);
</script>

<style lang="scss">
.paletteContainer {
  width: 350px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.colorBox {
  height: 15px;
  width: 100%;
}
</style>
