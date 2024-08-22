<template>
  <canvas ref="display" width="1200" height="1200"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, defineExpose } from "vue";
import { control } from "@/js/stores/control";
import Worker from "@/js/worker?worker";
import Palette from "@/js/classes/Palette";

const systemWorker = new Worker();

const display = ref();

/** Sends the canvas to the web worker and initializes system */
onMounted(() => {
  const offscreenCanvas = display.value.transferControlToOffscreen();

  systemWorker.postMessage(
    {
      method: "setup",
      canvas: offscreenCanvas,
    },
    [offscreenCanvas]
  );
  updateParams();
});

systemWorker.addEventListener("message", (e) => {
  if (e.data.message == "palette") {
    control.value.palette = Palette.coolorsPalette(e.data.palette);
    console.log(e.data.palette);
  }
  console.log(e.data.message);
});

watch(() => control.value.isLooping, toggleDrawLoop);
watch(() => control.value.displayMode, toggleDisplay);

watch(
  () => [control.value.width, control.value.height],
  (e) => {
    const [width, height] = e;
    systemWorker.postMessage({
      method: "setDimensions",
      width: width,
      height: height,
    });
  }
);

watch(
  () => [
    control.value.pointSize,
    control.value.alpha,
    control.value.startIFS,
    control.value.endIFS,
    control.value.pointsPerLoop,
    control.value.endWarp,
  ],
  updateParams
);

defineExpose({
  download: download,
  reset: () => systemWorker.postMessage({ method: "reset" }),
  randomizeWarps: () => systemWorker.postMessage({ method: "randomizeWarps" }),
  info: () => systemWorker.postMessage({ method: "info" }),
  randomizePalette: () =>
    systemWorker.postMessage({ method: "randomizePalette" }),
});

/** Toggles the drawing loop on and off */
function toggleDrawLoop(isLooping) {
  if (isLooping) {
    systemWorker.postMessage({ method: "stopLoop" });
  } else {
    systemWorker.postMessage({ method: "startLoop" });
  }
}

function toggleDisplay(displayMode) {
  if (displayMode) {
    display.value.requestFullscreen();
    systemWorker.postMessage({ method: "displayOn" });
  } else {
    systemWorker.postMessage({ method: "displayOff" });
  }
}
/** utilityFunction to download the image */
function download() {
  const link = document.createElement("a");
  const date = new Date();
  const name = `${date.getFullYear()}_${
    date.getMonth() + 1
  }_${date.getDate()}_bloom_${Math.floor(Math.random() * 10000)}.png`;

  link.download = name;
  link.href = display.value.toDataURL();
  link.click();
  console.log("---Image Downloaded");
}

/** updates all of the params at once */
function updateParams() {
  systemWorker.postMessage({
    method: "updateParams",
    alpha: control.value.alpha,
    pointSize: control.value.pointSize,
    pointsPerLoop: control.value.pointsPerLoop,
    startIFS: control.value.startIFS,
    endIFS: control.value.endIFS,
    endWarp: control.value.endWarp,
  });
}
</script>

<style></style>
