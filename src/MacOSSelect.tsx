import React from "react"
import { InputLabel, MenuItem, Select } from "@material-ui/core"

const supportedMacOses = ["catalina-base", "catalina-xcode", "catalina-flutter"]

const selectors: Array<JSX.Element> = []

for (let i = 0; i < supportedMacOses.length; i++) {
    const os = supportedMacOses[i]
    selectors.push(<MenuItem value={os} key={os}>{os}</MenuItem>)
}

interface Props {
    select: string
    setSelect(newSelect: unknown): void
}

const MacOSSelect = (props: Props) => (
    <>
        <InputLabel id="macos-ctr">macOS Image</InputLabel>
        <Select
            labelId="macos-ctr"
            id="macos-ctr"
            value={props.select}
            onChange={(event) => props.setSelect(event.target.value)}
        >
            {selectors}
        </Select>
    </>
)

export default MacOSSelect
