import React from "react"
import TextField from "@material-ui/core/TextField"

interface Props {
    dkrImage: string
    setDkrImage(newImage: string): void
}

export default (props: Props) => {
    let error = !props.dkrImage.includes(":")
    return (
        <TextField
            label="Docker Image"
            variant="outlined"
            value={props.dkrImage}
            onChange={event => props.setDkrImage(event.target.value)}
            error={error}
            helperText={
                error ? "That doesn't look like a vaild Docker image!" : ""
            }
        />
    )
}
