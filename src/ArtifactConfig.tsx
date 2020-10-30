import React from "react"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { Artifact } from "./classes"

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
        <ExpansionPanel expanded={expanded} onChange={handleChange}>
            <ExpansionPanelSummary
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
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ArtifactConfig
