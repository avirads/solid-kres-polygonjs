import { fetchSceneAndMount_simple_scene } from "./fetchSceneAndMount.js";

export async function loadSceneAndMount_simple_scene(options) {
  const { publicPath, onProgress } = options;
  const domElement = options.domElement || "polygonjs-app-simple_scene";
  const loadedData = await fetchSceneAndMount_simple_scene({
    domElement,
    autoPlay: true,
    onProgress,
    sceneDataRoot: publicPath + "/polygonjs/scenes",
    assetsRoot: publicPath,
    libsRootPrefix: publicPath,
  });
  return loadedData;
}
