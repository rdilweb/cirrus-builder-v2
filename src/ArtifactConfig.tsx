import React from "react"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Artifact } from "./classes"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    TextField,
} from "@material-ui/core"

interface ArtifactConfigProps {
    artifact: Artifact
}

const ArtifactConfig = (props: ArtifactConfigProps) => {
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = () => setExpanded(!expanded)
    const [, setForce] = React.useState(0)

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
                <Typography className="accordion-heading">
                    {props.artifact.getName() !== ""
                        ? props.artifact.getName()
                        : "Unnamed"}{" "}
                    Artifact
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    className="space"
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
                    className="space"
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
