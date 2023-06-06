// event
import { CameraOrbitControlsEventNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/event/CameraOrbitControls";
// mat
import { MeshStandardMatNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshStandard";
import { MeshStandardBuilderMatNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshStandardBuilder";
// obj
import { GeoObjNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/obj/Geo";
// sop
import { BoxSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/Box";
import { CameraControlsSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/CameraControls";
import { HemisphereLightSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/HemisphereLight";
import { MaterialSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/Material";
import { MaterialsNetworkSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/MaterialsNetwork";
import { NullSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/Null";
import { PerspectiveCameraSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/PerspectiveCamera";
import { SubnetOutputSopNode } from "@polygonjs/polygonjs/dist/src/engine/nodes/sop/SubnetOutput";

export const requiredImports_simple_scene = {
  nodes: [
    CameraOrbitControlsEventNode,
    MeshStandardMatNode,
    MeshStandardBuilderMatNode,
    GeoObjNode,
    BoxSopNode,
    CameraControlsSopNode,
    HemisphereLightSopNode,
    MaterialSopNode,
    MaterialsNetworkSopNode,
    NullSopNode,
    PerspectiveCameraSopNode,
    SubnetOutputSopNode,
  ],
  operations: [],
  jsFunctions: [],
};
