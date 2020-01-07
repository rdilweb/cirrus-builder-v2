import React from "react"
import TextField from "@material-ui/core/TextField"
import { Script } from "./classes"

interface Props {
    script: Script
    scriptList: Array<Script>
    setScriptList(newList: Array<Script>): void
}

export default (props: Props) => {
    let e = props.script
    let [tmpName, setTmpName] = React.useState(e.getName())
    let [tmpRun, setTmpRun] = React.useState(e.getRun())

    return (
        <>
            <br />
            <TextField
                label="Script Name"
                variant="outlined"
                value={tmpName}
                onChange={event => setTmpName(event.target.value)}
            />
            <br />
            <br />
            <TextField
                label="Command"
                variant="outlined"
                value={tmpRun}
                onChange={event => setTmpRun(event.target.value)}
            />
        </>
    )
}
