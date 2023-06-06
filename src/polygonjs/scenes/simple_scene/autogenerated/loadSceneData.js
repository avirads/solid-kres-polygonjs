import { SceneDataManifestImporter } from "@polygonjs/polygonjs/dist/src/engine/io/manifest/import/SceneData";
const manifest = {
  properties: "1685964789246",
  root: "1685683003218",
  nodes: {
    lights: "1685683003218",
    cameras: "1685948473304",
    "cameras/cameraControls1": "1685683003218",
    ground: "1685964636508",
    "ground/MAT": "1685944970913",
    "ground/MAT/meshStandardBuilder1": "1685948035703",
    geo: "1685967081654",
  },
  shaders: {
    "/ground/MAT/meshStandardBuilder1": {
      vertex: "1685944970913",
      fragment: "1685944970913",
      "customDepthMaterial.vertex": "1685944970913",
      "customDepthMaterial.fragment": "1685944970913",
      "customDistanceMaterial.vertex": "1685944970913",
      "customDistanceMaterial.fragment": "1685944970913",
      "customDepthDOFMaterial.vertex": "1685944970913",
      "customDepthDOFMaterial.fragment": "1685944970913",
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
