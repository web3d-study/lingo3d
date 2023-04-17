import { Texture } from "three"
import Appendable from "../api/core/Appendable"
import MeshAppendable from "../api/core/MeshAppendable"

export const uuidMap = new Map<string, Appendable | MeshAppendable>()
export const uuidTextureMap = new Map<string, Texture>()
export const userIdMap = new Map<string, Set<Appendable | MeshAppendable>>()

export const getAppendablesById = (id: string) => {
    const uuidInstance = uuidMap.get(id)
    if (uuidInstance) return [uuidInstance]
    return userIdMap.get(id) ?? []
}
