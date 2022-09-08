import * as React from 'react';

type Props = {
  OnAddAboveClick: () => void;
};

export const AddSubtaskAboveButton: React.FC<Props> = ({ OnAddAboveClick }) => {
  return (
    <button className="border-2 text-5xl mx-20 text-blue-900 align-text-botton" onClick={OnAddAboveClick}>
      Add a new subtask above
    </button>
  );
};
