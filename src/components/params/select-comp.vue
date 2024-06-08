<template>
  <div class="paramContainer">
    <span class="paramName">{{ props.name }}: </span>
    <select
      @change="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    >
      <option v-for="o in props.options" :key="o" :value="o">{{ o }}</option>
    </select>
    <Button
      text="rand"
      class="rand"
      @click="$emit('update:modelValue', random(props.options))"
    ></Button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose } from "vue";
import { random } from "@/js/util/random_util";
import Button from "./button-comp.vue";

const props = defineProps({
  name: String,
  options: Array,
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

defineExpose({
  randomize: () => {
    emits("update:modelValue", random(props.options));
  },
});
</script>

<style lang="scss">
.rand {
  margin-left: auto;
}
.paramContainer {
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
.paramName {
  font-size: 10pt;
  width: 125px;
}
select {
  width: 120px;
  font-family: "Courier New", Courier, monospace;
}
</style>
