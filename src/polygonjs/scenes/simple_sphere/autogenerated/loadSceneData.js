import { SceneDataManifestImporter } from "@polygonjs/polygonjs/dist/src/engine/io/manifest/import/SceneData";
const manifest = {
  properties: "1685451144219",
  root: "1685346492022",
  nodes: {
    ground: "1685342854908",
    "ground/MAT": "1685341612909",
    "ground/MAT/meshStandardBuilder1": "1685451144219",
    lights: "1685343121254",
    cameras: "1685349922242",
    "cameras/cameraControls1": "1685346416649",
  },
  shaders: {
    "/ground/MAT/meshStandardBuilder1": {
      vertex: "1685451144219",
      fragment: "1685451144219",
      "customDepthMaterial.vertex": "1685341662072",
      "customDepthMaterial.fragment": "1685341662072",
      "customDistanceMaterial.vertex": "1685341662072",
      "customDistanceMaterial.fragment": "1685341662072",
      "customDepthDOFMaterial.vertex": "1685341662072",
      "customDepthDOFMaterial.fragment": "1685341662072",
    },
  },
  jsFunctionBodies: {},
};

export const loadSceneData_simple_sphere = async (options = {}) => {
  const sceneDataRoot = options.sceneDataRoot || "./polygonjs/scenes";
  return await SceneDataManifestImporter.importSceneData({
    sceneName: "simple_sphere",
    urlPrefix: sceneDataRoot + "/simple_sphere",
    manifest: manifest,
    onProgress: options.onProgress,
  });
};
