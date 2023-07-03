import { CubeTextureLoader, Texture } from "three"
import { forceGet } from "@lincode/utils"
import { handleProgress } from "./utils/bytesLoaded"
import { createMap } from "../../../utils/createCollection"

const cache = createMap<string, Texture>()
const loader = new CubeTextureLoader()

export default (urls: Array<string>) =>
    forceGet(cache, urls.join(","), () =>
        loader.load(urls, undefined, handleProgress(urls.join(",")))
    )
