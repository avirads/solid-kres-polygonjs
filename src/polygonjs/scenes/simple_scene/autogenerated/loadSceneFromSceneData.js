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
            createdAt: 1685958853229,
          },
          nodeContext: "sop",
          inputs: { simple: { min: 1, max: 1, names: ["input geometry"] } },
          params: [
            {
              name: "color",
              type: "color",
              rawInput: [0, 255, 0],
              initValue: [0, 0, 0],
              options: { conversion: "no conversion" },
            },
          ],
          nodes: {
            MAT: {
              type: "materialsNetwork",
              nodes: {
                meshStandard1: {
                  type: "meshStandard",
                  params: {
                    color: [
                      'ch("../../colorr")',
                      'ch("../../colorg")',
                      'ch("../../colorb")',
                    ],
                  },
                },
              },
            },
            box1: { type: "box" },
            material1: {
              type: "material",
              params: { material: "../MAT/meshStandard1" },
              inputs: ["box1"],
              flags: { display: true },
            },
            subnetOutput1: { type: "subnetOutput", inputs: ["material1"] },
          },
          ui: {
            MAT: {
              pos: [-400, 300],
              selection: ["meshStandard1"],
              nodes: { meshStandard1: { pos: [0, 0] } },
            },
            box1: { pos: [-200, 50] },
            material1: { pos: [-200, 300] },
            subnetOutput1: { pos: [-200, 500] },
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
