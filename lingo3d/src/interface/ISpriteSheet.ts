import IVisibleObjectManager, {
    visibleObjectManagerDefaults,
    visibleObjectManagerSchema
} from "./IVisibleObjectManager"
import { ExtractProps } from "./utils/extractProps"
import { extendDefaults } from "./utils/Defaults"
import Nullable from "./utils/Nullable"
import { nullableDefault } from "./utils/NullableDefault"

export default interface ISpriteSheet extends IVisibleObjectManager {
    textureStart: Nullable<string>
    textureEnd: Nullable<string>
    texture: Nullable<string>
    columns: Nullable<number>
    length: Nullable<number>
    loop: Nullable<boolean>
}

export const spriteSheetSchema: Required<ExtractProps<ISpriteSheet>> = {
    ...visibleObjectManagerSchema,
    textureStart: String,
    textureEnd: String,
    texture: String,
    columns: Number,
    length: Number,
    loop: Boolean
}

export const spriteSheetDefaults = extendDefaults<ISpriteSheet>(
    [visibleObjectManagerDefaults],
    {
        scaleZ: 0,
        depth: 0,
        textureStart: undefined,
        textureEnd: undefined,
        texture: undefined,
        columns: nullableDefault(0),
        length: nullableDefault(0),
        loop: nullableDefault(false)
    }
)
