import { FC, useState, useEffect, Children } from "react";
import { SubtaskModel } from "../../models/SubtaskModel";
import{useForm} from "react-hook-form"
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from "clsx";
import { MarkCheckedButton } from "./MarkCheckedButton";
import { deleteDataById, putDataById } from "./../../services/api";
import {SubtaskOptionsButton} from "./SubtaskOptionsButton";
import {AddSubtaskAboveButton} from "./AddSubtaskAboveButton";
import {AddSubtaskBelowButton} from "./AddSubtaskBelowButton";
import {DeleteSubtaskButton} from "./DeleteSubtaskButton";
import { classNames } from "react-select/dist/declarations/src/utils";
import {EditDeadlineDialog} from "./EditDeadlineDialog";
import {RenameSubtaskDialog} from "./RenameSubtaskDialog"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



type Props = {
  subtask: SubtaskModel;
};

export const Subtask: FC<Props> = ({ subtask }) => {
  const today = new Date();
  const deadline = new Date(subtask.Deadline?.split("T", 1)[0] ?? "");

  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<SubtaskModel>(subtask);
  const [updated, setUpdated] = useState<boolean>(false);
  const [deleted, setDeleted]=useState<boolean>(false);
  const[isOpen,setOpen]=useState(false);



  useEffect(() => {
    const putSubtask = async () => {
      const result = await putDataById("https://localhost:7058/Subtask", task)
        .then((data) => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    };

  const deleteSubtask= async()=>{
    const result= await deleteDataById("https://localhost:7058/Subtask", "/"+task.SubTaskId.toString())
    .then(()=>{
      setError(null);
    })
    .catch((error)=>{
      setError(error.message)
    });
  };
    if (updated) {
      putSubtask();
      setUpdated(false);
    }
    if (deleted)
    {
      deleteSubtask();
      setDeleted(false);
    }
  }, [task]);

  const onclick =()=>{
  setOpen(!isOpen);
  };

  const onAddAboveClick=()=>{
      console.log("you pressed add above");
  };
  const onAddBelowClick=()=>{
    console.log("you pressed add below");

  };
  const onDeadlineChanged=(newDeadline: string)=>{
    setTask({ ...task, Deadline : newDeadline});
    setUpdated(true);
  }
  const onNameChanged=(newName:string)=>{
    setTask({ ...task, Title : newName});
    setUpdated(true);
  };

  const onEditClick=()=>{
  console.log("you pressed edit deadline");
 };
  const onDeleteClick=()=>{
    console.log("you pressed delete");
    setTask({ ...task});
    setDeleted(true)
    };
  return (
    <div>
      <div
        className={clsx(
          "p-3 flex flex-row flex-auto justify rounded-xl border-2 border-red-600 my-5 0",
          { "bg-red-600": today > deadline }
        )}
      >
        <Title title={subtask.Title} />
        <Deadline deadline={subtask.Deadline} />
        <MarkCheckedButton
          checked={task.Checked}
          onChange={() => {
            setTask({ ...task, Checked: !task.Checked });
            setUpdated(true);
          }}
           />
           <div className="row"> <SubtaskOptionsButton  
           onClick={onclick}
           />
            </div>
      </div>
     
      {isOpen&& <div className="flex flex-col">
        <AddSubtaskAboveButton 
           OnAddAboveClick={onAddAboveClick}
           />
                   <AddSubtaskBelowButton 
           OnAddBelowClick={onAddBelowClick}
           />
             <RenameSubtaskDialog subtask={subtask} onNameChanged={onNameChanged}/>
           <EditDeadlineDialog subtask={subtask} onDeadlineChanged={onDeadlineChanged}/>
          <DeleteSubtaskButton 
           OnDeleteClick={onDeleteClick}
           />
      </div>
        
       }
    </div>
  );
};
