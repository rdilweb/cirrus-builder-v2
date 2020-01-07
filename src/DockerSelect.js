import React from "react"

import TextField from "@material-ui/core/TextField"

export default props => {
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
