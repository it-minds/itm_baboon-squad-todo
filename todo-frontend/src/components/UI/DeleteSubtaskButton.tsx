import * as React from 'react';

type Props = {
  OnDeleteClick: () => void;
};

export const DeleteSubtaskButton: React.FC<Props> = ({ OnDeleteClick }) => {
  return (
    <div className="border-2">
      <button  onClick={OnDeleteClick}>
        Delete current subtask
      </button>
    </div>
  );
};
