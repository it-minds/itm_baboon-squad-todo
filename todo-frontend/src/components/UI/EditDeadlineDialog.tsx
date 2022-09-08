import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC, useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubtaskModel } from "../../models/SubtaskModel";



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = { subtask: SubtaskModel;
  onDeadlineChanged:(newDeadline: string)=> void
};



export const EditDeadlineDialog: FC<Props> = ({subtask, onDeadlineChanged}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue]= React.useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false)
  onDeadlineChanged(value)};

    return (
    <div>
       <button onClick={handleOpen} title="Edit subtask deadline"  className='border-2 text-5xl mx-20 text-blue-900 align-text-bottom'>
       Edit subtask deadline
       </button>
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       >
            <DialogTitle>
                Edit subtask deadline
            </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here you can edit the deadline
          </DialogContentText>
          <TextField value={value} onChange={(e)=>setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fortryd</Button>
          <Button  autoFocus onClick={handleClose} >
            Save
          </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}