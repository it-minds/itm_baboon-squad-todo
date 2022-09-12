import { FC } from 'react';

import { deleteDataById } from '../../services/api';

type Props = {
  subtaskId: number;
  refetchList: () => void;
};

export const DeleteSubtaskButton: FC<Props> = ({ subtaskId, refetchList }) => {
  const deleteSubtask = async () => {
    await deleteDataById(`https://localhost:7058/Subtask/${subtaskId.toString()}`)
      .then(() => {})
      .catch((error) => {});
    refetchList();
  };

  return (
    <div className="border-2">
      <button onClick={deleteSubtask}>Delete current subtask</button>
    </div>
  );
};
