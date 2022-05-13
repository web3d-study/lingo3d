import store, { createEffect, pull, push, reset } from "@lincode/reactivity"
import { Group as ThreeGroup, Object3D } from "three"
import Appendable from "../api/core/Appendable"
import SimpleObjectManager from "../display/core/SimpleObjectManager"
import Group from "../display/Group"
import { box3, vector3 } from "../display/utils/reusables"
import scene from "../engine/scene"
import { onEditorGroupItems } from "../events/onEditorGroupItems"
import { emitSelectionTarget } from "../events/onSelectionTarget"
import { getMultipleSelectionEnabled } from "./useMultipleSelectionEnabled"
import { setSelectionTarget } from "./useSelectionTarget"

export const [setMultipleSelectionTargets, getMultipleSelectionTargets] = store<Array<SimpleObjectManager>>([])

export const pushMultipleSelectionTargets = push(setMultipleSelectionTargets, getMultipleSelectionTargets)
export const pullMultipleSelectionTargets = pull(setMultipleSelectionTargets, getMultipleSelectionTargets)
export const resetMultipleSelectionTargets = reset(setMultipleSelectionTargets, getMultipleSelectionTargets)

export const multipleSelectionGroupManagers = new WeakSet<Appendable>()

createEffect(() => {
    const enabled = getMultipleSelectionEnabled()
    const targets = getMultipleSelectionTargets()
    if (!targets.length || !enabled) return
    
    const group = new ThreeGroup()
    scene.add(group)
    
    const groupManager = new SimpleObjectManager(group)
    multipleSelectionGroupManagers.add(groupManager)
    setSelectionTarget(groupManager)
    
    const parentEntries: Array<[Object3D, Object3D]> = []
    for (const { outerObject3d: target } of targets) {
        if (!target.parent) continue
        parentEntries.push([target, target.parent])
        group.attach(target)
    }

    box3.setFromObject(group)
    for (const [object, parent] of parentEntries)
        parent.attach(object)

    group.position.copy(box3.getCenter(vector3))
    for (const [object] of parentEntries)
        group.attach(object)

    let consolidated = false
    const handle = onEditorGroupItems(() => {
        if (!targets.length || consolidated) return
        consolidated = true

        const consolidatedGroup = new Group()
        consolidatedGroup.outerObject3d.position.copy(group.position)
        for (const target of targets)
            consolidatedGroup.attach(target)

        emitSelectionTarget(consolidatedGroup)
    })

    return () => {
        emitSelectionTarget(undefined)

        if (!groupManager.done && !consolidated)
            for (const [object, parent] of parentEntries)
                parent.attach(object)

        groupManager.dispose()
        scene.remove(group)
        handle.cancel()
    }
}, [getMultipleSelectionTargets, getMultipleSelectionEnabled])