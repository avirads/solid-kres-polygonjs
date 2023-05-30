import { loadScene_simple_sphere } from "./loadScene.js";

export const fetchSceneAndMount_simple_sphere = async function (options = {}) {
  if (options && options.createViewer == null) {
    options.createViewer = true;
  }
  return loadScene_simple_sphere(options);
};
