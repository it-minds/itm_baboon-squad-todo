import * as React from 'react';

type Props = {
  OnEditDeadlineClick: () => void;
};

export const EditSubtaskDeadlineButton: React.FC<Props> = ({ OnEditDeadlineClick }) => {
  return (
    <button className="border-2 text-5xl mx-20 text-blue-900 " onClick={OnEditDeadlineClick}>
      Edit the deadline of this subtask
    </button>
  );
};
