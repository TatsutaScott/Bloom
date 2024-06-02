<template>
  <div class="paramContainer">
    <span class="paramName">{{ props.name }}: </span>
    <input
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :value="modelValue"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: String,
  modelValue: String,
});
</script>

<style lang="scss">
input {
  width: 110px;
}

.paramContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
</style>
