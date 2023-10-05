import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants';


function EditAssignment(props) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState(props.assignment)

    const handleOpen = () => {
        setMessage('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleChange = (event) => {
        setAssignment({...assignment, [event.target.name]:event.target.value });
    }

    const saveAssignment = () => {
        fetch(`${SERVER_URL}/assignment/${assignment.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(assignment)
            }
        )
            .then((response) => {
                if (response.ok) {
                    setMessage('Assignment saved.');
                } else {
                    setMessage("Save failed. " + response.status);
                }
            } )
            .catch((err) =>  { setMessage('Error. '+err) } );
    }

    return (
        <div>
            <button type="button" margin="auto" onClick={handleOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <h4>{message}</h4>
                    <TextField fullWidth label="Id" name="id" value={assignment.id} InputProps={{readOnly: true, }}/>
                    <TextField autoFocus fullWidth label="Name" name="assignmentName" value={assignment.assignmentName} onChange={handleChange}  />
                    <TextField fullWidth label="Due Date" name="dueDate" value={assignment.dueDate} onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                    <Button color="primary" onClick={saveAssignment}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditAssignment;