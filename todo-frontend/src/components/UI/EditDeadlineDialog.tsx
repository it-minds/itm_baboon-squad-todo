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
    <div  className='border-2'>
       <button onClick={handleOpen} title="Edit subtask deadline" >
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