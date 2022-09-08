import * as React from 'react';

type Props = {
  OnAddBelowClick: () => void;
};

export const AddSubtaskBelowButton: React.FC<Props> = ({ OnAddBelowClick }) => {
  return (
    <button className="border-2 text-5xl mx-20 text-blue-900 align-text-botton" onClick={OnAddBelowClick}>
      Add a new subtask below
    </button>
  );
};
