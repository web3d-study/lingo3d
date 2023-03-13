import Appendable from "../api/core/Appendable"
import createObject from "../api/serializer/createObject"
import { GameObjectType } from "../api/serializer/types"
import GameGraphChild from "./GameGraphChild"

const templateNodeSet = new WeakSet<TemplateNode>()
export const isTemplateNode = (val: any): val is TemplateNode =>
    templateNodeSet.has(val)

export default class TemplateNode extends GameGraphChild {
    public constructor() {
        super()
        templateNodeSet.add(this)
    }

    public set source(type: GameObjectType | Appendable) {
        const target = typeof type === "string" ? createObject(type) : type
        target.dispose()
        Object.setPrototypeOf(this, target)
    }
}
