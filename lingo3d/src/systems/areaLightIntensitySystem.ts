import { mapRange } from "@lincode/math"
import { getDistanceFromCamera } from "../memo/getDistanceFromCamera"
import AreaLight from "../display/lights/AreaLight"
import { lightDistancePtr } from "../pointers/lightDistancePtr"
import gameSystem from "./utils/gameSystem"

export const areaLightIntensitySystem = gameSystem({
    update: (self: AreaLight) => {
        if (!self.$light) return
        const intensityFactor = mapRange(
            getDistanceFromCamera(self),
            0,
            lightDistancePtr[0],
            1,
            0,
            true
        )
        self.$light.intensity = self.intensity * intensityFactor
        // self.light.visible = !!intensityFactor
    }
})
