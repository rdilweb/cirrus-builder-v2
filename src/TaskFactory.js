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

export default props => {
    let [name, setName] = React.useState("")
    let [taskType, setTaskType] = React.useState("docker")
    let [bsdImg, setBsdImg] = React.useState("")
    let [winImg, setWinImg] = React.useState("")

    let componentOsSelect
    switch (taskType) {
        case "win":
            componentOsSelect = (
                <WindowsSelect select={winImg} setSelect={setWinImg} />
            )
            break
        default:
            componentOsSelect = (
                <FreeBSDSelect select={bsdImg} setSelect={setBsdImg} />
            )
            break
    }

    return (
        <form noValidate autoComplete="off">
            <Grid container spacing={12}>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-basic"
                        label="Task Name"
                        variant="outlined"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Machine Type</FormLabel>
                        <RadioGroup
                            aria-label="machine-type"
                            name="machineType"
                            value={taskType}
                            onChange={event => setTaskType(event.target.value)}
                        >
                            <FormControlLabel
                                value="docker"
                                control={<Radio />}
                                label="Docker"
                            />
                            <FormControlLabel
                                value="macos"
                                control={<Radio />}
                                label="macOS (via Anka)"
                            />
                            <FormControlLabel
                                value="win"
                                control={<Radio />}
                                label="Windows"
                            />
                            <FormControlLabel
                                value="fbsd"
                                control={<Radio />}
                                label="FreeBSD"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    {componentOsSelect}
                </Grid>
            </Grid>
        </form>
    )
}
