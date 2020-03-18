import React from "react"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

export default props => {
    const t = React.forwardRef((properties, ref) => (
        <Slide direction="up" ref={ref} {...properties} />
    ))

    return (
        <Dialog
            open={true}
            TransitionComponent={t}
            onClose={() => props.handleClose(false)}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.desc}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.handleClose(false)}
                    color="primary"
                >
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    )
}
