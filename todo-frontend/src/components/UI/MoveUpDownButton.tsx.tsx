import { FC } from 'react';

type Props = {
  onClick: (dir: string) => void;
};

export const MoveUpDownButton: FC<Props> = ({ onClick }) => {
  return (
    <div className="rotate-90 flex  text-center text-blue-600 text-xl font-bold mx-5">
      <button onClick={() => onClick('moveUp')}>&lt;</button>
      <button onClick={() => onClick('moveDown')}>&gt;</button>
    </div>
  );
};
