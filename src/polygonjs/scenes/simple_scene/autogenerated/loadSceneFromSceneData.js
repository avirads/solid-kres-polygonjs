import { ScenePlayerImporter } from "@polygonjs/polygonjs/dist/src/engine/io/player/Scene";
import { PolyNodeController } from "@polygonjs/polygonjs/dist/src/engine/nodes/utils/poly/PolyNodeController";
import { configureScene, configurePolygonjs } from "../PolyConfig";
import { Poly } from "@polygonjs/polygonjs/dist/src/engine/Poly";
import { AllExpressionsRegister } from "@polygonjs/polygonjs/dist/src/engine/poly/registers/expressions/All";
import { requiredImports_simple_scene } from "./requiredImports";

const loadSceneFromSceneData_simple_scene = async function (options) {
  const {
    domElement,
    sceneData,
    onProgress,
    autoPlay,
    createViewer,
    assetsRoot,
    libsRootPrefix,
    printWarnings,
    renderer,
    cameraMaskOverride,
  } = options;
  const runRegister = options.runRegister != null ? options.runRegister : true;

  if (runRegister) {
    // registers nodes required for this scene
    for (const node of requiredImports_simple_scene.nodes) {
      Poly.registerNode(node, undefined, { printWarnings });
    }
    for (const operation of requiredImports_simple_scene.operations) {
      Poly.registerOperation(operation, { printWarnings });
    }
    for (const jsFunction of requiredImports_simple_scene.jsFunctions) {
      Poly.registerNamedFunction(jsFunction, { printWarnings });
    }
    const polyNodesData = [
      {
        node_context: "sop",
        node_type: "avatar",
        data: {
          metadata: {
            version: { editor: "1.4.16-1", polygonjs: "1.4.16" },
            createdAt: 1685728621071,
          },
          nodeContext: "sop",
          inputs: { simple: { min: 1, max: 1, names: [""] } },
          params: [],
          nodes: {
            attribCreate1: {
              type: "attribCreate",
              params: {
                class: 1,
                type: 1,
                name: "krestianstvo",
                string: "test-kres-val",
              },
              inputs: ["transform1"],
            },
            subnetOutput1: {
              type: "subnetOutput",
              inputs: ["attribCreate1"],
              flags: { display: true },
            },
            transform1: { type: "transform", inputs: ["box1_avatar"] },
            box1_avatar: { type: "box" },
            subnetOutput2: { type: "subnetOutput", inputs: ["subnetOutput1"] },
          },
          ui: {
            attribCreate1: { pos: [450, 300] },
            subnetOutput1: { pos: [400, 600] },
            transform1: { pos: [450, 200] },
            box1_avatar: { pos: [450, 50] },
            subnetOutput2: { pos: [600, 600] },
          },
        },
      },
    ];
    for (let polyNodeData of polyNodesData) {
      PolyNodeController.createNodeClassAndRegister(polyNodeData);
    }
    AllExpressionsRegister.run(Poly);
    configurePolygonjs(Poly);
  }

  Poly.libs.setRoot("./three/js/libs");

  function configureSceneAndOverrideAssetsRootIfRequired(scene) {
    configureScene(scene);
    if (assetsRoot) {
      scene.assets.setRoot(assetsRoot);
    }
    if (libsRootPrefix) {
      Poly.libs.setRootPrefix(libsRootPrefix);
    }
  }

  // load the scene and create a viewer
  const sceneName = "simple_scene";
  const { scene, viewer } = await ScenePlayerImporter.loadSceneData({
    domElement,
    sceneName,
    configureScene: configureSceneAndOverrideAssetsRootIfRequired,
    sceneData,
    onProgress,
    autoPlay,
    createViewer,
    renderer,
    cameraMaskOverride,
  });
  return {
    scene,
    viewer,
  };
};

export { Poly, loadSceneFromSceneData_simple_scene };
