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
import { Script, CICache, Machine, Artifact, machineType } from "./classes"
import ScriptConfig from "./ScriptConfig"
import CacheConfig from "./CacheConfig"
import Send from "@material-ui/icons/DoneOutlined"
import Centered from "./Centered"
import Popup from "./Popup"
import Upload from "@material-ui/icons/Backup"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-yaml"
import "ace-builds/src-noconflict/theme-xcode"
import ArtifactConfig from "./ArtifactConfig"

let cfgObjs: Array<Script | CICache | Artifact> = []
let mtype = new Machine()

export default () => {
    let [name, setName] = React.useState("") // current task name
    let [bsdImg, setBsdImg] = React.useState("")
    let [macImg, setMacImg] = React.useState("")
    let [dkrImage, setDkrImage] = React.useState("debian:latest")
    let [dialogIsOpen, setDialogIsOpen] = React.useState(false)
    // a state that allows us to make react think the dom needs
    // to be re-rendered when we change it.
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
            componentOsSelect = <WindowsSelect />
            break
        case "mac":
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

    /**
     * Rerenders the page.
     * It works, so please avoid touching it thanks :)
     */
    function rerender() {
        setForce(Math.random() * Math.random())
    }

    let drawers: Array<JSX.Element> = []
    cfgObjs.forEach(futureInstruction => {
        if (futureInstruction instanceof CICache) {
            drawers.push(
                <CacheConfig
                    cache={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        } else if (futureInstruction instanceof Script) {
            drawers.push(
                <ScriptConfig
                    script={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        } else {
            drawers.push(
                <ArtifactConfig
                    artifact={futureInstruction}
                    key={futureInstruction.getId()}
                />
            )
        }
    })

    const exportYaml = () => {
        let collectedInstructions = (() => {
            let e: string[] = []
            cfgObjs.forEach(c => {
                // the `return null` won't be reached when calling this
                // because the isCacheMember field won't be true
                e.push(c.toString() as string)
            })
            return e
        })()
        let instructionsString = collectedInstructions.join("\n    ")
        let value = `\
task:
    # Basic metadata:
    name: ${name}
    # The build machine:
    ${mtype.toString(macImg, bsdImg, dkrImage)}
    # Instructions:
    ${instructionsString}
`

        return (
            <AceEditor
                placeholder="Welcome to the YAML editor!"
                mode="yaml"
                theme="xcode"
                value={value}
                name={"YAML_EDITOR_" + String(Math.random() * 10)}
                editorProps={{ $blockScrolling: true }}
            />
        )
    }

    return (
        <form noValidate>
            {dialogIsOpen ? (
                <Popup
                    handleClose={setDialogIsOpen}
                    title={"Generated YAML"}
                    desc={exportYaml()}
                />
            ) : (
                <div hidden />
            )}
            <Grid container spacing={10}>
                <Grid item xs>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        required={true}
                        onChange={event => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Machine Type</FormLabel>
                        <RadioGroup
                            aria-label="machine-type"
                            name="machineType"
                            value={mtype.getType()}
                            onChange={event => {
                                mtype.setType(event.target.value as machineType)
                                rerender()
                            }}
                        >
                            <FormControlLabel
                                value="docker"
                                control={<Radio disableRipple />}
                                label="Docker Image"
                            />
                            <FormControlLabel
                                value="mac"
                                control={<Radio disableRipple />}
                                label="macOS"
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
                <Grid item xs>
                    {componentOsSelect}
                </Grid>
                <Grid item xs>
                    <Button
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
                    <br />
                    <br />
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
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Create />}
                        endIcon={<Upload />}
                        onClick={() => {
                            cfgObjs.push(new Artifact())
                            rerender()
                        }}
                    >
                        Add Artifact
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
}
