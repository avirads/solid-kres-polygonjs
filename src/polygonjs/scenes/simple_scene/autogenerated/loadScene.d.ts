import { SceneJsonExporterData } from "@polygonjs/polygonjs/dist/src/engine/io/json/export/Scene";
import { BaseViewerType } from "@polygonjs/polygonjs/dist/src/engine/viewers/_Base";
import { PolySceneWithNodeMap_simple_scene } from "./PolySceneWithNodeMap";
import { WebGLRenderer } from "three";

export type OnProgressCallback = (ratio: number, args: any) => void;
export type ConfigureSceneData = (sceneData: SceneJsonExporterData) => void;

export interface LoadSceneOptions {
  sceneData?: SceneJsonExporterData;
  onProgress?: OnProgressCallback;
  domElement?: HTMLElement | string;
  loadModules?: boolean;
  runRegister?: boolean;
  configureSceneData?: ConfigureSceneData;
  sceneDataRoot?: string;
  assetsRoot?: string;
  libsRootPrefix?: string;
  autoPlay?: boolean;
  createViewer?: boolean;
  printWarnings?: boolean;
  renderer?: WebGLRenderer;
  cameraMaskOverride?: string;
}
export interface LoadedData {
  scene: PolySceneWithNodeMap_simple_scene;
  viewer: BaseViewerType | undefined;
}
export type LoadScene_simple_scene = (
  options?: LoadSceneOptions
) => Promise<LoadedData>;

export const loadScene_simple_scene: LoadScene_simple_scene;
