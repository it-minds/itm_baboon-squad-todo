import * as React from 'react';

type Props = {
  OnDeleteClick: () => void;
};

export const DeleteSubtaskButton: React.FC<Props> = ({ OnDeleteClick }) => {
  return (
    <button className="border-2 text-5xl mx-20 text-blue-900 align-text-botton" onClick={OnDeleteClick}>
      Delete this subtask
    </button>
  );
};
