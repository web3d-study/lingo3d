import boxHelper from "./boxHelper"
import skeletonHelper from "./skeletonHelper"
import mainOrbitControls from "./mainOrbitCamera"
import transformControls from "./transformControls"
import gridHelper from "./gridHelper"
import referencePlane from "./referencePlane"
import skyShader from "./skyShader"
import render from "./renderLoop"
import { preventTreeShake } from "@lincode/utils"

preventTreeShake([render, skyShader, referencePlane, gridHelper, transformControls, mainOrbitControls, boxHelper, skeletonHelper])

export default {}