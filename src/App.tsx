import React from "react"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import TaskFactory from "./TaskFactory"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

export default () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="View Source Code">
                        <a
                            href="https://github.com/RDIL/cirrus-builder-v2"
                            target="_blank"
                            style={{
                                color: "inherit"
                            }}
                            rel="noopener noreferrer"
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        </a>
                    </Tooltip>
                    <Typography variant="h6">Cirrus CI Configuration Builder</Typography>
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
