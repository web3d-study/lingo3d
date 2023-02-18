import { Pane } from "./tweakpane"
import { setupSchema, setupDefaults } from "../../interface/ISetup"
import addInputs from "./addInputs"
import createParams from "./createParams"
import splitObject from "./splitObject"
import { Cancellable } from "@lincode/promiselikes"
import Setup from "../../display/Setup"

export default (
    pane: Pane,
    targetSetup: Setup,
    includeKeys: Array<string> | undefined
) => {
    const handle = new Cancellable()
    const [editorParams, editorRest] = splitObject(
        createParams(
            targetSetup,
            setupSchema,
            setupDefaults,
            includeKeys,
            true
        ),
        ["gridHelper", "gridHelperSize", "stats"]
    )
    addInputs(handle, pane, "editor", targetSetup, setupDefaults, editorParams)

    const [rendererParams, rendererRest] = splitObject(editorRest, [
        "antiAlias",
        "pixelRatio",
        "fps",
        "logarithmicDepth",
        "uiLayer",
        "pbr"
    ])
    addInputs(
        handle,
        pane,
        "renderer",
        targetSetup,
        setupDefaults,
        rendererParams
    )

    const [sceneParams, sceneRest] = splitObject(rendererRest, [
        "exposure",
        "defaultLight",
        "preset environment",
        "environment",
        "skybox",
        "texture",
        "color",
        "shadowResolution",
        "shadowDistance"
    ])
    addInputs(
        handle,
        pane,
        "lighting & environment",
        targetSetup,
        setupDefaults,
        sceneParams
    )

    const [effectsParams, effectsRest] = splitObject(sceneRest, [
        "bloom",
        "bloomIntensity",
        "bloomThreshold",
        "bloomRadius",
        "ssr",
        "ssrIntensity",
        "ssao",
        "ssaoIntensity",
        "bokeh",
        "bokehScale",
        "vignette"
    ])
    addInputs(
        handle,
        pane,
        "effects",
        targetSetup,
        setupDefaults,
        effectsParams
    )

    const [outlineParams, outlineRest] = splitObject(effectsRest, [
        "outlineColor",
        "outlineHiddenColor",
        "outlinePattern",
        "outlinePulse",
        "outlineStrength"
    ])
    addInputs(
        handle,
        pane,
        "outline effect",
        targetSetup,
        setupDefaults,
        outlineParams
    )

    Object.keys(outlineRest).length &&
        addInputs(
            handle,
            pane,
            "settings",
            targetSetup,
            setupDefaults,
            outlineRest
        )

    return handle
}
