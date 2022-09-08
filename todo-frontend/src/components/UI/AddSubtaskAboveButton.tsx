import * as React from 'react';

type Props = {
  OnAddAboveClick: () => void;
};

export const AddSubtaskAboveButton: React.FC<Props> = ({ OnAddAboveClick }) => {
  return (
    <div className="border-2">

    <button onClick={OnAddAboveClick}>
      Add task above
    </button>
    </div>
  );
};
