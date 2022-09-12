import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { FC, useState } from 'react';

import { postData } from '../../services/api';

type Props = {
  position: number;
  todoListId: number;
  refetchList: () => void;
};

export const AddTodo: FC<Props> = ({ position, todoListId, refetchList }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const addSubtask = async () => {
    await postData('https://localhost:7058/Todo', {
      Title: name,
      Position: open === 'above' ? position : position + 1,
      Deadline: deadline,
      TodoListId: todoListId,
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
    <div>
      <button className="w-40 border-2 border-red-600" onClick={() => setOpen('above')}>
        Add Todo
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
