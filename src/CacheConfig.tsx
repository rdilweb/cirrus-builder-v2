import React from "react"
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"
import { CICache } from "./classes"

interface Props {
    cache: CICache
}

const CacheConfig = (props: Props) => {
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
                aria-controls={`cache-${props.cache.getName()}-header`}
                id={`cache-${props.cache.getName()}-header`}
            >
                <Typography className={classes.heading}>
                    {props.cache.getName() !== ""
                        ? props.cache.getName()
                        : "Unnamed"}{" "}
                    Cache
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    className={classes.space}
                    label="Cache Name"
                    variant="outlined"
                    value={props.cache.getName()}
                    onChange={(event) => {
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
                    onChange={(event) => {
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
                    onChange={(event) => {
                        props.cache.getFingerprint().setRun(event.target.value)
                        rerender()
                    }}
                />
                <TextField
                    className={classes.space}
                    label="Populate Script"
                    variant="outlined"
                    value={props.cache.getPopulate().getRun()}
                    onChange={(event) => {
                        props.cache.getPopulate().setRun(event.target.value)
                        rerender()
                    }}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default CacheConfig
