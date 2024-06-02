import { random } from "@/js/util/random_util";
import { IFSArray } from "@/js/functions/IFS";
import { finalWarpArray } from "@/js/functions/warping";
import { ref } from "vue";

export const control = ref({
  isLooping: true,
  width: 1200,
  height: 1200,
  alpha: 1,
  pointSize: 0.1,
  pointsPerLoop: 10000,
  startIFS: random(IFSArray).name,
  endIFS: random(IFSArray).name,
  endWarp: random(finalWarpArray).name,
  palette: null,
});
