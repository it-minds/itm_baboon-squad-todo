import { FC } from "react";
import { AiFillRightCircle, AiOutlineMore } from 'react-icons/ai';

import * as React from 'react';

type Props = {
    onClick: () => void;
};


export const SubtaskOptionsButton: React.FC<Props>=({ onClick})=>{
  return(
<button className="text-5xl text-blue-900 h-16 " onClick={onClick} >
      <AiOutlineMore />
</button>
  );
}
