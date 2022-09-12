import { Button, DialogActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { FC, useState } from 'react';

import { postData } from '../../services/api';

type Props = {
  position: number;
  todoId: number;
  refetchList: () => void;
};

export const AddSubtaskDialog: FC<Props> = ({ position, todoId, refetchList }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const addSubtask = async () => {
    await postData('https://localhost:7058/Subtask', {
      Title: name,
      Position: open === 'above' ? position : position + 1,
      Deadline: deadline,
      TodoId: todoId,
    })
      .then(() => {
        refetchList();
      })
      .catch((error) => {});
    clearFields();
  };

  const clearFields = () => {
    setOpen(null);
    setDeadline('');
    setName('');
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => setOpen('above')} title="Add Subtask above" className="border-2 text-start">
        Add subtask above
      </button>
      <button onClick={() => setOpen('below')} title="Rename subtask" className="border-2 text-start">
        Add subtask below
      </button>
      <Dialog
        open={open !== null}
        onClose={() => clearFields()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Create new subtask</DialogTitle>
        <DialogContent className="flex-col">
          <DialogContentText id="alert-dialog-description">Here you can set name of the subtask</DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText id="NewDeadlinefield">Here you can set deadline of the subtask</DialogContentText>
          <TextField
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            autoFocus
            margin="dense"
            id="deadline"
            type="date"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => clearFields()}>Cancel</Button>
          <Button autoFocus onClick={addSubtask}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
