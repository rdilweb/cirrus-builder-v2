import React from "react"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const supportedWinOses = ["1709", "1803", "2019"]

let selectors: Array<JSX.Element> = []
for (let i = 0; i < supportedWinOses.length; i++) {
    const os = supportedWinOses[i]
    selectors.push(<MenuItem value={os}>{os}</MenuItem>)
}

interface Props {
    select: String
    setSelect(newSelect: unknown): void
}

export default (props: Props) => {
    return (
        <>
            <InputLabel id="win-ctr">Windows Container</InputLabel>
            <Select
                labelId="win-ctr"
                id="win-ctr"
                value={props.select}
                onChange={event => props.setSelect(event.target.value)}
            >
                {selectors}
            </Select>
        </>
    )
}
