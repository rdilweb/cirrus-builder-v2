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
            flexShrink: 0,
        },
        space: {
            margin: theme.spacing(1),
        },
    }))()

    const [expanded, setExpanded] = React.useState(false)
    const handleChange = () => setExpanded(!expanded)
    // eslint-disable-next-line
    let [forceRerender, setForce] = React.useState(0)

    if (!props.script) throw new Error("no script")

    function rerender() {
        setForce(Math.random() * Math.random())
    }

    return (
        <ExpansionPanel expanded={expanded} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`script-${props.script.getName()}-header`}
                id={`script-${props.script.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    {props.script.getName() !== ""
                        ? props.script.getName()
                        : "Unnamed"}{" "}
                    Script
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TextField
                    className={classes.space}
                    label="Script Name"
                    variant="outlined"
                    value={props.script.getName()}
                    onChange={event => {
                        props.script.setName(event.target.value)
                        rerender()
                    }}
                />
                <TextField
                    className={classes.space}
                    label="Command"
                    variant="outlined"
                    value={props.script.getRun()}
                    onChange={event => {
                        props.script.setRun(event.target.value)
                        rerender()
                    }}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
