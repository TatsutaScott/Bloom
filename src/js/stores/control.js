import { random } from "../util/random_util";
import { ref } from "vue";
import { IFSArray } from "../functions/IFS";
import { finalWarpArray } from "../functions/warping";

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
