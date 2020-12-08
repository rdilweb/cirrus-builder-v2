import React from "react"
import { Grid } from "@material-ui/core"

interface Props {
    children: JSX.Element
}

const Centered = (props: Props) => {
    if (!props.children) return <div hidden />

    return (
        <Grid container justify="center">
            {props.children}
        </Grid>
    )
}

export default Centered
