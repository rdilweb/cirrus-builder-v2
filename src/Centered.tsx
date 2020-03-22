import React from "react"
import Grid from "@material-ui/core/Grid"

interface Props {
    children: JSX.Element
}

export default (props: Props) => {
    if (!props.children) return <div hidden />

    return (
        <Grid container justify="center">
            {props.children}
        </Grid>
    )
}
