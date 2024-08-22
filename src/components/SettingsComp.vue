<template>
  <div id="settings">
    <div ref="settings" id="setting_header">
      <span @click="showHide = !showHide" id="openClose">{{
        showHide ? "▽" : "△"
      }}</span>
      <div id="drag" v-if="showHide">
        <h1>bloom</h1>
      </div>
    </div>

    <div v-if="showHide" id="settingsUI">
      <div id="sliders">
        <Slider
          v-for="s in data.sliders"
          :name="s.name"
          v-model="control[s.val]"
          :lo="s.lo"
          :hi="s.hi"
          :step="s.step"
        ></Slider>
      </div>

      <div id="selects">
        <Select
          v-for="s in data.selects"
          :name="s.name"
          :ref="s.ref"
          v-model="control[s.val]"
          :options="s.options"
        ></Select>
      </div>

      <div class="buttonsContainer">
        <Button
          :text="control.isLooping ? 'Start Loop' : 'Stop loop'"
          @click="() => (control.isLooping = !control.isLooping)"
        ></Button>
        <Button
          text="Randomize"
          @click="
            () => {
              paramRandomize([startIFS, endIFS, endWarp]);
              emits('randomizeWarps');
            }
          "
        ></Button>
        <Button
          v-for="b in data.buttons"
          :text="b.name"
          @click="emits(b.emit)"
        ></Button>
        <Button
          :text="control.displayMode ? 'Normal' : 'Display'"
          @click="() => (control.displayMode = !control.displayMode)"
        ></Button>
      </div>

      <Palette v-if="control.palette" :palette-object="control.palette" />
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/params/slider-comp.vue";
import Select from "@/components/params/select-comp.vue";
import Button from "@/components/params/button-comp.vue";
import Palette from "@/components/params/palette-comp.vue";

import data from "@/assets/settings.json";
import { control } from "@/js/stores/control";
import { dragAndDrop, paramRandomize } from "@/js/util/ui_util";
import { ref, defineEmits, onMounted } from "vue";

console.log(data);

const startIFS = ref();
const endIFS = ref();
const endWarp = ref();

const showHide = ref(true);
const settings = ref();

const emits = defineEmits([
  "download",
  "reset",
  "randomize",
  "randomizeWarps",
  "randomizePalette",
  "info",
]);

onMounted(() => {
  dragAndDrop(settings.value);
});
</script>

<style lang="scss">
h1 {
  margin: 0;
  font-size: 2em;
}
#settings {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  border: solid 1px black;
  border-radius: 10px;
  font-family: "Courier New", Courier, monospace;
  filter: drop-shadow(5px 0px 10px rgb(226, 226, 226));
}
#openClose {
  vertical-align: bottom;
}
#setting_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
#drag {
  border-bottom: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  padding: 0.5rem 0;
  width: 100%;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
#settingsUI {
  width: 350px;
  margin-top: 10px;
}
.buttonsContainer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem 0;
}
</style>
