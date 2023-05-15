import store, { add, createEffect, remove, clear } from "@lincode/reactivity"
import { Object3D } from "three"
import { box3, vector3 } from "../display/utils/reusables"
import { setSelectionTarget } from "./useSelectionTarget"
import MeshAppendable from "../api/core/MeshAppendable"
import { multipleSelectionTargets } from "../collections/multipleSelectionTargets"
import {
    addDisposeCollectionStateSystem,
    deleteDisposeCollectionStateSystem
} from "../systems/eventSystems/disposeCollectionStateSystem"
import { multipleSelectionGroupPtr } from "../pointers/multipleSelectionGroupPtr"

const [setMultipleSelectionTargets, getMultipleSelectionTargets] = store([
    multipleSelectionTargets
])
export { getMultipleSelectionTargets }
export const addMultipleSelectionTargets = add(
    setMultipleSelectionTargets,
    getMultipleSelectionTargets
)
export const deleteMultipleSelectionTargets = remove(
    setMultipleSelectionTargets,
    getMultipleSelectionTargets
)
export const clearMultipleSelectionTargets = clear(
    setMultipleSelectionTargets,
    getMultipleSelectionTargets
)

let parentEntries: Array<[Object3D, Object3D]>
let group: Object3D
const detach = () => {
    if (parentEntries[0][0].parent === group)
        for (const [object, parent] of parentEntries) parent.attach(object)
}
const attach = () => {
    for (const [object] of parentEntries) group.attach(object)
}

export const flushMultipleSelectionTargets = (
    onFlush: (managers: Set<MeshAppendable>) => Array<MeshAppendable> | void,
    deselect?: boolean
) => {
    detach()
    const newTargets = onFlush(multipleSelectionTargets)
    if (newTargets) {
        multipleSelectionTargets.clear()
        for (const target of newTargets) multipleSelectionTargets.add(target)
        setMultipleSelectionTargets([multipleSelectionTargets])
        return
    }
    if (deselect) {
        multipleSelectionTargets.clear()
        setMultipleSelectionTargets([multipleSelectionTargets])
        return
    }
    attach()
}

createEffect(() => {
    if (!multipleSelectionTargets.size) return

    const groupManager = new MeshAppendable()
    groupManager.$ghost()
    multipleSelectionGroupPtr[0] = groupManager
    setSelectionTarget(groupManager)

    parentEntries = []
    group = groupManager.object3d

    for (const { outerObject3d } of multipleSelectionTargets) {
        if (!outerObject3d.parent) continue
        parentEntries.push([outerObject3d, outerObject3d.parent])
        group.attach(outerObject3d)
    }

    box3.setFromObject(group)
    for (const [object, parent] of parentEntries) parent.attach(object)

    group.position.copy(box3.getCenter(vector3))
    for (const [object] of parentEntries) group.attach(object)

    return () => {
        detach()
        groupManager.dispose()
        multipleSelectionGroupPtr[0] = undefined
    }
}, [getMultipleSelectionTargets])

createEffect(() => {
    if (!multipleSelectionTargets.size) return
    addDisposeCollectionStateSystem(multipleSelectionTargets, {
        deleteState: deleteMultipleSelectionTargets
    })
    return () => {
        deleteDisposeCollectionStateSystem(multipleSelectionTargets)
    }
}, [getMultipleSelectionTargets])
