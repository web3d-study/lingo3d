import MeshManager from "../display/core/MeshManager"
import IPositioned, {
    positionedDefaults,
    positionedSchema
} from "./IPositioned"
import { extendDefaults } from "./utils/Defaults"
import { ExtractProps } from "./utils/extractProps"
import Nullable from "./utils/Nullable"

export default interface IJoint extends IPositioned {
    from: Nullable<string | MeshManager>
    to: Nullable<string | MeshManager>
}

export const jointSchema: Required<ExtractProps<IJoint>> = {
    ...positionedSchema,
    from: [String, Object],
    to: [String, Object]
}

export const jointDefaults = extendDefaults<IJoint>([positionedDefaults], {
    from: undefined,
    to: undefined
})