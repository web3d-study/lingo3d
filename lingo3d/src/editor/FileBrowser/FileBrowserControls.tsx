import IconButton from "../component/IconButton"
import AppBar from "../component/bars/AppBar"
import AddIcon from "./icons/AddIcon"
import RenameIcon from "./icons/RenameIcon"
import DeleteIcon from "./icons/DeleteIcon"
import useSyncState from "../hooks/useSyncState"
import { getFileSelected } from "../../states/useFileSelected"

const FileBrowserControls = () => {
    const fileSelected = useSyncState(getFileSelected)

    return (
        <AppBar style={{ gap: 4 }}>
            <IconButton label="create">
                <AddIcon />
            </IconButton>
            <IconButton label="rename" disabled={!fileSelected}>
                <RenameIcon />
            </IconButton>
            <IconButton label="delete" disabled={!fileSelected}>
                <DeleteIcon />
            </IconButton>
        </AppBar>
    )
}
export default FileBrowserControls
