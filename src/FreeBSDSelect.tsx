import React from "react"
import { InputLabel, MenuItem, Select } from "@material-ui/core"
import { SelectorProps } from "./classes"

const supportedFreeBsdOses = [
    "freebsd-13-0-snap",
    "freebsd-12-1-snap",
    "freebsd-12-1",
    "freebsd-12-0",
    "freebsd-11-3-snap",
    "freebsd-11-3",
]

const selectors: Array<JSX.Element> = []

for (let i = 0; i < supportedFreeBsdOses.length; i++) {
    const os = supportedFreeBsdOses[i]
    selectors.push(
        <MenuItem value={os} key={os}>
            {os}
        </MenuItem>
    )
}

const FreeBSDSelect = (props: SelectorProps<string>) => (
    <>
        <InputLabel id="freebsd-idr">FreeBSD Image</InputLabel>
        <Select
            labelId="freebsd-idr"
            id="freebsd-idr"
            value={props.value}
            onChange={(event) => props.setValue(event.target.value as string)}
        >
            {selectors}
        </Select>
    </>
)

export default FreeBSDSelect
