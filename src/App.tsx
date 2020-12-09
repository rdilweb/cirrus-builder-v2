import React from "react"
import {
    Typography,
    Paper,
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
} from "@material-ui/core"
import TaskFactory from "./TaskFactory"
import GitHubIcon from "@material-ui/icons/GitHub"

const App = () => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Cirrus CI Configuration Builder
                </Typography>
                <Tooltip title="View on GitHub">
                    <a
                        href="https://github.com/rdilweb/cirrus-builder-v2"
                        target="_blank"
                        style={{
                            color: "inherit",
                        }}
                        rel="noopener noreferrer"
                    >
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </Tooltip>
            </Toolbar>
        </AppBar>
        <Paper
            style={{
                padding: "40px",
                margin: "15px",
                paddingBottom: "75px",
            }}
            elevation={4}
        >
            <TaskFactory />
        </Paper>
    </>
)

export default App
