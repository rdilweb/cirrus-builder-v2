import React from "react"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { Script } from "./classes"

interface Props {
    script: Script
}

export default (props: Props) => {
    const classes = makeStyles(theme => ({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0
        }
    }))()

    const [expanded, setExpanded] = React.useState(false)
    const handleChange = () => setExpanded(!setExpanded)

    if(!props.script) throw new Error("no script")

    return (
        <ExpansionPanel expanded={expanded} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`script-${props.script.getName()}-header`}
                id={`script-${props.script.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    General settings
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography variant="body1">Hello</Typography>
                <TextField
                    label="Script Name"
                    variant="outlined"
                    value={props.script.getName()}
                    onChange={event => props.script.setName(event.target.value)}
                />
                <br />
                <br />
                <TextField
                    label="Command"
                    variant="outlined"
                    value={props.script.getRun()}
                    onChange={event => props.script.setRun(event.target.value)}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
