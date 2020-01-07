import React from "react"
import TextField from "@material-ui/core/TextField"

interface Props {
    dkrImage: String
    setDkrImage(newImage: String): void
}

export default (props: Props) => {
    return (
        <TextField
            id="outlined-basic"
            label="Docker Image"
            variant="outlined"
            value={props.dkrImage}
            onChange={event => props.setDkrImage(event.target.value)}
        />
    )
}
