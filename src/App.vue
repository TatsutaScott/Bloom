<template>
  <div>
    <h1>bloom</h1>
    <SettingsComponent
      ref="settingsComp"
      @download="canvasComp.download()"
      @reset="canvasComp.reset()"
      @randomize="canvasComp.randomize()"
      @randomizeWarps="canvasComp.randomizeWarps()"
      @randomizePalette="canvasComp.randomizePalette()"
      @info="canvasComp.info()"
    />
    <CanvasComponent ref="canvasComp" />
  </div>
</template>

<script setup>
import CanvasComponent from "@/components/CanvasComp.vue";
import SettingsComponent from "@/components/SettingsComp.vue";
import { ref } from "vue";

const settingsComp = ref(null);
const canvasComp = ref(null);
</script>

<style lang="scss" scoped></style>
