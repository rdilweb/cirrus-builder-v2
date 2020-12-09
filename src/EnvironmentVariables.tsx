import React from "react"
import { SelectorProps, EnvironmentVariable } from "./classes"
import {
    Typography,
    TextField,
    FormLabel,
    IconButton,
    Grid,
    FormControl,
    Chip,
} from "@material-ui/core"
import { Add, Https } from "@material-ui/icons"

const EnvironmentVariables = (props: SelectorProps<EnvironmentVariable[]>) => {
    const [currAddingName, setCurrAddingName] = React.useState("")
    const [currAddingVal, setCurrAddingVal] = React.useState("")

    /**
     * Add the environment variable typed in to the list.
     */
    function addCurrent() {
        const variable = new EnvironmentVariable()

        variable.setName(currAddingName)
        setCurrAddingName("")

        variable.value = currAddingVal
        setCurrAddingVal("")

        const varList = props.value.slice()
        varList.push(variable)

        props.setValue(varList)
    }

    function compileEncryptedToStyledJsx(encrypted: string): JSX.Element {
        if (!encrypted.includes("ENCRYPTED[")) {
            return <code>{encrypted}</code>
        }

        // 10th to 18th characters
        const first8Digits = encrypted.substring(10, 18)

        return (
            <Chip
                label={
                    <>
                        <span className="is-light-green">ENCRYPTED</span>[
                        {first8Digits}...]
                    </>
                }
                icon={<Https />}
            >
                {null}
            </Chip>
        )
    }

    return (
        <FormControl>
            <FormLabel component="legend">Add Environment Variable</FormLabel>
            <br />
            <Grid container>
                <Grid item>
                    <TextField
                        label="Variable Name"
                        variant="outlined"
                        value={currAddingName}
                        onChange={(event) =>
                            setCurrAddingName(event.target.value)
                        }
                        required={true}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        className="space-left"
                        label="Variable Value"
                        variant="outlined"
                        value={currAddingVal}
                        onChange={(event) =>
                            setCurrAddingVal(event.target.value)
                        }
                        required={true}
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={addCurrent}>
                        <Add />
                    </IconButton>
                </Grid>
            </Grid>
            <br />
            {props.value.map((envVar) => (
                <Typography key={envVar.getId()}>
                    {envVar.name}: {compileEncryptedToStyledJsx(envVar.value)}
                </Typography>
            ))}
        </FormControl>
    )
}

export default EnvironmentVariables
