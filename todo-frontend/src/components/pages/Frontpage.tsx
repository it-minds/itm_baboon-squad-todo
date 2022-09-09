import { FC } from 'react';

import ListSelector from './../UI/ListSelector';

export const Frontpage: FC = () => {
  return (
    <div className="m-20">
      <h1 className="text-6xl font-bold italic mb-10">Easy Todo</h1>
      <ListSelector />
    </div>
  );
};
