import React from "react"
import Typography from "@material-ui/core/Typography"

export const Errors = () => <div>
    <Typography>Make sure all of these criteria are filled:</Typography>
    <ul>
        <li>The task has a title</li>
        <li>The task has a valid machine selected</li>
        <li>All scripts/caches have a valid name (no spaces!)</li>
    </ul>
</div>
