import store from "@lincode/reactivity"

type PhysX = {
    PhysX: any
    physics: any
    material: any
    shapeFlags: any
    tmpVec: any
    tmpPose: any
    tmpFilterData: any
    scene: any
}

export const [setPhysX, getPhysX] = store<PhysX>({
    PhysX: undefined,
    physics: undefined,
    material: undefined,
    shapeFlags: undefined,
    tmpVec: undefined,
    tmpPose: undefined,
    tmpFilterData: undefined,
    scene: undefined
})
