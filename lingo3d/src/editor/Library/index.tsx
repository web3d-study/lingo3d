import { h } from "preact"
import register from "preact-custom-element"
import { preventTreeShake } from "@lincode/utils"

preventTreeShake(h)

const Library = () => {
    return (
        <div
         className="lingo3d-ui"
         style={{
             width: 50,
             height: "100%",
             overflowX: "hidden",
             overflowY: "scroll",
             float: "left",
             background: "rgb(40, 41, 46)",
             padding: 10,
             boxSizing: "border-box",
             position: "relative"
         }}
        >
            
        </div>
    )
}

register(Library, "lingo3d-library")