import * as React from 'react';

type Props = {
  OnAddBelowClick: () => void;
};

export const AddSubtaskBelowButton: React.FC<Props> = ({ OnAddBelowClick }) => {
  return (
    <div className="border-2">

    <button onClick={OnAddBelowClick}>
      Add task below
    </button>
</div>
  );
};
