<template>
  <div id="settings">
    <div ref="settings">
      <span @click="showHide = !showHide">{{ showHide ? "▽" : "△" }}</span>
    </div>
    <div v-if="showHide" id="settingsUI">
      <Slider
        name="Width"
        v-model="control.width"
        lo="100"
        hi="2000"
        step="100"
      ></Slider>
      <Slider
        name="Height"
        v-model="control.height"
        lo="100"
        hi="2000"
        step="100"
      ></Slider>
      <Slider
        name="Point Size"
        v-model="control.pointSize"
        lo="0"
        hi="1"
        step="0.001"
      ></Slider>
      <Slider
        name="Alpha"
        v-model="control.alpha"
        lo="0"
        hi="1"
        step="0.01"
      ></Slider>
      <Slider
        name="Points per loop"
        v-model="control.pointsPerLoop"
        lo="10000"
        hi="100000"
      ></Slider>
      <Select
        name="Start IFS"
        ref="startIFS"
        v-model="control.startIFS"
        :options="ifsNames"
      ></Select>
      <Select
        name="End IFS"
        ref="endIFS"
        v-model="control.endIFS"
        :options="ifsNames"
      ></Select>
      <Select
        name="End Warp"
        ref="endWarp"
        v-model="control.endWarp"
        :options="warpNames"
      ></Select>
      <div class="buttonsContainer">
        <Button
          text="Randomize Warps"
          @click="emits('randomizeWarps')"
        ></Button>
        <Button
          text="Randomize Palette"
          @click="emits('randomizePalette')"
        ></Button>
      </div>

      <Palette v-if="control.palette" :palette-object="control.palette" />
      <div class="buttonsContainer">
        <Button
          :text="control.isLooping ? 'Start Loop' : 'Stop loop'"
          @click="() => (control.isLooping = !control.isLooping)"
        ></Button>
        <Button text="Download" @click="emits('download')" />
        <Button text="Reset" @click="emits('reset')" />
        <Button
          text="Randomize"
          @click="
            () => {
              paramRandomize([startIFS, endIFS, endWarp]);
              emits('randomizeWarps');
            }
          "
        ></Button>
        <Button text="info" @click="emits('info')"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/params/slider-comp.vue";
import Select from "@/components/params/select-comp.vue";
import Button from "@/components/params/button-comp.vue";
import Palette from "@/components/params/palette-comp.vue";

import { IFSArray } from "@/js/functions/IFS";
import { finalWarpArray } from "@/js/functions/warping";
import { control } from "@/js/stores/control";
import { dragAndDrop, functionNames, paramRandomize } from "@/js/util/ui_util";
import { ref, defineEmits, onMounted } from "vue";

const startIFS = ref();
const endIFS = ref();
const endWarp = ref();

const showHide = ref(true);
const settings = ref();

const ifsNames = functionNames(IFSArray);
const warpNames = functionNames(finalWarpArray);

const emits = defineEmits([
  "download",
  "reset",
  "randomize",
  "randomizeWarps",
  "randomizePalette",
  "info",
]);

onMounted(() => {
  console.log(settings.value);
  dragAndDrop(settings.value);
});
</script>

<style lang="scss">
#settings {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  border: solid 1px black;
  border-radius: 10px;
  font-family: "Courier New", Courier, monospace;
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
}
</style>

<!-- <template>
  <div id="settings">
    <div ref="settings">
      <span @click="showHide = !showHide">{{ showHide ? "▽" : "△" }}</span>
    </div>
    <div v-if="showHide" id="settingsUI">
      <Slider
        name="Width"
        v-model="control.width"
        lo="100"
        hi="2000"
        step="100"
      ></Slider>
      <Slider
        name="Height"
        v-model="control.height"
        lo="100"
        hi="2000"
        step="100"
      ></Slider>
      <Slider
        name="Point Size"
        v-model="control.pointSize"
        lo="0"
        hi="1"
        step="0.001"
      ></Slider>
      <Slider
        name="Alpha"
        v-model="control.alpha"
        lo="0"
        hi="1"
        step="0.01"
      ></Slider>
      <Slider
        name="Points per loop"
        v-model="control.pointsPerLoop"
        lo="10000"
        hi="100000"
      ></Slider>
      <Select
        name="Start IFS"
        ref="startIFS"
        v-model="control.startIFS"
        :options="ifsNames"
      ></Select>
      <Select
        name="End IFS"
        ref="endIFS"
        v-model="control.endIFS"
        :options="ifsNames"
      ></Select>
      <Select
        name="End Warp"
        ref="endWarp"
        v-model="control.endWarp"
        :options="warpNames"
      ></Select>
      <div class="buttonsContainer">
        <Button
          text="Randomize Warps"
          @click="emits('randomizeWarps')"
        ></Button>
        <Button
          text="Randomize Palette"
          @click="emits('randomizePalette')"
        ></Button>
      </div>

      <Palette v-if="control.palette" :palette-object="control.palette" />
      <div class="buttonsContainer">
        <Button
          :text="control.isLooping ? 'Start Loop' : 'Stop loop'"
          @click="() => (control.isLooping = !control.isLooping)"
        ></Button>
        <Button text="Download" @click="emits('download')" />
        <Button text="Reset" @click="emits('reset')" />
        <Button
          text="Randomize"
          @click="
            () => {
              paramRandomize([startIFS, endIFS, endWarp]);
              emits('randomizeWarps');
            }
          "
        ></Button>
        <Button text="info" @click="emits('info')"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/params/slider-comp.vue";
import Select from "@/components/params/select-comp.vue";
import Button from "@/components/params/button-comp.vue";
import Palette from "@/components/params/palette-comp.vue";

import { IFSArray } from "@/js/functions/IFS";
import { finalWarpArray } from "@/js/functions/warping";
import { control } from "@/js/stores/control";
import { dragAndDrop, functionNames, paramRandomize } from "@/js/util/ui_util";
import { ref, defineEmits, onMounted } from "vue";

const startIFS = ref();
const endIFS = ref();
const endWarp = ref();

const showHide = ref(true);
const settings = ref();

const ifsNames = functionNames(IFSArray);
const warpNames = functionNames(finalWarpArray);

const emits = defineEmits([
  "download",
  "reset",
  "randomize",
  "randomizeWarps",
  "randomizePalette",
  "info",
]);

onMounted(() => {
  console.log(settings.value);
  dragAndDrop(settings.value);
});
</script>

<style lang="scss">
#settings {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  border: solid 1px black;
  border-radius: 10px;
  font-family: "Courier New", Courier, monospace;
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
}
</style> -->
