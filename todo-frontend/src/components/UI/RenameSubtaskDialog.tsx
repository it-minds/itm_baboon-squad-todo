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
  onNameChanged:(newName: string)=> void
};



export const RenameSubtaskDialog: FC<Props> = ({subtask, onNameChanged}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue]= React.useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false)
  onNameChanged(value)};

    return (
    <div   className='border-2'>
       <button onClick={handleOpen} title="Rename subtask">
        Rename
       </button>
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       >
            <DialogTitle>
                Rename Subtask
            </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here you can rename the subtask
          </DialogContentText>
          <TextField value={value} onChange={(e)=>setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="text"
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