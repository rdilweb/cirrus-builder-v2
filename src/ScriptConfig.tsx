import React from "react"
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { Script } from "./classes"

interface Props {
    script: Script
}

const ScriptConfig = (props: Props) => {
    const classes = makeStyles((theme) => ({
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
    const [, setForce] = React.useState(0)

    function rerender() {
        setForce(Math.random() * Math.random())
    }

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`script-${props.script.getName()}-header`}
                id={`script-${props.script.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    {props.script.getName() !== ""
                        ? props.script.getName()
                        : "Unnamed"}{" "}
                    Script
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    className={classes.space}
                    label="Script Name"
                    variant="outlined"
                    value={props.script.getName()}
                    onChange={(event) => {
                        props.script.setName(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
                <TextField
                    className={classes.space}
                    label="Command"
                    variant="outlined"
                    value={props.script.getRun()}
                    onChange={(event) => {
                        props.script.setRun(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default ScriptConfig
