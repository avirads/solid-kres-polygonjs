import { LoadSceneOptions, LoadedData } from "./loadScene";

type FetchSceneAndMount_simple_scene = (
  options?: LoadSceneOptions
) => Promise<LoadedData>;

export const fetchSceneAndMount_simple_scene: FetchSceneAndMount_simple_scene;
