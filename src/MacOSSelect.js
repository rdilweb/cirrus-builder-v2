import React from "react"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const supportedMacOses = ["base", "xcode", "flutter"]

let selectors = []
for (let i = 0; i < supportedMacOses.length; i++) {
    const os = supportedMacOses[i]
    selectors.push(<MenuItem value={os}>{os}</MenuItem>)
}

export default props => {
    return (
        <>
            <InputLabel id="macos-ctr">macOS Image</InputLabel>
            <Select
                labelId="macos-ctr"
                id="macos-ctr"
                value={props.select}
                onChange={event => props.setSelect(event.target.value)}
            >
                {selectors}
            </Select>
        </>
    )
}
