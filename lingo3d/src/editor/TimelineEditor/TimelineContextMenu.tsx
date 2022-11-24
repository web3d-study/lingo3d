import { get, set } from "@lincode/utils"
import { useState } from "preact/hooks"
import { uuidMap } from "../../api/core/collections"
import Timeline from "../../display/Timeline"
import TimelineAudio from "../../display/TimelineAudio"
import { emitSelectionTarget } from "../../events/onSelectionTarget"
import { emitTimelineClearKeyframe } from "../../events/onTimelineClearKeyframe"
import { AnimationData } from "../../interface/IAnimationManager"
import ContextMenu from "../component/ContextMenu"
import MenuItem from "../component/ContextMenu/MenuItem"
import { setSceneGraphExpanded } from "../states/useSceneGraphExpanded"
import { getTimeline, setTimeline } from "../states/useTimeline"
import { useTimelineContextMenu } from "../states/useTimelineContextMenu"
import { processKeyframe } from "../states/useTimelineData"
import { getTimelineFrame } from "../states/useTimelineFrame"

const TimelineContextMenu = () => {
    const [menu, setMenu] = useTimelineContextMenu()
    const [dataCopied, setDataCopied] = useState<AnimationData>()

    return (
        <ContextMenu
            position={menu}
            setPosition={setMenu}
            input={
                menu?.create &&
                (menu.create === "audio" ? "Audio name" : "Timeline name")
            }
            onInput={(value) => {
                if (menu?.create === "audio") {
                    const timeline = getTimeline()
                    if (!timeline) return

                    const audio = new TimelineAudio(value)
                    timeline.mergeData({ [audio.uuid]: {} })
                    timeline.append(audio)
                    setSceneGraphExpanded(new Set([timeline.outerObject3d]))
                    emitSelectionTarget(audio)
                    return
                }
                const timeline = new Timeline()
                timeline.name = value
                timeline.data = {}
                setTimeline(timeline)
                emitSelectionTarget(timeline)
            }}
        >
            <MenuItem
                disabled={menu?.keyframe}
                onClick={() => {
                    processKeyframe((timelineData, uuid, property, frame) =>
                        set(
                            timelineData,
                            [uuid, property, frame],
                            (uuidMap.get(uuid) as any)[property]
                        )
                    )
                    setMenu(undefined)
                }}
            >
                Add keyframe
            </MenuItem>
            <MenuItem
                disabled={!menu?.keyframe}
                onClick={() => {
                    const data: AnimationData = {}
                    processKeyframe(
                        (timelineData, uuid, property, frame) =>
                            set(
                                data,
                                [uuid, property, "0"],
                                get(timelineData, [uuid, property, frame])
                            ),
                        true
                    )
                    setDataCopied(data)
                    setMenu(undefined)
                }}
            >
                Copy keyframe
            </MenuItem>
            <MenuItem
                disabled={!dataCopied}
                onClick={
                    dataCopied
                        ? () => {
                              const data: AnimationData = {}
                              const frame = getTimelineFrame() + ""
                              for (const [uuid, properties] of Object.entries(
                                  dataCopied
                              ))
                                  for (const [
                                      property,
                                      frames
                                  ] of Object.entries(properties))
                                      for (const value of Object.values(frames))
                                          set(
                                              data,
                                              [uuid, property, frame],
                                              value
                                          )
                              getTimeline()?.mergeData(data)
                              setMenu(undefined)
                          }
                        : undefined
                }
            >
                Paste keyframe
            </MenuItem>
            <MenuItem
                disabled={!menu?.keyframe}
                onClick={() => {
                    emitTimelineClearKeyframe()
                    setMenu(undefined)
                }}
            >
                Clear keyframe
            </MenuItem>
        </ContextMenu>
    )
}

export default TimelineContextMenu
