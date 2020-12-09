import React from "react"
import TextField from "@material-ui/core/TextField"
import { SelectorProps } from "./classes"

const DockerSelect = (props: SelectorProps<string>) => {
    const error = !props.value.includes(":")

    return (
        <TextField
            label="Docker Image"
            variant="outlined"
            value={props.value}
            onChange={(event) => props.setValue(event.target.value)}
            error={error}
            helperText={
                error ? "That doesn't look like a vaild Docker image!" : ""
            }
        />
    )
}

export default DockerSelect
