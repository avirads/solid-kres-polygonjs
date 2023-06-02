import { SceneDataManifestImporter } from "@polygonjs/polygonjs/dist/src/engine/io/manifest/import/SceneData";
const manifest = {
  properties: "1685683003218",
  root: "1685683003218",
  nodes: {
    ground: "1685728960412",
    "ground/MAT": "1685683003218",
    "ground/MAT/meshStandardBuilder1": "1685683003218",
    lights: "1685683003218",
    cameras: "1685683003218",
    "cameras/cameraControls1": "1685683003218",
  },
  shaders: {
    "/ground/MAT/meshStandardBuilder1": {
      vertex: "1685683067752",
      fragment: "1685683067752",
      "customDepthMaterial.vertex": "1685683067752",
      "customDepthMaterial.fragment": "1685683067752",
      "customDistanceMaterial.vertex": "1685683067752",
      "customDistanceMaterial.fragment": "1685683067752",
      "customDepthDOFMaterial.vertex": "1685683067752",
      "customDepthDOFMaterial.fragment": "1685683067752",
    },
  },
  jsFunctionBodies: {},
};

export const loadSceneData_simple_scene = async (options = {}) => {
  const sceneDataRoot = options.sceneDataRoot || "./polygonjs/scenes";
  return await SceneDataManifestImporter.importSceneData({
    sceneName: "simple_scene",
    urlPrefix: sceneDataRoot + "/simple_scene",
    manifest: manifest,
    onProgress: options.onProgress,
  });
};
