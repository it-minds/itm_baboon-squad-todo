import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC, useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { NewSubtaskModel } from '../../models/NewSubtaskModel';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubtaskModel } from "../../models/SubtaskModel";
import { Subtask } from './Subtask';




type Props = {
  onSubtaskAboveAdded:(newName:string, newDeadline: string)=> void;
  onSubtaskBelowAdded:(newName:string, newDeadline: string)=> void
};



export const AddSubtaskDialog: FC<Props> = ({ onSubtaskAboveAdded, onSubtaskBelowAdded }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isAccepted, setIsAccepted]= React.useState<boolean>(false);
  const [name, setName]= React.useState<string>("");
  const [deadline, setDeadline]=React.useState<string>("");
  
  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setDeadline("");
    setName("");
    setOpen(false)
  };
  const handleAcceptedAbove = () => {
    setOpen(false)
    onSubtaskAboveAdded(name, deadline)
    setDeadline("");
    setName("");
  };
  const handleAcceptedBelow = () => {
    setOpen(false)
    onSubtaskBelowAdded(name, deadline)
    setDeadline("");
    setName("");
  };

  return (
    <div className="flex flex-col">
       <button onClick={handleOpen} title="Add Subtask above"  className='border-2 text-start'>
        Add subtask above
       </button>
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       >
            <DialogTitle>
                Create new subtask
            </DialogTitle>
        <DialogContent className="flex-col">
          <DialogContentText id="alert-dialog-description">
            Here you can set name of the subtask
          </DialogContentText>
          <TextField value={name} onChange={(e)=>setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText id="NewDeadlinefield">
            Here you can set deadline of the subtask
          </DialogContentText>
          <TextField value={deadline} onChange={(e)=>setDeadline(e.target.value)}
            autoFocus
            margin="dense"
            id="deadline"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fortryd</Button>
          <Button  autoFocus onClick={handleAcceptedAbove} >
            Save
          </Button>
        </DialogActions>
        </Dialog>


        <button onClick={handleOpen} title="Rename subtask"  className='border-2 text-start'>
        Add subtask below
       </button>
       <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
       >
            <DialogTitle>
                Create new subtask
            </DialogTitle>
        <DialogContent className="flex-col">
          <DialogContentText id="alert-dialog-description">
            Here you can set name of the subtask
          </DialogContentText>
          <TextField value={name} onChange={(e)=>setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText id="NewDeadlinefield">
            Here you can set deadline of the subtask
          </DialogContentText>
          <TextField value={deadline} onChange={(e)=>setDeadline(e.target.value)}
            autoFocus
            margin="dense"
            id="deadline"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fortryd</Button>
          <Button  autoFocus onClick={handleAcceptedBelow} >
            Save
          </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
  
}