// event
import { CameraOrbitControlsEventNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/event/CameraOrbitControls";
// mat
import { MeshStandardBuilderMatNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshStandardBuilder";
// obj
import { GeoObjNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/obj/Geo";
// sop
import { BoxSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/Box";
import { CameraControlsSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/CameraControls";
import { HemisphereLightSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/HemisphereLight";
import { MaterialSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/Material";
import { MaterialsNetworkSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/MaterialsNetwork";
import { PerspectiveCameraSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/PerspectiveCamera";

export const requiredImports_simple_sphere = {
  nodes: [
    CameraOrbitControlsEventNode,
    MeshStandardBuilderMatNode,
    GeoObjNode,
    BoxSopNode,
    CameraControlsSopNode,
    HemisphereLightSopNode,
    MaterialSopNode,
    MaterialsNetworkSopNode,
    PerspectiveCameraSopNode,
  ],
  operations: [],
  jsFunctions: [],
};
