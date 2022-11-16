import Cube from "../display/primitives/Cube"
import Timeline from "../display/Timeline"

const box = new Cube()

// box.animation = {
//     rotationX: [0, 180, 360],
//     x: [0, 100, 0]
// }

const timeline = new Timeline()
timeline.setData({
    [box.uuid]: {
        x: [
            [0, 0],
            [60, 1],
            [120, 0]
        ]
    }
})
