/**
 * Basically the main class, I would make it
 * TypeScript, but we can't yet due to the
 * state getters and setters
 */

import React from "react"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import FreeBSDSelect from "./FreeBSDSelect"
import WindowsSelect from "./WindowsSelect"
import MacOSSelect from "./MacOSSelect"
import DockerSelect from "./DockerSelect"
import Button from "@material-ui/core/Button"
import Create from "@material-ui/icons/Create"
import Cache from "@material-ui/icons/Cached"
import Code from "@material-ui/icons/Code"
import { withStyles } from "@material-ui/core/styles"
import { Script, CICache, Machine } from "./classes"
import ScriptConfig from "./ScriptConfig"
import CacheConfig from "./CacheConfig"
import Send from "@material-ui/icons/DoneOutlined"
import Centered from "./Centered"
import Popup from "./Popup"
import { Errors } from "./Static"

let cfgObjs = []
let mtype = new Machine()

export default withStyles({
    space: {
        marginBottom: "12px"
    }
})(props => {
    let [name, setName] = React.useState("") // current task name
    let [bsdImg, setBsdImg] = React.useState("")
    let [winImg, setWinImg] = React.useState("")
    let [macImg, setMacImg] = React.useState("")
    let [dkrImage, setDkrImage] = React.useState("debian:latest")
    let [dialogIsOpen, setDialogIsOpen] = React.useState(false)
    // a state that allows us to make react think the dom needs
    // to be re-rendered.
    // eslint-disable-next-line
    let [forceRerender, setForce] = React.useState(0)

    let componentOsSelect
    switch (mtype.getType()) {
        case "docker":
            componentOsSelect = (
                <DockerSelect dkrImage={dkrImage} setDkrImage={setDkrImage} />
            )
            break
        case "win":
            componentOsSelect = (
                <WindowsSelect select={winImg} setSelect={setWinImg} />
            )
            break
        case "macos":
            componentOsSelect = (
                <MacOSSelect select={macImg} setSelect={setMacImg} />
            )
            break
        default:
            componentOsSelect = (
                <FreeBSDSelect select={bsdImg} setSelect={setBsdImg} />
            )
            break
    }

    function rerender() {
        setForce(Math.random() * Math.random())
    }

    let drawers = []
    cfgObjs.forEach(futureYamlNode => {
        drawers.push(
            futureYamlNode instanceof CICache ? (
                <CacheConfig
                    cache={futureYamlNode}
                    key={futureYamlNode.getId()}
                />
            ) : (
                <ScriptConfig
                    script={futureYamlNode}
                    key={futureYamlNode.getId()}
                />
            )
        )
    })

    const anyAreTrue = bools => {
        let e = false
        bools.forEach(bl => {
            if (bl) e = true
        })
        return e
    }

    const canExport = () => {
        /* eslint-disable */
        let anyUnnamed = false
        cfgObjs.forEach(o => {
            if (o.getName() == "") {
                anyUnnamed = true
            }
        })
        return !anyAreTrue([
            cfgObjs == [],
            anyUnnamed,
            name == "",
            (
                mtype.getType() == "mac"
                && macImg == ""
            ),
            (
                mtype.getType() == "win"
                && winImg == ""
            ),
            (
                mtype.getType() == "fbsd"
                && bsdImg == ""
            )
        ])
        /* eslint-enable */
    }

    const exportYaml = () => {
        return `
task:\n
  name: ${name}
${mtype.toString()}
`
    }

    return (
        <form noValidate autoComplete="off">
            {dialogIsOpen ? (
                <Popup
                    handleClose={setDialogIsOpen}
                    title={
                        canExport()
                            ? "Generated YAML"
                            : "It looks like there was an error"
                    }
                    desc={canExport() ? exportYaml() : <Errors />}
                />
            ) : (
                <div hidden />
            )}
            <Grid container spacing={10}>
                <Grid item xs={3}>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Machine Type</FormLabel>
                        <RadioGroup
                            aria-label="machine-type"
                            name="machineType"
                            value={mtype.getType()}
                            onChange={event => {
                                mtype.setType(event.target.value)
                                rerender()
                            }}
                        >
                            <FormControlLabel
                                value="docker"
                                control={<Radio disableRipple />}
                                label="Docker"
                            />
                            <FormControlLabel
                                value="macos"
                                control={<Radio disableRipple />}
                                label="macOS (via Anka)"
                            />
                            <FormControlLabel
                                value="win"
                                control={<Radio disableRipple />}
                                label="Windows"
                            />
                            <FormControlLabel
                                value="fbsd"
                                control={<Radio disableRipple />}
                                label="FreeBSD"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    {componentOsSelect}
                </Grid>
                <Grid item xs={3}>
                    <Button
                        className={props.classes.space}
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Code />}
                        onClick={() => {
                            cfgObjs.push(new Script())
                            rerender()
                        }}
                    >
                        Add Script
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Cache />}
                        onClick={() => {
                            cfgObjs.push(new CICache())
                            rerender()
                        }}
                    >
                        Add Cache
                    </Button>
                </Grid>
            </Grid>
            <br />
            <br />
            {drawers}
            <br />
            <Centered>
                <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<Send />}
                    onClick={() => setDialogIsOpen(true)}
                >
                    Export
                </Button>
            </Centered>
        </form>
    )
})
