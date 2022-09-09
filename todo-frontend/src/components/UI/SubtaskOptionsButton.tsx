import * as React from 'react';
import { AiOutlineMore } from 'react-icons/ai';

type Props = {
  onClick: () => void;
};

export const SubtaskOptionsButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="text-3xl text-blue-900 w-8" onClick={onClick}>
      <AiOutlineMore />
    </button>
  );
};
