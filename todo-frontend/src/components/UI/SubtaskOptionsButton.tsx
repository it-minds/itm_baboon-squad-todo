import * as React from 'react';
import { AiOutlineMore } from 'react-icons/ai';

type Props = {
  onClick: () => void;
};

export const SubtaskOptionsButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="text-5xl text-blue-900 h-16 " onClick={onClick}>
      <AiOutlineMore />
    </button>
  );
};
