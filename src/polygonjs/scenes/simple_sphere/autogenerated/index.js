import { fetchSceneAndMount_simple_sphere } from "./fetchSceneAndMount.js";

export async function loadSceneAndMount_simple_sphere(options) {
  const { publicPath, onProgress } = options;
  const domElement = options.domElement || "polygonjs-app-simple_sphere";
  const loadedData = await fetchSceneAndMount_simple_sphere({
    domElement,
    autoPlay: true,
    onProgress,
    sceneDataRoot: publicPath + "/polygonjs/scenes",
    assetsRoot: publicPath,
    libsRootPrefix: publicPath,
  });
  return loadedData;
}
