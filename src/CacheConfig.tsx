import React from "react"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import { CICache } from "./classes"

interface Props {
    cache: CICache
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

    function rerender() {
        setForce(Math.random() * Math.random())
    }

    return (
        <ExpansionPanel expanded={expanded} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`cache-${props.cache.getName()}-header`}
                id={`cache-${props.cache.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    {props.cache.getName() !== ""
                        ? props.cache.getName()
                        : "Unnamed"}{" "}
                    Cache
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TextField
                    className={classes.space}
                    label="Cache Name"
                    variant="outlined"
                    value={props.cache.getName()}
                    onChange={event => {
                        props.cache.setName(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
                <TextField
                    className={classes.space}
                    label="Folder"
                    variant="outlined"
                    value={props.cache.getFolder()}
                    onChange={event => {
                        props.cache.setFolder(event.target.value)
                        rerender()
                    }}
                    required={true}
                />
                <TextField
                    className={classes.space}
                    label="Fingerprint Script"
                    variant="outlined"
                    value={props.cache.getFingerprint().getRun()}
                    onChange={event => {
                        props.cache.getFingerprint().setRun(event.target.value)
                        rerender()
                    }}
                />
                <TextField
                    className={classes.space}
                    label="Populate Script"
                    variant="outlined"
                    value={props.cache.getPopulate().getRun()}
                    onChange={event => {
                        props.cache.getPopulate().setRun(event.target.value)
                        rerender()
                    }}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
