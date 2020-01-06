import React from "react"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import TaskFactory from "./TaskFactory"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

export default props => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Cirrus Builder</Typography>
                </Toolbar>
            </AppBar>
            <Paper
                style={{
                    padding: "40px",
                    margin: "15px"
                }}
            >
                <TaskFactory />
            </Paper>
        </>
    )
}
