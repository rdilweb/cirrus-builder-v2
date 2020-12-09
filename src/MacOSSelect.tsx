import React from "react"
import { InputLabel, MenuItem, Select } from "@material-ui/core"
import { SelectorProps } from "./classes"

const supportedMacOses = ["catalina-base", "catalina-xcode", "catalina-flutter"]

const selectors: Array<JSX.Element> = []

for (let i = 0; i < supportedMacOses.length; i++) {
    const os = supportedMacOses[i]
    selectors.push(
        <MenuItem value={os} key={os}>
            {os}
        </MenuItem>
    )
}

const MacOSSelect = (props: SelectorProps<string>) => (
    <>
        <InputLabel id="macos-ctr">macOS Image</InputLabel>
        <Select
            labelId="macos-ctr"
            id="macos-ctr"
            value={props.value}
            onChange={(event) => props.setValue(event.target.value as string)}
        >
            {selectors}
        </Select>
    </>
)

export default MacOSSelect
