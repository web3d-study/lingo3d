import { useMemo } from "preact/hooks"
import { Bone, Object3D } from "three"
import { TreeItemProps } from "./TreeItem"
import ComponentIcon from "./icons/ComponentIcon"
import BaseTreeItem from "../component/treeItems/BaseTreeItem"
import BoneIcon from "./icons/BoneIcon"
import { setSceneGraphExpanded } from "../../states/useSceneGraphExpanded"
import handleTreeItemClick from "../utils/handleTreeItemClick"
import { getFoundManager } from "../../api/utils/getFoundManager"
import Model from "../../display/Model"
import useSelected from "./useSelected"
import useExpanded from "./useExpanded"

type NativeTreeItemProps = TreeItemProps & {
    object3d: Object3D | Bone
    appendable: Model
}

const NativeTreeItem = ({ object3d, appendable }: NativeTreeItemProps) => {
    const manager = useMemo(() => {
        const manager = getFoundManager(object3d, appendable)
        manager.disableSceneGraph = true
        manager.disableSerialize = true
        return manager
    }, [object3d])

    const selected = useSelected(manager)
    const expanded = useExpanded(manager)

    const IconComponent = useMemo(() => {
        if ("isBone" in object3d) return BoneIcon
        return ComponentIcon
    }, [object3d])

    return (
        <BaseTreeItem
            label={object3d.name}
            selected={selected}
            draggable
            myDraggingItem={object3d}
            onCollapse={() => setSceneGraphExpanded(undefined)}
            onClick={(e) => handleTreeItemClick(e, manager)}
            onContextMenu={(e) => handleTreeItemClick(e, manager, true)}
            expanded={expanded}
            expandable={!!object3d.children.length}
            outlined
            IconComponent={IconComponent}
        >
            {() =>
                object3d.children.map((child) => (
                    <NativeTreeItem
                        key={child.uuid}
                        object3d={child}
                        appendable={appendable}
                    />
                ))
            }
        </BaseTreeItem>
    )
}

export default NativeTreeItem
