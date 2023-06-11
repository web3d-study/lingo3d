import { useSignal } from "@preact/signals"
import AppBar from "../component/bars/AppBar"
import CloseableTab from "../component/tabs/CloseableTab"
import OutputConsole from "./OutputConsole"
import Terminal from "./Terminal"
import { PANELS_HEIGHT } from "../../globals"

const Console = () => {
    const selectedSignal = useSignal<Array<string>>([])
    const consoleSelected = selectedSignal.value.at(-1) === "console"

    return (
        <div
            className="lingo3d-ui lingo3d-bg lingo3d-flexcol"
            style={{ height: PANELS_HEIGHT }}
        >
            <AppBar>
                <CloseableTab selectedSignal={selectedSignal}>
                    console
                </CloseableTab>
                {/* <CloseableTab selectedSignal={selectedSignal}>
                    terminal
                </CloseableTab> */}
            </AppBar>
            <OutputConsole
                style={{ display: consoleSelected ? "block" : "none" }}
            />
            {/* <Terminal style={{ display: consoleSelected ? "none" : "block" }} /> */}
        </div>
    )
}

export default Console