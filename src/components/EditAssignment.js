import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {SERVER_URL} from "../constants";

function EditAssignment(props) {
    const [open, setOpen] = useState(false);
    const [assignment, setAssignment] = useState({assignmentName:"",dueDate:""});
    const [validDate, setValidDate] = useState(true);

    const handleClickOpen = (event) => {
        const index = props.data.findIndex((item) => item.id === assignment.id);

        if (index !== -1) {
            setAssignment(props.data[index]);
            setOpen(true);
        }
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

    const updateAssignment = () => {
        if (!validDate) {
            console.log("Invalid date format. Please use yyyy-mm-dd format.");
            return;
        }

        fetch(`${SERVER_URL}/assignment/${assignment.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignment),
        })
            .then((res) => {
                if(res.ok){
                    console.log("Assignment Updated");
                }else{
                    console.log("Error: " + res.status);
                }
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <div>
            <button type="button" margin="auto" onClick={handleClickOpen}>Edit</button>
            <Dialog open={open}>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogContent style={{paddingTop:20}}>
                    <TextField fullWidth label="assignment name" name="assignmentName" value={assignment.assignmentName} InputProps={{readOnly: true,}}/>
                    <TextField fullWidth label="Due Date" name="dueDate" value={assignment.dueDate} onChange={handleChange} error={!validDate} helperText={!validDate ? "Please use yyyy-mm-dd format." : ""} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                    <Button color="Primary" onClick={updateAssignment}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditAssignment;