import IModel from "../../interface/IModel"
import IPrimitive from "../../interface/IPrimitive"

export type GameObjectType =
    | "group"
    | "model"
    | "dummy"
    | "characterRig"
    | "characterRigJoint"
    | "tree"
    | "svgMesh"
    | "htmlMesh"
    | "joystick"
    | "reticle"
    | "splashScreen"
    | "text"
    | "mouse"
    | "keyboard"
    | "reflector"
    | "water"
    | "curve"
    | "sprite"
    | "spriteSheet"
    | "spawnPoint"
    | "sphericalJoint"
    | "fixedJoint"
    | "revoluteJoint"
    | "prismaticJoint"
    | "d6Joint"
    | "audio"
    | "ambientLight"
    | "areaLight"
    | "directionalLight"
    | "skyLight"
    | "defaultSkyLight"
    | "pointLight"
    | "spotLight"
    | "pooledPointLight"
    | "pooledSpotLight"
    | "camera"
    | "orbitCamera"
    | "thirdPersonCamera"
    | "firstPersonCamera"
    | "circle"
    | "cone"
    | "cube"
    | "cylinder"
    | "octahedron"
    | "plane"
    | "sphere"
    | "tetrahedron"
    | "torus"
    | "skybox"
    | "environment"
    | "setup"
    | "template"
    | "script"
    | "timeline"
    | "timelineAudio"

type VersionNode = { type: "lingo3d"; version: string }
export type FindNode = {
    type: "find"
    name: string
    uuid: string
    id?: string
    children?: Array<AppendableNode>
}
type Node = { type: GameObjectType; children?: Array<AppendableNode> }
export type AppendableNode = Partial<IModel & IPrimitive & { source: string }> &
    Node
export type SceneGraphNode = AppendableNode | VersionNode | FindNode
