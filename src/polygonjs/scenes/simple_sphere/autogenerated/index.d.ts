import { LoadedData } from "./loadScene";

interface LoadSceneAndMountOptions {
  domElement?: string | undefined;
  publicPath: string;
  onProgress: (progress: number) => void;
}

type LoadSceneAndMount_simple_sphere = (
  options: LoadSceneAndMountOptions
) => Promise<LoadedData>;

export const loadSceneAndMount_simple_sphere: LoadSceneAndMount_simple_sphere;
