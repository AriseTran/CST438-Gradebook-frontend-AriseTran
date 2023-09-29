import React, { useState } from 'react';
import {SERVER_URL} from "../constants";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

function AddAssignment(props) {
    const [open, setOpen] = useState(false);
    const [assignment, setAssignment] = useState({assignmentName:"",dueDate:""});
    const [validDate, setValidDate] = useState(true);

    const handleClickOpen = (event) => {
        setOpen(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        const isValidDate = datePattern.test(value);

        setValidDate(isValidDate);
        setAssignment({ ...assignment, [name]: value });
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    }

    const addAssignment = () => {
        if (!validDate) {
            console.log("Invalid date format. Please use yyyy-mm-dd format.");
            return;
        }

        fetch(`${SERVER_URL}/assignment/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignment),
        })
            .then((res) => {
                if(res.ok){
                    console.log("Assignment added");
                    handleClose();
                }else{
                    console.log("Error: " + res.status);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin:10}} onClick={handleClickOpen}>Add Assignment</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent style={{padding:15}}>
                    <TextField autoFocus fullWidth label="assignmentName" name="assignmentName" onChange={handleChange}/>
                    <br/>
                    <TextField autoFocus fullWidth label="dueDate" name="dueDate" onChange={handleChange} error={!validDate} helperText={!validDate ? "Please use yyyy-mm-dd format." : ""}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                    <Button color="Primary" onClick={addAssignment}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddAssignment;