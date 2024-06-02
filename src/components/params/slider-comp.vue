<template>
  <div class="paramContainer">
    <div class="paramName">{{ props.name }}:</div>
    <input
      class="slider"
      @input="$emit('update:modelValue', $event.target.value)"
      type="range"
      :value="modelValue"
      :min="props.lo"
      :max="props.hi"
      :step="props.step"
    />
    <span class="value">{{ displayVal }}</span>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps(["name", "lo", "hi", "start", "step", "modelValue"]);

defineEmits(["update:modelValue"]);

const displayVal = computed(() => {
  return props.modelValue > 10000
    ? expo(props.modelValue, 2)
    : props.modelValue;
});

const expo = (x, f) => Number.parseFloat(Number(x)).toExponential(f);
</script>

<style lang="css">
.value {
  margin-left: auto;
  font-size: 10pt;
}
.paramName {
  width: 150px;
}
.paramContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding-bottom: 0.5rem;
  width: 350px;
}
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 120px; /* Full-width */
  height: 10px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 5px;
}
/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 10px; /* Set a specific slider handle width */
  height: 10px; /* Slider handle height */
  border-radius: 5px;
  background: slategray; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 10px; /* Set a specific slider handle width */
  height: 10px; /* Slider handle height */
  border-radius: 5px;
  background: Sslategray; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
