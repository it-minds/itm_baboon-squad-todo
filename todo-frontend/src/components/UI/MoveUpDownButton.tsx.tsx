import { FC } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
type Props = {
  onClick: (dir: string) => void;
};

export const MoveUpDownButton: FC<Props> = ({ onClick }) => {
  return (
    <div className="flex-col flex justify-center text-blue-600 w-8">
      <button onClick={() => onClick('moveUp')}>
        <GoTriangleUp />
      </button>
      <button onClick={() => onClick('moveDown')}>
        <GoTriangleDown />
      </button>
    </div>
  );
};
