import React from "react"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"

interface Props {
    title: {
        getter: String
        setter(newName: String): void
    }
    runnables: {
        getter: Array<String>
        setter(newArray: Array<String>): void
    }
}

export default (props: Props) => {
    return (
        <Paper
            style={{
                padding: "40px",
                margin: "15px"
            }}
        >
            <TextField
                label="Script Name"
                variant="outlined"
                value={props.title.getter}
                onChange={event => props.title.setter(
                    event.target.value
                )}
            />
        </Paper>
    )
}
