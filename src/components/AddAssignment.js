import React, { useState } from 'react';
import {SERVER_URL} from '../constants'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function AddAssignment(props) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState({ assignmentName:'', dueDate:'', courseId: '' });

    const handleOpen = () => {
        setMessage('');
        setAssignment({ assignmentName:'', dueDate:'', courseId: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleChange = (event) => {
        setAssignment({...assignment, [event.target.name]:event.target.value });
    }

    const addAssignment = ( ) => {
        fetch(`${SERVER_URL}/assignment`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(assignment)
            }
        )
            .then((response) => {
                if (response.ok) {
                    setMessage('Assignment added.');
                } else {
                    setMessage("Add failed.");
                }
            } )
            .catch((err) =>  { setMessage('Error. '+err) } );
    }

    return (
        <div>
            <button type="button" margin="auto" onClick={handleOpen}>Add Assignment</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Assignment</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <h4>{message}</h4>
                    <TextField autoFocus fullWidth label="Name" name="assignmentName" onChange={handleChange}  />
                    <TextField fullWidth label="Due Date" name="dueDate" helperText="yyyy-mm-dd" onChange={handleChange}  />
                    <TextField fullWidth label="Course ID" name="courseId" onChange={handleChange}  />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                    <Button id="add" color="primary" onClick={addAssignment}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAssignment;