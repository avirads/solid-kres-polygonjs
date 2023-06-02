import { loadScene_simple_scene } from "./loadScene.js";

export const fetchSceneAndMount_simple_scene = async function (options = {}) {
  if (options && options.createViewer == null) {
    options.createViewer = true;
  }
  return loadScene_simple_scene(options);
};
