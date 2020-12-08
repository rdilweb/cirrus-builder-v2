import React from "react"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"
import { Artifact } from "./classes"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    TextField,
} from "@material-ui/core"

interface Props {
    artifact: Artifact
}

const ArtifactConfig = (props: Props) => {
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
    let [, setForce] = React.useState(0)

    function rerender() {
        setForce(Math.random() * Math.random())
    }

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`artifact-${props.artifact.getName()}-header`}
                id={`artifact-${props.artifact.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    {props.artifact.getName() !== ""
                        ? props.artifact.getName()
                        : "Unnamed"}{" "}
                    Artifact
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    className={classes.space}
                    label="Artifact Name"
                    variant="outlined"
                    value={props.artifact.getName()}
                    onChange={(event) => {
                        props.artifact.setName(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
                <TextField
                    className={classes.space}
                    label="Path"
                    variant="outlined"
                    value={props.artifact.getPath()}
                    onChange={(event) => {
                        props.artifact.setPath(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default ArtifactConfig
