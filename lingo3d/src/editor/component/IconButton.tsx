import { ComponentChildren } from "preact"
import { APPBAR_HEIGHT } from "../../globals"
import { stopPropagation } from "../utils/stopPropagation"

type IconButtonProps = {
    children?: ComponentChildren
    onClick?: () => void
    disabled?: boolean
    label?: string
    borderless?: boolean
    fill?: boolean
}

const IconButton = ({
    children,
    onClick,
    disabled,
    label,
    borderless,
    fill
}: IconButtonProps) => {
    return (
        <div
            ref={stopPropagation}
            onClick={disabled ? undefined : onClick}
            className="lingo3d-flexcenter"
            style={{
                minWidth: APPBAR_HEIGHT,
                height: APPBAR_HEIGHT - 4,
                opacity: disabled ? 0.1 : 1,
                cursor: disabled ? undefined : "pointer",
                background:
                    !borderless && fill
                        ? "rgba(255, 255, 255, 0.1)"
                        : undefined,
                border: !borderless
                    ? "1px solid rgba(255, 255, 255, 0.25)"
                    : undefined
            }}
        >
            {label && children && <div style={{ width: 10 }} />}
            {children}
            {label && (
                <div style={{ paddingLeft: 10, paddingRight: 10 }}>{label}</div>
            )}
        </div>
    )
}

export default IconButton
